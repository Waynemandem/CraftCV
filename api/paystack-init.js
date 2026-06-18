// api/paystack-init.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return res.status(500).json({ error: 'Paystack secret key not configured' })
  }

  if (!process.env.PAYSTACK_PLAN_CODE) {
    return res.status(500).json({ error: 'Paystack plan code not configured' })
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
        plan: process.env.PAYSTACK_PLAN_CODE,
        // ❌ removed "amount" — plan already has the amount baked in
      }),
    })

    const data = await response.json()

    // Log the real Paystack error so we can see it in Vercel logs
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