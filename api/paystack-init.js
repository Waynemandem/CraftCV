// api/paystack-init.js
// Initializes Paystack payment securely using the secret key server-side

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
        // Secret key lives here — never in the browser
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email,
        plan:   process.env.PAYSTACK_PLAN_CODE,
        amount: 890000, // ₦8,900 in kobo
      }),
    })

    const data = await response.json()

    if (!data.status) {
      return res.status(400).json({ error: data.message })
    }

    return res.status(200).json({ url: data.data.authorization_url })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}