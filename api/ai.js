// api/ai.js
// Uses OpenAI gpt-4o-mini — cheap, fast, good enough for resume text tasks

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

  const userId = authData.user.id

  // ── Rate limiting (keep your existing logic) ──
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single()

  const isPro = profile?.plan === 'pro'
  const limit = isPro ? 100 : 10

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: aiLogs } = await supabase
    .from('ai_logs')
    .select('id')
    .eq('user_id', userId)
    .gt('created_at', twentyFourHoursAgo)

  if (aiLogs && aiLogs.length >= limit) {
    return res.status(429).json({
      error: `Daily AI limit reached (${limit}/day). ${!isPro ? 'Upgrade to Pro for more.' : ''}`,
    })
  }

  // ── Get and sanitize prompt ──
  let { prompt } = req.body

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  if (prompt.length > 5000) {
    return res.status(400).json({ error: 'Prompt too long (max 5000 chars)' })
  }

  if (prompt.length < 5) {
    return res.status(400).json({ error: 'Prompt too short' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writing assistant. Give concise, ATS-friendly, results-oriented text. No preamble, no markdown, just the requested content directly.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenAI error:', data)
      return res.status(response.status).json({ error: data.error?.message || 'AI request failed' })
    }

    const result = data.choices?.[0]?.message?.content?.trim()

    if (!result) {
      return res.status(500).json({ error: 'No response from AI' })
    }

    // Log this AI call for rate limiting
    await supabase.from('ai_logs').insert({ user_id: userId })

    return res.status(200).json({ result })

  } catch (err) {
    console.error('AI proxy error:', err)
    return res.status(500).json({ error: err.message })
  }
}