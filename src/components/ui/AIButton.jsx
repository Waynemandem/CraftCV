// src/components/ui/AIButton.jsx
import { useProfile } from '../../hooks/useProfile'
import UpgradeButton from './UpgradeButton'

export default function AIButton({
  onClick, loading = false, label = 'Improve with AI'
}) {
  const { isPro } = useProfile()

  // Not Pro — show upgrade prompt instead
  if (!isPro) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: '#7A7893' }}>
          ✦ AI features require Pro
        </span>
        <UpgradeButton size="sm" />
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        inline-flex items-center gap-1.5
        text-xs font-medium text-[#5B3FA6]
        border border-[#5B3FA6]/30 rounded-md
        px-3 py-1.5
        hover:bg-[#EDE8F7] transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <span>{loading ? '⏳' : '✦'}</span>
      {loading ? 'Generating...' : label}
    </button>
  )
}