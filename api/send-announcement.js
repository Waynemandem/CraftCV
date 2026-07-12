// api/send-announcement.js
// One-time announcement email — trigger manually, not exposed publicly

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple protection — only you can trigger this
  const { secret } = req.body
  if (secret !== process.env.ANNOUNCEMENT_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Get all users
    const { data: { users }, error } = await supabase.auth.admin.listUsers()
    if (error) throw error

    const results = []

    for (const user of users) {
      const name = user.user_metadata?.full_name || 'there'

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'OrbitCV <onboarding@resend.dev>',
          to: [user.email],
          subject: "OrbitCV just got a major upgrade 🚀",
          html: getAnnouncementHTML(name),
        }),
      })

      results.push({ email: user.email, sent: response.ok })

      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 300))
    }

    return res.status(200).json({ sent: results.length, results })

  } catch (err) {
    console.error('Announcement error:', err)
    return res.status(500).json({ error: err.message })
  }
}

function getAnnouncementHTML(name) {
  return `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #F8F7FC; padding: 40px 20px;">
    <div style="background: white; border-radius: 16px; padding: 40px; border: 1px solid #E4E2EE;">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 24px; font-weight: 800; color: #2C2C36;">
          Orbit<span style="color: #3D2B6B;">CV</span>
        </span>
      </div>

      <h1 style="font-size: 22px; color: #1A1A22; margin-bottom: 12px;">
        Hey ${name} 👋
      </h1>

      <p style="font-size: 15px; color: #4A4A55; line-height: 1.6;">
        Since you signed up for OrbitCV, we've shipped some big updates — and 
        wanted you to be the first to know.
      </p>

      <div style="background: #F8F7FC; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <p style="font-size: 14px; color: #3D2B6B; font-weight: 700; margin-bottom: 12px;">
          WHAT'S NEW
        </p>
        <p style="font-size: 14px; color: #2C2C36; margin: 8px 0;">✓ OrbitCV Pro is live — ₦5,000/month</p>
        <p style="font-size: 14px; color: #2C2C36; margin: 8px 0;">✓ Corporate & Creative templates unlocked</p>
        <p style="font-size: 14px; color: #2C2C36; margin: 8px 0;">✓ AI summary, bullet points & skill suggestions</p>
        <p style="font-size: 14px; color: #2C2C36; margin: 8px 0;">✓ Faster, more secure, mobile PDF export fixed</p>
      </div>

      <p style="font-size: 15px; color: #4A4A55; line-height: 1.6;">
        Your resume data is safe with us — we've locked down security with 
        row-level protection, encrypted storage, and verified payments via Paystack.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="https://orbitcv.vercel.app/dashboard" 
           style="background: #3D2B6B; color: white; padding: 14px 32px; border-radius: 8px; 
                  text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
          Go to my dashboard →
        </a>
      </div>

      <p style="font-size: 13px; color: #7A7893; text-align: center; margin-top: 30px;">
        Questions? Just reply to this email or reach us at 
        <a href="mailto:support@orbitcv.vercel.app" style="color: #3D2B6B;">support@orbitcv.vercel.app</a>
      </p>
    </div>

    <p style="text-align: center; font-size: 12px; color: #A0AEC0; margin-top: 20px;">
      Built by Axion Digital · Lagos, Nigeria
    </p>
  </div>
  `
}