// api/ai.js
// Vercel serverless function — secure Claude AI proxy
// ANTHROPIC_API_KEY lives here only, never in the browser

import { createClient } from '@supabase/supabase-js'
import { sanitizeHTML } from '../lib/validation'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkIfPro(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single()

  if (error || !data) {
    console.error('Supabase profile lookup error:', error)
    return false
  }

  return data.plan === 'pro' || data.plan === 'agency'
}

export default async function handler(req, res) {
  //... auth check ...

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let { prompt, userId } = req.body
  prompt = sanitizeHTML(prompt) // Sanitize user input to prevent XSS

  if (!userId) {
    return res.status(400).json({ error: 'User ID required' })
  }''

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  // check prompt length
  if (prompt.length > 1000) {
    return res.status(400).json({ error: 'Prompt is too long(max 1000 characters)' })
  }

  if (prompt.length < 10) {
    return res.status(400).json({ error: 'Prompt is too short(min 10 characters)' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  if (!process.env.VITE_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Supabase credentials not configured' })
  }

  const now = Date.now()
  const rateLimitWindow = 24 * 60 * 60 * 1000 // 24 hours

  try {
    const { data: aiLogs, error: logError } = await supabase
      .from('ai_logs')
      .select('id')
      .eq('user_id', userId)
      .gt('created_at', new Date(now - rateLimitWindow).toISOString())

    if (logError) {
      console.error('Supabase ai_logs query error:', logError)
      return res.status(500).json({ error: 'Unable to check rate limit' })
    }

    const isPro = await checkIfPro(userId)
    const limit = isPro ? 60 : 2

    if ((aiLogs || []).length >= limit) {
      return res.status(429).json({
        error: 'Daily AI limit reached. Upgrade to Pro for more.'
      })
    }

    const { error: insertError } = await supabase
      .from('ai_logs')
      .insert({ user_id: userId })

    if (insertError) {
      console.error('Supabase ai_logs insert error:', insertError)
      return res.status(500).json({ error: 'Unable to log AI request' })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Claude request failed'
      })
    }

    return res.status(200).json({ result: data.content[0].text })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}