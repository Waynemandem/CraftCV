// src/components/resume/MinimalTemplate.jsx
// Reads from Zustand store and renders a clean ATS-friendly resume

import useResumeStore from '../../store/resumeStore'

export default function MinimalTemplate() {
  const {
    personal,
    summary,
    experience,
    education,
    skills,
    projects,
    certs,
  } = useResumeStore()

  return (
    <div className="w-full font-sans text-[#1A1A22] text-[13px] leading-relaxed">

      {/* ── HEADER ── */}
      <div className="border-b border-[#E4E2EE] pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A22]">
          {personal.name || 'Your Name'}
        </h1>
        {personal.title && (
          <p className="text-sm text-[#5B3FA6] font-medium mt-0.5">
            {personal.title}
          </p>
        )}

        {/* Contact row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-[#7A7893]">
          {personal.email    && <span>{personal.email}</span>}
          {personal.phone    && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </div>

      {/* ── SUMMARY ── */}
      {summary && (
        <Section title="Summary">
          <p className="text-[13px] text-[#2C2C36] leading-relaxed">{summary}</p>
        </Section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-[13px] text-[#1A1A22]">
                    {exp.role || 'Role'}
                  </p>
                  <p className="text-xs text-[#5B3FA6]">
                    {exp.company || 'Company'}
                  </p>
                </div>
                <p className="text-xs text-[#7A7893] whitespace-nowrap">
                  {exp.from} {exp.from && exp.to && '—'} {exp.to}
                </p>
              </div>

              {exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul className="mt-1.5 space-y-1 pl-3">
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <li key={i} className="text-[12px] text-[#2C2C36] relative before:content-['·'] before:absolute before:-left-3 before:text-[#5B3FA6]">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start mb-3 last:mb-0">
              <div>
                <p className="font-semibold text-[13px] text-[#1A1A22]">
                  {edu.school || 'School'}
                </p>
                <p className="text-xs text-[#7A7893]">
                  {edu.degree} {edu.field && `· ${edu.field}`}
                </p>
              </div>
              {edu.year && (
                <p className="text-xs text-[#7A7893]">{edu.year}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── SKILLS ── */}
      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] bg-[#EDE8F7] text-[#3D2B6B] px-2 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* ── PROJECTS ── */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-[13px] text-[#1A1A22]">
                  {p.name || 'Project Name'}
                </p>
                {p.link && (
                  
                    <a
                    href={p.link}
                    className="text-[11px] text-[#5B3FA6] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View →
                  </a>
                )}
              </div>
              {p.stack && (
                <p className="text-[11px] text-[#7A7893] mb-1">{p.stack}</p>
              )}
              {p.desc && (
                <p className="text-[12px] text-[#2C2C36]">{p.desc}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certs.length > 0 && (
        <Section title="Certifications">
          {certs.map((c) => (
            <div key={c.id} className="flex justify-between items-start mb-2 last:mb-0">
              <div>
                <p className="font-semibold text-[13px] text-[#1A1A22]">
                  {c.name || 'Certification'}
                </p>
                {c.issuer && (
                  <p className="text-xs text-[#7A7893]">{c.issuer}</p>
                )}
              </div>
              {c.year && (
                <p className="text-xs text-[#7A7893]">{c.year}</p>
              )}
            </div>
          ))}
        </Section>
      )}

    </div>
  )
}

// ── Reusable section wrapper ──
function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-2 pb-1 border-b border-[#E4E2EE]">
        {title}
      </h2>
      {children}
    </div>
  )
}