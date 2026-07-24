// api/paystack-init-single.js
// One-time payment to unlock Pro features on ONE specific resume
// Now requires auth + verifies the caller actually owns the resume

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── Auth check ──
  const token = req.headers.authorization?.split('Bearer ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data: authData, error: authError } = await supabase.auth.getUser(token)
  if (authError || !authData.user) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const user = authData.user
  const { resumeId } = req.body

  if (!resumeId) {
    return res.status(400).json({ error: 'resumeId is required' })
  }

  // ── Ownership check — does this resume actually belong to this user? ──
  const { data: resume, error: resumeError } = await supabase
    .from('resumes')
    .select('id, user_id, is_unlocked')
    .eq('id', resumeId)
    .single()

  if (resumeError || !resume) {
    return res.status(404).json({ error: 'Resume not found' })
  }

  if (resume.user_id !== user.id) {
    return res.status(403).json({ error: 'You do not own this resume' })
  }

  if (resume.is_unlocked) {
    return res.status(400).json({ error: 'This resume is already unlocked' })
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email: user.email,   // ✅ use the VERIFIED email from the token, not client input
        amount: 150000,
        currency: 'NGN',
        metadata: {
          type: 'single_unlock',
          resumeId: resumeId,
          userId: user.id,   // ✅ also store this for extra webhook verification
        },
        callback_url: `https://orbitcv.vercel.app/payment-success?type=single&resumeId=${resumeId}`,
      }),
    })

    const data = await response.json()

    if (!data.status) {
      console.error('Paystack error:', data)
      return res.status(400).json({ error: data.message })
    }

    return res.status(200).json({ url: data.data.authorization_url })

  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: err.message })
  }
}