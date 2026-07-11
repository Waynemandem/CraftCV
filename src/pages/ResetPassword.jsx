// src/pages/ResetPassword.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [success, setSuccess]     = useState(false)

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(pwd)) return 'Include at least one uppercase letter'
    if (!/[0-9]/.test(pwd)) return 'Include at least one number'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const validationError = validatePassword(password)
    if (validationError) {
      setError(validationError)
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E4E2EE] rounded-2xl p-8 max-w-md w-full shadow-sm">

        {success ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-lg font-bold text-[#1A1A22] mb-2">Password updated!</h2>
            <p className="text-sm text-[#7A7893]">Redirecting you to your dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A22] mb-1">Set a new password</h2>
              <p className="text-sm text-[#7A7893]">
                Choose a strong password for your OrbitCV account.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C36] mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#E4E2EE] rounded-lg outline-none focus:border-[#3D2B6B] transition-colors text-[#1A1A22]"
              />
              <p className="text-xs text-[#a0aec0] mt-1">
                Min 8 characters, 1 uppercase, 1 number
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C36] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        )}

      </div>
    </div>
  )
}