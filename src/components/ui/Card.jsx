// src/components/ui/Card.jsx

export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white border border-[#E4E2EE] rounded-lg p-5
        ${onClick ? 'cursor-pointer hover:border-[#3D2B6B] transition-all duration-150' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// big wayne