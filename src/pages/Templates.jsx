// src/pages/Templates.jsx
import { Link }          from 'react-router-dom'
import Navbar            from '../components/layout/Navbar'

const TEMPLATES = [
  {
    id:       'minimal',
    name:     'Minimal',
    badge:    'FREE',
    badgeBg:  '#EDE8F7',
    badgeColor: '#3D2B6B',
    tagline:  'Clean. Simple. Powerful.',
    desc:     'A distraction-free single-column layout that puts your content first. Perfect for tech, engineering, and any role where clarity wins.',
    bestFor:  ['Software Engineers', 'Data Scientists', 'Product Managers', 'Finance Roles'],
    features: ['ATS optimised', 'Clean typography', 'Skills badge row', 'Generous whitespace'],
    color:    '#3D2B6B',
    preview:  <MinimalPreviewPage />,
  },
  {
    id:       'corporate',
    name:     'Corporate',
    badge:    'PRO',
    badgeBg:  '#3D2B6B',
    badgeColor: '#fff',
    tagline:  'Bold. Structured. Professional.',
    desc:     'A commanding two-column layout with a dark sidebar. Makes an immediate impression and works perfectly for senior and executive roles.',
    bestFor:  ['Business Analysts', 'Marketing Managers', 'Sales Leaders', 'Operations Roles'],
    features: ['Dark sidebar accent', 'Two-column layout', 'Skills list with dots', 'Contact sidebar'],
    color:    '#2C2C36',
    preview:  <CorporatePreviewPage />,
  },
  {
    id:       'creative',
    name:     'Creative',
    badge:    'PRO',
    badgeBg:  '#3D2B6B',
    badgeColor: '#fff',
    tagline:  'Expressive. Modern. Memorable.',
    desc:     'A bold purple header block with a modern two-column body. Designed to stand out while staying professional for creative industries.',
    bestFor:  ['UI/UX Designers', 'Marketers', 'Content Creators', 'Brand Strategists'],
    features: ['Coloured header block', 'Contact pill row', 'Skills as badges', 'Modern two-col body'],
    color:    '#5B3FA6',
    preview:  <CreativePreviewPage />,
  },
]

