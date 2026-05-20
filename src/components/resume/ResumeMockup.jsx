// src/components/resume/ResumeMockup.jsx
// Static visual mockup of a resume — used in the landing hero

export default function ResumeMockup() {
  return (
    <div className="w-full max-w-sm bg-white border border-[#E4E2EE] rounded-lg p-6 shadow-sm text-left">

      {/* Header */}
      <div className="mb-4">
        <div className="h-4 w-36 bg-[#2C2C36] rounded mb-1.5" />
        <div className="h-3 w-24 bg-[#7A7893]/40 rounded mb-3" />
        <div className="flex gap-2">
          <div className="h-2.5 w-20 bg-[#E4E2EE] rounded" />
          <div className="h-2.5 w-16 bg-[#E4E2EE] rounded" />
          <div className="h-2.5 w-18 bg-[#E4E2EE] rounded" />
        </div>
      </div>

      <div className="border-t border-[#E4E2EE] pt-4 mb-4">
        <div className="h-2.5 w-20 bg-[#3D2B6B]/30 rounded mb-2.5" />
        <div className="h-2 w-full bg-[#E4E2EE] rounded mb-1.5" />
        <div className="h-2 w-5/6 bg-[#E4E2EE] rounded mb-1.5" />
        <div className="h-2 w-4/6 bg-[#E4E2EE] rounded" />
      </div>

      {/* Experience block */}
      <div className="border-t border-[#E4E2EE] pt-4 mb-4">
        <div className="h-2.5 w-24 bg-[#3D2B6B]/30 rounded mb-2.5" />
        <div className="flex justify-between mb-1">
          <div className="h-2.5 w-28 bg-[#2C2C36]/50 rounded" />
          <div className="h-2 w-16 bg-[#E4E2EE] rounded" />
        </div>
        <div className="h-2 w-32 bg-[#7A7893]/30 rounded mb-2" />
        <div className="space-y-1.5 pl-2">
          <div className="h-2 w-full bg-[#E4E2EE] rounded" />
          <div className="h-2 w-5/6 bg-[#E4E2EE] rounded" />
          <div className="h-2 w-4/5 bg-[#E4E2EE] rounded" />
        </div>
      </div>

      {/* Skills block */}
      <div className="border-t border-[#E4E2EE] pt-4">
        <div className="h-2.5 w-16 bg-[#3D2B6B]/30 rounded mb-2.5" />
        <div className="flex flex-wrap gap-1.5">
          {['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind'].map(s => (
            <span key={s} className="text-[10px] bg-[#EDE8F7] text-[#3D2B6B] px-2 py-0.5 rounded">
              {s}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}