// src/components/ui/Input
// Reusable input with label + optional error message

export default function Input ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    hint,
    required = false, 
}) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-[#2c2c36]">
                    {label}
                    {required && <span className="text-[#3d2b6b] ml-0.5">*</span>}
                </label>
            )}


         <input 
           type={type}
           placholder={placeholder}
           value={value}
           onChange={onChange}
           className={`
            w-full px-3 py-2.5 text-sm rounded-md
            border bg-white text-[##2C2C36]
            placeholder:text-[#7A7893]
            outline-none transition-all duration-150
            focus:ring-2 focus:ring-[#3D2B6B]/20 focus:border-[#3D2B6B]
            ${error ? 'border-red-400' : 'border-[#E4E2EE]'}
            `}
            />

          {hint && !error && (
          <p className="text-xs text-[#7A7893]">{hint}</p>
          )}
          {error && (
          <p className="text-xs text-red-500">{error}</p>
          )}

        </div>
    )
}