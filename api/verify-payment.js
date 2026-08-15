export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const reference = req.query.reference

  if (!reference) {
    return res.status(400).json({ error: 'Payment reference is required' })
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    })

    const data = await response.json()

    if (!response.ok || !data.status) {
      return res.status(response.status || 400).json({
        error: data.message || 'Payment verification failed',
        paystackStatus: data?.data?.status ?? null,
      })
    }

    return res.status(200).json({
      verified: data.data?.status === 'success',
      status: data.data?.status ?? 'unknown',
      reference: data.data?.reference ?? reference,
      amount: data.data?.amount ?? null,
      gatewayResponse: data.data?.gateway_response ?? null,
      paidAt: data.data?.paid_at ?? null,
      channel: data.data?.channel ?? null,
    })
  } catch (err) {
    console.error('Payment verification error:', err)
    return res.status(500).json({ error: 'Could not verify payment' })
  }
}
