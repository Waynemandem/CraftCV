// api/paystack-init-single.js
// One-time payment to unlock Pro features on ONE specific resume

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, resumeId } = req.body

  if (!email || !resumeId) {
    return res.status(400).json({ error: 'Email and resumeId are required' })
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email,
        amount:   150000,   // ₦1,500 in kobo
        currency: 'NGN',
        metadata: {
          type:      'single_unlock',   // ✅ tells webhook which flow this is
          resumeId:  resumeId,
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