// api/cancel-subscription.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = req.headers.authorization?.split('Bearer ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data: authData, error: authError } = await supabase.auth.getUser(token)
  if (authError || !authData.user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const userId = authData.user.id
  const now = new Date().toISOString()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, plan, plan_expires, cancelled_at')
    .eq('id', userId)
    .single()

  if (profileError || !profile) {
    return res.status(404).json({ error: 'Profile not found' })
  }

  if (profile.plan !== 'pro') {
    return res.status(400).json({ error: 'No active Pro subscription found' })
  }

  if (!profile.plan_expires) {
    return res.status(400).json({ error: 'No recurring subscription period found' })
  }

  if (profile.cancelled_at) {
    return res.status(200).json({
      ok: true,
      message: 'Subscription already cancelled',
      plan_expires: profile.plan_expires,
    })
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      cancelled_at: now,
      last_charge_status: 'cancelled',
      updated_at: now,
    })
    .eq('id', userId)

  if (updateError) {
    return res.status(500).json({ error: updateError.message })
  }

  return res.status(200).json({
    ok: true,
    message: 'Subscription cancelled',
    plan_expires: profile.plan_expires,
    cancelled_at: now,
  })
}
