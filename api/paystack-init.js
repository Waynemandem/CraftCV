// api/paystack-init.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
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
  amount:   10000,          // ₦100 in kobo (not 890000)
  currency: 'NGN',
  metadata: {
    plan:       'pro',
    cancel_action: 'https://orbitcv.vercel.app/dashboard',
  },
  callback_url: 'https://orbitcv.vercel.app/payment-success',
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