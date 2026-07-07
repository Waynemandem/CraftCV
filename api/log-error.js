// api/log-error.js
// Log errors to Supabase for debugging

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId, errorMessage, errorStack, context, url, userAgent } = req.body

  if (!userId || !errorMessage) {
    return res.status(400).json({ error: 'userId and errorMessage required' })
  }

  try {
    const { error } = await supabase
      .from('error_logs')
      .insert({
        user_id: userId,
        error_message: errorMessage,
        error_stack: errorStack || null,
        context: context || 'unknown',
        url: url || null,
        user_agent: userAgent || null,
      })

    if (error) {
      console.error('Failed to log error:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log(`✓ Error logged: ${context} - ${errorMessage}`)
    return res.status(200).json({ logged: true })

  } catch (err) {
    console.error('Log error endpoint failed:', err)
    return res.status(500).json({ error: err.message })
  }
}