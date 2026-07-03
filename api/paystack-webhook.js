// api/paystack-webhook.js
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  console.log('=== WEBHOOK RECEIVED ===')
  console.log('Method:', req.method)
  console.log('Headers:', req.headers)
  
  if (req.method !== 'POST') {
    console.log('❌ Wrong method')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex')

  const signature = req.headers['x-paystack-signature']
  console.log('Expected hash:', hash)
  console.log('Received signature:', signature)
  console.log('Match:', hash === signature)

  if (hash !== signature) {
    console.log('❌ Signature mismatch')
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = req.body
  console.log('✓ Signature verified')
  console.log('Event type:', event.event)

  try {
    if (event.event === 'charge.success') {
      const { customer, amount, reference } = event.data
      console.log('💰 Charge success event')
      console.log('Customer email:', customer.email)
      console.log('Amount:', amount)
      console.log('Reference:', reference)

      // Only upgrade if correct amount paid (or more)
      if (amount >= 10000) {  // ₦5,000 in kobo
        console.log('✓ Amount is valid, upgrading...')
        
        const { data: profile, error: findError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customer.email)
          .single()

        if (findError) {
          console.log('❌ Error finding profile:', findError)
          return res.status(400).json({ error: 'Profile not found' })
        }

        console.log('✓ Found profile ID:', profile.id)

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            plan:       'pro',
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id)

        if (updateError) {
          console.log('❌ Error updating profile:', updateError)
          return res.status(500).json({ error: updateError.message })
        }

        console.log('✓ Profile updated to Pro!')
      } else {
        console.log('❌ Amount too low:', amount)
      }
    } else {
      console.log('⚠️ Ignoring event type:', event.event)
    }

    return res.status(200).json({ received: true })

  } catch (err) {
    console.error('❌ Webhook error:', err)
    return res.status(500).json({ error: err.message })
  }
}