// Small inline preview components used only on this page
function MinimalPreviewPage() {
  return (
    <div className="w-full h-full p-4 text-left overflow-hidden bg-white">
      <div className="border-b border-[#E4E2EE] pb-3 mb-3">
        <p className="text-sm font-bold text-[#1A1A22]">Olawale Chukwu</p>
        <p className="text-xs text-[#5B3FA6]">Senior Frontend Engineer</p>
        <div className="flex gap-3 mt-1">
          <span className="text-[9px] text-[#7A7893]">Olachukwu2026@email.com</span>
          <span className="text-[9px] text-[#7A7893]">Lagos, Nigeria</span>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[8px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b border-[#E4E2EE] pb-0.5 mb-1.5">Summary</p>
        <p className="text-[8px] text-[#2C2C36] leading-relaxed">Results-driven engineer with 5+ years building scalable web apps. Specialises in React and TypeScript.</p>
      </div>
      <div className="mb-3">
        <p className="text-[8px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b border-[#E4E2EE] pb-0.5 mb-1.5">Experience</p>
        <div className="flex justify-between mb-1">
          <div>
            <p className="text-[9px] font-semibold text-[#1A1A22]">Frontend Engineer</p>
            <p className="text-[8px] text-[#5B3FA6]">Flutterwave</p>
          </div>
          <p className="text-[8px] text-[#7A7893]">2022 — Now</p>
        </div>
        <p className="text-[8px] text-[#2C2C36]">· Reduced drop-off by 32% via dashboard redesign</p>
        <p className="text-[8px] text-[#2C2C36]">· Built reusable component library for 4 teams</p>
      </div>
      <div>
        <p className="text-[8px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b border-[#E4E2EE] pb-0.5 mb-1.5">Skills</p>
        <div className="flex flex-wrap gap-1">
          {['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind'].map(s => (
            <span key={s} className="text-[7px] bg-[#EDE8F7] text-[#3D2B6B] px-1.5 py-0.5 rounded">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CorporatePreviewPage() {
  return (
    <div className="w-full h-full flex overflow-hidden text-left">
      <div className="w-[38%] bg-[#2C2C36] p-3 flex flex-col gap-2.5">
        <div>
          <p className="text-[9px] font-bold text-white">Alex Johnson</p>
          <p className="text-[7px] text-[#C4B8E8] mt-0.5">Frontend Engineer</p>
        </div>
        <div>
          <p className="text-[6px] font-bold uppercase tracking-widest text-[#9B8DC0] border-b border-[#3D2B6B] pb-0.5 mb-1">Contact</p>
          <p className="text-[6px] text-[#E4E2EE]">alex@email.com</p>
          <p className="text-[6px] text-[#E4E2EE]">Lagos, Nigeria</p>
        </div>
        <div>
          <p className="text-[6px] font-bold uppercase tracking-widest text-[#9B8DC0] border-b border-[#3D2B6B] pb-0.5 mb-1">Skills</p>
          {['React', 'TypeScript', 'Node.js', 'Supabase'].map(s => (
            <div key={s} className="flex items-center gap-1 mb-0.5">
              <span className="w-1 h-1 rounded-full bg-[#7C5CBF]" />
              <span className="text-[6px] text-[#E4E2EE]">{s}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[6px] font-bold uppercase tracking-widest text-[#9B8DC0] border-b border-[#3D2B6B] pb-0.5 mb-1">Education</p>
          <p className="text-[6px] font-semibold text-white">University of Lagos</p>
          <p className="text-[6px] text-[#C4B8E8]">B.Sc Computer Science</p>
          <p className="text-[6px] text-[#9B8DC0]">2019</p>
        </div>
      </div>
      <div className="flex-1 p-3">
        <div className="mb-2">
          <p className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b-2 border-[#3D2B6B] pb-0.5 mb-1">Profile</p>
          <p className="text-[6px] text-[#2C2C36] leading-relaxed">Results-driven engineer with 5+ years building scalable web applications.</p>
        </div>
        <div>
          <p className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b-2 border-[#3D2B6B] pb-0.5 mb-1">Experience</p>
          <div className="flex justify-between mb-0.5">
            <div>
              <p className="text-[7px] font-bold text-[#1A1A22]">Frontend Engineer</p>
              <p className="text-[6px] text-[#5B3FA6]">Flutterwave</p>
            </div>
            <p className="text-[6px] text-[#7A7893]">2022—Now</p>
          </div>
          <p className="text-[6px] text-[#2C2C36]">▸ Reduced drop-off by 32%</p>
          <p className="text-[6px] text-[#2C2C36]">▸ Built component library</p>
        </div>
      </div>
    </div>
  )
}

function CreativePreviewPage() {
  return (
    <div className="w-full h-full overflow-hidden text-left">
      <div className="bg-[#3D2B6B] px-4 py-3 mb-2">
        <p className="text-[10px] font-bold text-white">Alex Johnson</p>
        <p className="text-[7px] text-[#C4B8E8] mt-0.5">Senior Frontend Engineer</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {['alex@email.com', 'Lagos', 'linkedin.com/in/alex'].map(item => (
            <span key={item} className="text-[5px] bg-white/10 text-[#E4E2EE] px-1.5 py-0.5 rounded-full">{item}</span>
          ))}
        </div>
      </div>
      <div className="px-4">
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-2 h-2 bg-[#3D2B6B] rounded-sm" />
            <p className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B]">About Me</p>
          </div>
          <p className="text-[6px] text-[#2C2C36] leading-relaxed border-t border-[#E4E2EE] pt-1">
            Results-driven engineer with 5+ years building scalable web applications.
          </p>
        </div>
        <div className="grid grid-cols-[1fr_48px] gap-2">
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-2 h-2 bg-[#3D2B6B] rounded-sm" />
              <p className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B]">Experience</p>
            </div>
            <div className="border-t border-[#E4E2EE] pt-1">
              <div className="flex justify-between items-start mb-0.5">
                <div>
                  <p className="text-[7px] font-bold text-[#1A1A22]">Frontend Engineer</p>
                  <p className="text-[6px] text-[#5B3FA6]">Flutterwave</p>
                </div>
                <span className="text-[4px] bg-[#3D2B6B] text-white px-1 py-0.5 rounded-full">2022-Now</span>
              </div>
              <p className="text-[5px] text-[#2C2C36]">◆ Reduced drop-off by 32%</p>
              <p className="text-[5px] text-[#2C2C36]">◆ Built component library</p>
            </div>
          </div>
          <div>
            <p className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-0.5">Skills</p>
            <div className="border-t border-[#E4E2EE] pt-1 flex flex-col gap-0.5">
              {['React', 'TypeScript', 'Node.js', 'Supabase'].map(s => (
                <span key={s} className="text-[5px] bg-[#EDE8F7] text-[#3D2B6B] px-1 py-0.5 rounded text-center">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Templates() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-4">
          Resume Templates
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A22] tracking-tight leading-tight mb-5">
          Three templates.<br />
          <span className="text-[#3D2B6B]">One perfect resume.</span>
        </h1>
        <p className="text-lg text-[#7A7893] max-w-xl mx-auto leading-relaxed">
          Every template is ATS-friendly, recruiter-approved, and designed to make your experience shine. Pick one and make it yours.
        </p>
      </section>

      {/* ── TEMPLATES ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex flex-col gap-16">
          {TEMPLATES.map((t, i) => (
            <div
              key={t.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
            >
              {/* Preview card */}
              <div className={`${i % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="bg-white border border-[#E4E2EE] rounded-xl overflow-hidden shadow-sm"
                     style={{ height: 340 }}>
                  {t.preview}
                </div>
              </div>

              {/* Info */}
              <div className={`${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-[#1A1A22] tracking-tight">
                    {t.name}
                  </h2>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: t.badgeBg, color: t.badgeColor }}
                  >
                    {t.badge}
                  </span>
                </div>

                <p className="text-base font-semibold mb-3" style={{ color: t.color }}>
                  {t.tagline}
                </p>

                <p className="text-[#7A7893] leading-relaxed mb-6">
                  {t.desc}
                </p>

                {/* Best for */}
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#7A7893] uppercase tracking-wider mb-2">
                    Best for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t.bestFor.map(role => (
                      <span key={role} className="text-xs bg-white border border-[#E4E2EE] text-[#2C2C36] px-3 py-1 rounded-full">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <p className="text-xs font-bold text-[#7A7893] uppercase tracking-wider mb-2">
                    Features
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {t.features.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: t.color }}>✓</span>
                        <span className="text-sm text-[#2C2C36]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link to="/auth">
                    <button
                      className="text-sm font-semibold px-6 py-2.5 rounded-md text-white transition-opacity hover:opacity-90"
                      style={{ background: t.color }}
                    >
                      Use this template →
                    </button>
                  </Link>
                  {t.badge === 'PRO' && (
                    <Link to="/pricing">
                      <button className="text-sm font-medium px-6 py-2.5 rounded-md border border-[#E4E2EE] text-[#7A7893] hover:border-[#3D2B6B] hover:text-[#3D2B6B] transition-colors">
                        View pricing
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-[#E4E2EE] bg-white">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-[#1A1A22] tracking-tight text-center mb-10">
            Template questions
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { q: 'Can I switch templates after building my resume?', a: 'Yes. Switch any time from the preview panel in the builder — your data carries over instantly.' },
              { q: 'Are all templates ATS-friendly?', a: 'Yes. All three use clean layouts, standard fonts, and no images or tables that ATS systems struggle to read.' },
              { q: 'Which template should I choose?', a: 'Minimal for tech and engineering. Corporate for business and management. Creative for design and marketing.' },
              { q: 'Can I customise the colours or fonts?', a: 'Template customisation is on our roadmap. For now, each template has a fixed design optimised for readability.' },
            ].map(item => (
              <div key={item.q} className="bg-[#F8F7FC] border border-[#E4E2EE] rounded-lg p-5">
                <p className="text-sm font-semibold text-[#1A1A22] mb-2">{item.q}</p>
                <p className="text-sm text-[#7A7893] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#3D2B6B] py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Ready to pick your template?
          </h2>
          <p className="text-[#C4B8E8] mb-8">
            Start free with the Minimal template. Upgrade to Pro for all three.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/auth" className="inline-block bg-white text-[#3D2B6B] font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#EDE8F7] transition-colors">
              Start for free →
            </Link>
            <Link to="/pricing" className="inline-block bg-transparent border border-[#5B3FA6] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#5B3FA6] transition-colors">
              See Pro pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4E2EE] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-[#2C2C36]">
            Orbit<span className="text-[#3D2B6B]">CV</span>
          </span>
          <p className="text-xs text-[#7A7893]">
            Built by{' '}
            <a href="https://axiondigital.vercel.app" className="text-[#3D2B6B] hover:underline">
              Axion Digital
            </a>
          </p>
          <p className="text-xs text-[#7A7893]">© 2026 OrbitCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

