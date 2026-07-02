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

  // Verify the request is genuinely from Paystack
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = req.body
  console.log('Webhook event received:', event.event)

  try {
    if (event.event === 'charge.success') {
      const { customer, amount } = event.data

      // Only upgrade if correct amount paid
      if (amount >= 890000) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customer.email)
          .single()

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              plan:        'pro',
              updated_at:  new Date().toISOString(),
            })
            .eq('id', profile.id)

          console.log('Upgraded to Pro:', customer.email)
        }
      }
    }

    return res.status(200).json({ received: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}