// src/components/auth/ForgotPasswordForm.jsx
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ForgotPasswordForm({ onBack }) {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://orbitcv.vercel.app/reset-password',
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✉️</span>
        </div>
        <h3 className="text-base font-semibold text-[#1A1A22] mb-2">Check your email</h3>
        <p className="text-sm text-[#7A7893] mb-6">
          We sent a password reset link to <strong>{email}</strong>
        </p>
        <button
          onClick={onBack}
          className="text-sm text-[#3D2B6B] hover:underline"
        >
          ← Back to sign in
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-[#1A1A22] mb-1">Reset your password</h3>
        <p className="text-sm text-[#7A7893]">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2C2C36] mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-[#E4E2EE] rounded-lg outline-none focus:border-[#3D2B6B] transition-colors text-[#1A1A22]"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">⚠️ {error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#3D2B6B] text-white font-semibold py-2.5 rounded-lg hover:bg-[#2e2053] transition-colors disabled:opacity-60"
      >
        {loading ? 'Sending...' : 'Send reset link'}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="text-sm text-[#7A7893] hover:text-[#3D2B6B] transition-colors"
      >
        ← Back to sign in
      </button>
    </form>
  )
}