// src/components/resume/ResumeMockup.jsx

export default function ResumeMockup() {
  return (
    <div className="w-full max-w-sm bg-white border border-[#E4E2EE] rounded-xl p-6 shadow-sm text-left select-none">

      {/* Header */}
      <div className="border-b border-[#E4E2EE] pb-4 mb-4">
        <h2 className="text-lg font-bold text-[#1A1A22] tracking-tight">Alex Johnson</h2>
        <p className="text-sm text-[#5B3FA6] font-medium mt-0.5">Senior Frontend Engineer</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
          <span className="text-[10px] text-[#7A7893]">alex@example.com</span>
          <span className="text-[10px] text-[#7A7893]">Lagos, Nigeria</span>
          <span className="text-[10px] text-[#7A7893]">linkedin.com/in/alex</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-1.5 pb-1 border-b border-[#E4E2EE]">
          Summary
        </p>
        <p className="text-[10px] text-[#2C2C36] leading-relaxed">
          Results-driven frontend engineer with 5+ years building scalable web applications. Specialises in React and TypeScript with a track record of improving performance by 40%.
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-1.5 pb-1 border-b border-[#E4E2EE]">
          Experience
        </p>
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-semibold text-[#1A1A22]">Frontend Engineer</p>
              <p className="text-[10px] text-[#5B3FA6]">Flutterwave</p>
            </div>
            <span className="text-[9px] text-[#7A7893]">2022 — Present</span>
          </div>
          <ul className="mt-1 space-y-0.5 pl-2">
            <li className="text-[10px] text-[#2C2C36] before:content-['·'] before:mr-1 before:text-[#5B3FA6]">
              Led redesign of payment dashboard, reducing drop-off by 32%
            </li>
            <li className="text-[10px] text-[#2C2C36] before:content-['·'] before:mr-1 before:text-[#5B3FA6]">
              Built reusable component library used across 4 product teams
            </li>
          </ul>
        </div>
      </div>

      {/* Skills */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-1.5 pb-1 border-b border-[#E4E2EE]">
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind', 'GraphQL'].map(s => (
            <span key={s} className="text-[9px] bg-[#EDE8F7] text-[#3D2B6B] px-2 py-0.5 rounded font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}