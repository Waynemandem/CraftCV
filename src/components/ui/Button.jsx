// src/components/ui/Button.jsx
// Reusable button with 3 variants: primary, ghost, outline

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
}) {
  const base = `
    inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150
    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: 'bg-[#3D2B6B] text-white hover:bg-[#2e2053]',
    ghost: 'bg-transparent text-[#3D2B6B] hover:bg-[#EDE8F7]',
    outline: 'border border-[#3D2B6B] text-[#3D2B6B] hover:bg-[#EDE8F7]',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {children}
    </button>
  )
}