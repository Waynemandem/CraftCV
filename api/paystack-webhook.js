// api/paystack-webhook.js
// Receives Paystack payment events and updates Supabase

import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// Use service role key here — bypasses RLS
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify webhook is genuinely from Paystack
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = req.body

  try {
    // ── Subscription created or payment successful ──
    if (
      event.event === 'subscription.create' ||
      event.event === 'charge.success'
    ) {
      const { customer, subscription_code, next_payment_date } = event.data

      // Find user by email
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customer.email)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            plan:          'pro',
            paystack_code: subscription_code || null,
            plan_expires:  next_payment_date || null,
            updated_at:    new Date().toISOString(),
          })
          .eq('id', profile.id)
      }
    }

    // ── Subscription cancelled or disabled ──
    if (
      event.event === 'subscription.disable' ||
      event.event === 'subscription.not_renew'
    ) {
      const { customer } = event.data

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customer.email)
        .single()

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            plan:         'free',
            plan_expires: null,
            updated_at:   new Date().toISOString(),
          })
          .eq('id', profile.id)
      }
    }

    return res.status(200).json({ received: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}