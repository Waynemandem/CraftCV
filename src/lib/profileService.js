// src/lib/profileService.js
import { supabase } from './supabase'

// Get current user's profile (includes plan)
export const fetchProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}


// ✅ Now calls our secure serverless function instead of Paystack directly
export const initializePayment = async (email) => {
  const response = await fetch('/api/paystack-init', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await response.json()

  if (!response.ok) throw new Error(data.error || 'Payment initialization failed')

  return data.url  // Paystack checkout URL
}