// src/components/resume/CorporateTemplate.jsx
// Two-column layout — left sidebar for contact/skills, right for experience

import useResumeStore from '../../store/resumeStore'

export default function CorporateTemplate() {
  const { personal, summary, experience, education, skills, projects, certs } = useResumeStore()

  return (
    <div className="w-full font-sans text-[13px] flex min-h-full">

      {/* ── LEFT SIDEBAR ── */}
      <div className="w-[38%] bg-[#2C2C36] text-white p-6 flex flex-col gap-6">

        {/* Name + title */}
        <div>
          <h1 className="text-lg font-bold leading-tight tracking-tight">
            {personal.name || 'Your Name'}
          </h1>
          {personal.title && (
            <p className="text-[#C4B8E8] text-xs mt-1 font-medium">
              {personal.title}
            </p>
          )}
        </div>

        {/* Contact */}
        <div>
          <SideLabel>Contact</SideLabel>
          <div className="flex flex-col gap-1.5 text-[11px] text-[#E4E2EE]">
            {personal.email    && <span>{personal.email}</span>}
            {personal.phone    && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SideLabel>Skills</SideLabel>
            <div className="flex flex-col gap-1.5">
              {skills.map(skill => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CBF] flex-shrink-0" />
                  <span className="text-[11px] text-[#E4E2EE]">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <SideLabel>Education</SideLabel>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-[11px] font-semibold text-white">{edu.school}</p>
                <p className="text-[10px] text-[#C4B8E8]">{edu.degree}</p>
                {edu.field && <p className="text-[10px] text-[#9B8DC0]">{edu.field}</p>}
                {edu.year  && <p className="text-[10px] text-[#9B8DC0]">{edu.year}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certs */}
        {certs.length > 0 && (
          <div>
            <SideLabel>Certifications</SideLabel>
            {certs.map(c => (
              <div key={c.id} className="mb-2">
                <p className="text-[11px] font-semibold text-white">{c.name}</p>
                <p className="text-[10px] text-[#C4B8E8]">{c.issuer} {c.year && `· ${c.year}`}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── RIGHT MAIN ── */}
      <div className="flex-1 p-6 flex flex-col gap-5">

        {/* Summary */}
        {summary && (
          <div>
            <MainLabel>Profile</MainLabel>
            <p className="text-[12px] text-[#2C2C36] leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <MainLabel>Experience</MainLabel>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-0.5">
                  <p className="font-bold text-[13px] text-[#1A1A22]">{exp.role || 'Role'}</p>
                  <p className="text-[10px] text-[#7A7893] whitespace-nowrap">
                    {exp.from} {exp.from && exp.to && '—'} {exp.to}
                  </p>
                </div>
                <p className="text-[11px] text-[#5B3FA6] font-medium mb-1.5">{exp.company}</p>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="space-y-1 pl-3">
                    {exp.bullets.filter(b => b.trim()).map((b, i) => (
                      <li key={i} className="text-[11px] text-[#2C2C36] relative before:content-['▸'] before:absolute before:-left-3 before:text-[#5B3FA6] before:text-[9px]">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <MainLabel>Projects</MainLabel>
            {projects.map(p => (
              <div key={p.id} className="mb-3 last:mb-0">
                <div className="flex justify-between">
                  <p className="font-semibold text-[13px] text-[#1A1A22]">{p.name}</p>
                  {p.link && (
                    <a href={p.link} className="text-[10px] text-[#5B3FA6]" target="_blank" rel="noopener noreferrer">
                      View →
                    </a>
                  )}
                </div>
                {p.stack && <p className="text-[10px] text-[#7A7893] mb-0.5">{p.stack}</p>}
                {p.desc  && <p className="text-[11px] text-[#2C2C36]">{p.desc}</p>}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

function SideLabel({ children }) {
  return (
    <p className="text-[9px] font-bold uppercase tracking-widest text-[#9B8DC0] mb-2 pb-1 border-b border-[#3D2B6B]">
      {children}
    </p>
  )
}

function MainLabel({ children }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-2 pb-1 border-b-2 border-[#3D2B6B]">
      {children}
    </p>
  )
}