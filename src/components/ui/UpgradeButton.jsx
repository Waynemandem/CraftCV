// src/components/ui/UpgradeButton.jsx
import { useState } from 'react'
import { useProfile } from '../../hooks/useProfile'
import useAuthStore from '../../store/authStore'
import { initializePayment } from '../../lib/profileService'

export default function UpgradeButton({ size = 'md', fullWidth = false }) {
  const { isPro } = useProfile()
  const user      = useAuthStore(s => s.user)
  const [loading, setLoading] = useState(false)

  // Already Pro — show badge
  if (isPro) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: '#EDE8F7', color: '#3D2B6B',
        fontSize: 12, fontWeight: 700,
        padding: '6px 14px', borderRadius: 100,
        letterSpacing: '.04em',
      }}>
        ✦ Pro
      </span>
    )
  }

  const handleUpgrade = async () => {
    if (!user?.email) return
    setLoading(true)
    try {
      const url = await initializePayment(
        user.email,
        import.meta.env.VITE_PAYSTACK_PLAN_CODE
      )
      // Redirect to Paystack checkout
      window.location.href = url
    } catch (err) {
      alert('Could not start payment: ' + err.message)
    }
    setLoading(false)
  }

  const sizes = {
    sm: { fontSize: 12, padding: '7px 16px' },
    md: { fontSize: 14, padding: '10px 22px' },
    lg: { fontSize: 15, padding: '14px 28px' },
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      style={{
        background: loading ? '#ccc' : '#3D2B6B',
        color: '#fff', border: 'none',
        borderRadius: 8, fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        width: fullWidth ? '100%' : 'auto',
        transition: 'background .2s',
        ...sizes[size],
      }}
    >
      {loading ? 'Redirecting...' : '✦ Upgrade to Pro — ₦8,900/mo'}
    </button>
  )
}