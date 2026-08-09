// api/cron/renew-subscriptions.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000
const CHARGE_AMOUNT = 500000
const CURRENCY = 'NGN'

function getProvidedSecret(req) {
  return req.query?.secret || req.headers['x-cron-secret']
}

async function downgradeProfile(profileId, reason, attemptedAt) {
  const { error } = await supabase
    .from('profiles')
    .update({
      plan: 'free',
      plan_expires: null,
      last_charge_attempt: attemptedAt,
      last_charge_status: `failed: ${reason}`,
      updated_at: attemptedAt,
    })
    .eq('id', profileId)

  if (error) {
    throw error
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.CRON_SECRET) {
    return res.status(500).json({ error: 'CRON_SECRET is not configured' })
  }

  const providedSecret = getProvidedSecret(req)
  if (providedSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const now = new Date()
  const nowIso = now.toISOString()
  const windowEndIso = new Date(now.getTime() + TWENTY_FOUR_HOURS_MS).toISOString()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, email, plan, plan_expires, paystack_authorization_code, cancelled_at')
    .eq('plan', 'pro')
    .is('cancelled_at', null)
    .gte('plan_expires', nowIso)
    .lte('plan_expires', windowEndIso)

  if (error) {
    console.error('Failed to load renewal candidates:', error)
    return res.status(500).json({ error: error.message })
  }

  const results = {
    checked: profiles?.length || 0,
    renewed: 0,
    downgraded: 0,
    skipped: 0,
    details: [],
  }

  for (const profile of profiles || []) {
    const attemptAt = new Date().toISOString()

    if (!profile.paystack_authorization_code) {
      const reason = 'missing authorization code'
      console.warn('Downgrading user without authorization code:', {
        profileId: profile.id,
        email: profile.email,
        reason,
      })

      await downgradeProfile(profile.id, reason, attemptAt)
      results.downgraded += 1
      results.details.push({
        profileId: profile.id,
        email: profile.email,
        status: 'downgraded',
        reason,
      })
      continue
    }

    const dueExpiry = new Date(profile.plan_expires)
    const nextExpiry = new Date(dueExpiry.getTime() + THIRTY_DAYS_MS).toISOString()
    const reference = `orbitcv-sub-${profile.id}-${dueExpiry.getTime()}`

    try {
      const response = await fetch('https://api.paystack.co/transaction/charge_authorization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email: profile.email,
          amount: CHARGE_AMOUNT,
          authorization_code: profile.paystack_authorization_code,
          currency: CURRENCY,
          reference,
          queue: true,
          metadata: {
            profile_id: profile.id,
            purpose: 'monthly_subscription_renewal',
          },
        }),
      })

      const data = await response.json()
      const apiMessage = data?.message || data?.data?.gateway_response || 'Charge authorization failed'

      if (!response.ok || !data.status) {
        throw new Error(apiMessage)
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          plan: 'pro',
          plan_expires: nextExpiry,
          last_charge_attempt: attemptAt,
          last_charge_status: 'success',
          updated_at: attemptAt,
        })
        .eq('id', profile.id)

      if (updateError) {
        throw updateError
      }

      results.renewed += 1
      results.details.push({
        profileId: profile.id,
        email: profile.email,
        status: 'renewed',
        nextExpiry,
        reference,
      })
      console.log('Renewed subscription:', {
        profileId: profile.id,
        email: profile.email,
        nextExpiry,
      })
    } catch (renewalError) {
      const reason = renewalError.message || 'Unknown renewal failure'
      console.warn('Subscription renewal failed, downgrading user:', {
        profileId: profile.id,
        email: profile.email,
        reason,
      })

      try {
        await downgradeProfile(profile.id, reason, attemptAt)
        results.downgraded += 1
        results.details.push({
          profileId: profile.id,
          email: profile.email,
          status: 'downgraded',
          reason,
        })
      } catch (downgradeError) {
        console.error('Failed to downgrade after renewal failure:', {
          profileId: profile.id,
          email: profile.email,
          renewalError: reason,
          downgradeError: downgradeError.message,
        })
        return res.status(500).json({
          error: 'Renewal failed and downgrade update also failed',
          details: downgradeError.message,
        })
      }
    }
  }

  return res.status(200).json({
    ok: true,
    ...results,
  })
}
