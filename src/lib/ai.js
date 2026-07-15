// src/lib/ai.js
import { supabase } from './supabase'
import { logError } from './errorLogger'

export const askAI = async (prompt) => {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ prompt }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'AI request failed')
    }

    return data.result   // ← matches new response shape { result: "..." }

  } catch (err) {
    logError(err.message, 'ai-call', {
      userId: (await supabase.auth.getUser()).data?.user?.id,
      stack: err.stack,
    })
    throw err
  }
}