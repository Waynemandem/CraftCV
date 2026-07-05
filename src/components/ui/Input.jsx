// src/components/ui/Input.jsx
export default function Input({ 
  label, 
  placeholder, 
  type = 'text', 
  value, 
  onChange, 
  name,
  required = false,
  error = null,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#2C2C36] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-sm
          placeholder-[#A0AEC0] text-[#1A1A22] font-medium
          ${error
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-[#E4E2EE] focus:border-[#3D2B6B] focus:ring-2 focus:ring-[#3D2B6B]/10'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      />
    </div>
  )
}