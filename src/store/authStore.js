// src/store/authStore.js
// Manages auth session state across the app

import { create } from 'zustand'
import { supabase } from '../lib/supabase'

let authSubscription = null

const useAuthStore = create((set,get) => ({

  user:    null,
  loading: true,
  _authSubscription: null,

    // Call once on app mount to restore session
  init: async () => {
    authSubscription?.unsubscribe()

    const { data: { session } } = await supabase.auth.getSession()
    set({ user: session?.user ?? null, loading: false })

    // Listen for auth state changes (login, logout, token refresh)
    const { data:  } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false })
    })

    authSubscription = data.subscription

    return () => {
      authSubscription?.unsubscribe()
      authSubscription = null
    }
  },


  // Email + password sign up
  signUp: async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) throw error
    return data
  },

  // Email + password login
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Google OAuth
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) throw error
  },

  // Sign out
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
}))

export default useAuthStore