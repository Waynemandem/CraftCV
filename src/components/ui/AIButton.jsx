// src/components/ui/AIButton.jsx

export default function AIButton({ onClick, loading = false, label = 'Improve with AI' }) {
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