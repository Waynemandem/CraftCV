// src/components/ui/Textarea.jsx

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  hint,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#2C2C36]">
          {label}
          {required && <span className="text-[#3D2B6B] ml-0.5">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full px-3 py-2.5 text-sm rounded-md resize-none
          border border-[#E4E2EE] bg-white text-[#2C2C36]
          placeholder:text-[#7A7893]
          outline-none transition-all duration-150
          focus:ring-2 focus:ring-[#3D2B6B]/20 focus:border-[#3D2B6B]
        "
      />
      {hint && <p className="text-xs text-[#7A7893]">{hint}</p>}
    </div>
  )
}