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

// Initialize Paystack payment
export const initializePayment = async (email, planCode) => {
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}`,
    },
    body: JSON.stringify({
      email,
      plan:   planCode,
      amount: 890000,  // ₦8,900 in kobo
    }),
  })

  const data = await response.json()
  if (!data.status) throw new Error(data.message)
  return data.data.authorization_url
}