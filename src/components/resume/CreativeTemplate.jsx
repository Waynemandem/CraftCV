// src/components/resume/CreativeTemplate.jsx
// Bold header block, icon-style contact row, accent colours

import useResumeStore from '../../store/resumeStore'

export default function CreativeTemplate() {
  const { personal, summary, experience, education, skills, projects, certs } = useResumeStore()

  return (
    <div className="w-full font-sans text-[13px]">

      {/* ── HEADER BLOCK ── */}
      <div className="bg-[#3D2B6B] px-8 py-6 mb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
          {personal.name || 'Your Name'}
        </h1>
        {personal.title && (
          <p className="text-[#C4B8E8] font-medium mt-1">{personal.title}</p>
        )}

        {/* Contact pills row */}
        <div className="flex flex-wrap gap-3 mt-3">
          {[
            personal.email,
            personal.phone,
            personal.location,
            personal.linkedin,
            personal.portfolio,
          ].filter(Boolean).map((item, i) => (
            <span key={i} className="text-[10px] bg-white/10 text-[#E4E2EE] px-2.5 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="px-8">

        {/* Summary */}
        {summary && (
          <Section title="About Me" accent>
            <p className="text-[12px] text-[#2C2C36] leading-relaxed">{summary}</p>
          </Section>
        )}

        {/* Two column — experience + sidebar */}
        <div className="grid grid-cols-[1fr_160px] gap-6">

          {/* Left — Experience + Projects */}
          <div>
            {experience.length > 0 && (
              <Section title="Experience" accent>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-[13px] text-[#1A1A22]">{exp.role || 'Role'}</p>
                        <p className="text-[11px] text-[#5B3FA6] font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-white bg-[#3D2B6B] px-2 py-0.5 rounded-full whitespace-nowrap">
                        {exp.from} {exp.to && `- ${exp.to}`}
                      </span>
                    </div>
                    {exp.bullets.filter(b => b.trim()).length > 0 && (
                      <ul className="mt-1.5 space-y-1 pl-3">
                        {exp.bullets.filter(b => b.trim()).map((b, i) => (
                          <li key={i} className="text-[11px] text-[#2C2C36] relative before:content-['◆'] before:absolute before:-left-3.5 before:text-[#3D2B6B] before:text-[7px] before:top-0.5">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Section>
            )}

            {projects.length > 0 && (
              <Section title="Projects" accent>
                {projects.map(p => (
                  <div key={p.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between">
                      <p className="font-semibold text-[13px] text-[#1A1A22]">{p.name}</p>
                      {p.link && (
                        <a href={p.link} className="text-[10px] text-[#5B3FA6]" target="_blank" rel="noopener noreferrer">View →</a>
                      )}
                    </div>
                    {p.stack && <p className="text-[10px] text-[#7A7893]">{p.stack}</p>}
                    {p.desc  && <p className="text-[11px] text-[#2C2C36] mt-0.5">{p.desc}</p>}
                  </div>
                ))}
              </Section>
            )}
          </div>

          {/* Right sidebar — Skills + Education + Certs */}
          <div>
            {skills.length > 0 && (
              <Section title="Skills">
                <div className="flex flex-col gap-1.5">
                  {skills.map(skill => (
                    <span key={skill} className="text-[10px] bg-[#EDE8F7] text-[#3D2B6B] px-2 py-0.5 rounded text-center font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {education.length > 0 && (
              <Section title="Education">
                {education.map(edu => (
                  <div key={edu.id} className="mb-2 last:mb-0">
                    <p className="text-[11px] font-bold text-[#1A1A22]">{edu.school}</p>
                    <p className="text-[10px] text-[#7A7893]">{edu.degree}</p>
                    {edu.year && <p className="text-[10px] text-[#3D2B6B]">{edu.year}</p>}
                  </div>
                ))}
              </Section>
            )}

            {certs.length > 0 && (
              <Section title="Certs">
                {certs.map(c => (
                  <div key={c.id} className="mb-2 last:mb-0">
                    <p className="text-[11px] font-bold text-[#1A1A22]">{c.name}</p>
                    <p className="text-[10px] text-[#7A7893]">{c.issuer}</p>
                  </div>
                ))}
              </Section>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children, accent }) {
  return (
    <div className="mb-4">
      <div className={`flex items-center gap-2 mb-2 ${accent ? '' : ''}`}>
        {accent && <div className="w-3 h-3 bg-[#3D2B6B] rounded-sm flex-shrink-0" />}
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B6B]">
          {title}
        </h2>
      </div>
      <div className="border-t border-[#E4E2EE] pt-2">
        {children}
      </div>
    </div>
  )
}