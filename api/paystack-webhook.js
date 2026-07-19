// api/paystack-webhook.js
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = req.body
  console.log('Webhook event:', event.event)

  try {
    if (event.event === 'charge.success') {
      const { customer, amount, metadata } = event.data

      // ── Branch 1: Single Resume Unlock ──
      if (metadata?.type === 'single_unlock' && metadata?.resumeId) {
        console.log('Processing single unlock for resume:', metadata.resumeId)

        if (amount >= 150000) {
          const { error } = await supabase
            .from('resumes')
            .update({
              is_unlocked: true,
              unlocked_at: new Date().toISOString(),
            })
            .eq('id', metadata.resumeId)

          if (error) {
            console.error('Failed to unlock resume:', error)
            return res.status(500).json({ error: error.message })
          }

          console.log('✓ Resume unlocked:', metadata.resumeId)
        } else {
          console.log('Amount too low for single unlock:', amount)
        }
      }

      // ── Branch 2: Monthly Pro Subscription ──
      else if (amount >= 500000) {
        console.log('Processing monthly pro upgrade for:', customer.email)

        const { data: profile, error: findError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customer.email)
          .single()

        if (findError) {
          console.error('Could not find profile:', findError)
          return res.status(400).json({ error: 'Profile not found' })
        }

        if (profile) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              plan:       'pro',
              updated_at: new Date().toISOString(),
            })
            .eq('id', profile.id)

          if (updateError) {
            console.error('Failed to update profile:', updateError)
            return res.status(500).json({ error: updateError.message })
          }

          console.log('✓ Upgraded to Pro:', customer.email)
        }
      } else {
        console.log('Charge amount did not match any known flow:', amount, metadata)
      }
    }

    return res.status(200).json({ received: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}