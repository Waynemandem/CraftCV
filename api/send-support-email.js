// api/send-support-email.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OrbitCV Support <onboarding@resend.dev>',
        to: ['okoemu4@gmail.com'],  // ← your inbox, where you actually read it
        reply_to: email,             // ← so you can hit "reply" and it goes to the user
        subject: `[${subject || 'Support'}] Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Support Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p>${message.replace(/\n/g, '<br/>')}</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errData = await response.json()
      console.error('Resend error:', errData)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ sent: true })

  } catch (err) {
    console.error('Support email error:', err)
    return res.status(500).json({ error: err.message })
  }
}