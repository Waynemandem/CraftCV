// src/components/ui/Badge.jsx

export default function Badge({ children, onRemove }) {
  return (
    <span className="
      inline-flex items-center gap-1.5
      bg-[#EDE8F7] text-[#3D2B6B]
      text-xs font-medium px-2.5 py-1 rounded-md
    ">
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:text-[#2e2053] leading-none"
        >×</button>
      )}
    </span>
  )
}

//  big wayne