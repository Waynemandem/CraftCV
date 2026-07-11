// src/pages/Landing.jsx
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card   from '../components/ui/Card'
import ResumeMockup from '../components/resume/ResumeMockup'
import Navbar from '../components/layout/Navbar'
import  useAuthStore  from '../store/authStore'

// Feature highlights data
const FEATURES = [
  {
    icon: '✦',
    title: 'AI-Powered Writing',
    desc: 'Generate professional bullet points, summaries, and descriptions instantly.',
  },
  {
    icon: '◎',
    title: 'ATS-Friendly Layouts',
    desc: 'Templates built to pass applicant tracking systems at top companies.',
  },
  {
    icon: '↓',
    title: 'One-Click PDF Export',
    desc: 'Download a pixel-perfect PDF resume ready to send to any employer.',
  },
]

const TEMPLATES = [
  {
    name: 'Minimal',
    desc: 'Clean and distraction-free. Perfect for tech roles.',
    preview: <MinimalPreview />,
  },
  {
    name: 'Corporate',
    desc: 'Two-column layout for business and management roles.',
    preview: <CorporatePreview />,
  },
  {
    name: 'Creative',
    desc: 'Bold header treatment for design and marketing roles.',
    preview: <CreativePreview />,
  },
]


// ── Mini template previews ──
// These are scaled-down static snapshots of each template style

function MinimalPreview() {
  return (
    <div className="w-full h-full p-3 text-left overflow-hidden">
      <div className="border-b border-[#E4E2EE] pb-2 mb-2">
        <div className="text-[9px] font-bold text-[#1A1A22]">Alex Johnson</div>
        <div className="text-[7px] text-[#5B3FA6] font-medium">Senior Frontend Engineer</div>
        <div className="flex gap-2 mt-0.5">
          <span className="text-[6px] text-[#7A7893]">alex@email.com</span>
          <span className="text-[6px] text-[#7A7893]">Lagos, Nigeria</span>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b border-[#E4E2EE] pb-0.5 mb-1">Summary</div>
        <div className="text-[6px] text-[#2C2C36] leading-relaxed">Results-driven engineer with 5+ years building scalable web apps. Specialises in React and TypeScript.</div>
      </div>
      <div className="mb-2">
        <div className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b border-[#E4E2EE] pb-0.5 mb-1">Experience</div>
        <div className="flex justify-between">
          <div>
            <div className="text-[7px] font-semibold text-[#1A1A22]">Frontend Engineer</div>
            <div className="text-[6px] text-[#5B3FA6]">Flutterwave</div>
          </div>
          <div className="text-[6px] text-[#7A7893]">2022 — Now</div>
        </div>
        <div className="mt-0.5 space-y-0.5 pl-1.5">
          <div className="text-[6px] text-[#2C2C36]">· Reduced drop-off by 32% via dashboard redesign</div>
          <div className="text-[6px] text-[#2C2C36]">· Built reusable component library for 4 teams</div>
        </div>
      </div>
      <div>
        <div className="text-[6px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b border-[#E4E2EE] pb-0.5 mb-1">Skills</div>
        <div className="flex flex-wrap gap-0.5">
          {['React', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind'].map(s => (
            <span key={s} className="text-[5px] bg-[#EDE8F7] text-[#3D2B6B] px-1 py-0.5 rounded">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CorporatePreview() {
  return (
    <div className="w-full h-full flex overflow-hidden text-left">
      {/* Sidebar */}
      <div className="w-[38%] bg-[#2C2C36] p-2.5 flex flex-col gap-2">
        <div>
          <div className="text-[8px] font-bold text-white leading-tight">Alex Johnson</div>
          <div className="text-[6px] text-[#C4B8E8] mt-0.5">Frontend Engineer</div>
        </div>
        <div>
          <div className="text-[5px] font-bold uppercase tracking-widest text-[#9B8DC0] border-b border-[#3D2B6B] pb-0.5 mb-1">Contact</div>
          <div className="space-y-0.5">
            <div className="text-[5px] text-[#E4E2EE]">alex@email.com</div>
            <div className="text-[5px] text-[#E4E2EE]">Lagos, Nigeria</div>
          </div>
        </div>
        <div>
          <div className="text-[5px] font-bold uppercase tracking-widest text-[#9B8DC0] border-b border-[#3D2B6B] pb-0.5 mb-1">Skills</div>
          <div className="space-y-0.5">
            {['React', 'TypeScript', 'Node.js', 'Supabase'].map(s => (
              <div key={s} className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#7C5CBF]" />
                <span className="text-[5px] text-[#E4E2EE]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 p-2.5">
        <div className="mb-2">
          <div className="text-[5px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b-2 border-[#3D2B6B] pb-0.5 mb-1">Profile</div>
          <div className="text-[5px] text-[#2C2C36] leading-relaxed">Results-driven engineer with 5+ years building scalable web applications.</div>
        </div>
        <div>
          <div className="text-[5px] font-bold uppercase tracking-widest text-[#3D2B6B] border-b-2 border-[#3D2B6B] pb-0.5 mb-1">Experience</div>
          <div className="flex justify-between mb-0.5">
            <div>
              <div className="text-[6px] font-bold text-[#1A1A22]">Frontend Engineer</div>
              <div className="text-[5px] text-[#5B3FA6]">Flutterwave</div>
            </div>
            <div className="text-[5px] text-[#7A7893]">2022—Now</div>
          </div>
          <div className="space-y-0.5 pl-1.5">
            <div className="text-[5px] text-[#2C2C36]">▸ Reduced drop-off by 32%</div>
            <div className="text-[5px] text-[#2C2C36]">▸ Built component library</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreativePreview() {
  return (
    <div className="w-full h-full overflow-hidden text-left">
      {/* Purple header */}
      <div className="bg-[#3D2B6B] px-3 py-2.5 mb-2">
        <div className="text-[9px] font-bold text-white">Alex Johnson</div>
        <div className="text-[6px] text-[#C4B8E8] mt-0.5">Senior Frontend Engineer</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {['alex@email.com', 'Lagos', 'linkedin.com/in/alex'].map(item => (
            <span key={item} className="text-[5px] bg-white/10 text-[#E4E2EE] px-1.5 py-0.5 rounded-full">{item}</span>
          ))}
        </div>
      </div>
      <div className="px-3">
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 bg-[#3D2B6B] rounded-sm" />
            <div className="text-[5px] font-bold uppercase tracking-widest text-[#3D2B6B]">About Me</div>
          </div>
          <div className="border-t border-[#E4E2EE] pt-1">
            <div className="text-[5px] text-[#2C2C36]">Results-driven engineer with 5+ years building scalable web applications.</div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_50px] gap-2">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 bg-[#3D2B6B] rounded-sm" />
              <div className="text-[5px] font-bold uppercase tracking-widest text-[#3D2B6B]">Experience</div>
            </div>
            <div className="border-t border-[#E4E2EE] pt-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[6px] font-bold text-[#1A1A22]">Frontend Engineer</div>
                  <div className="text-[5px] text-[#5B3FA6]">Flutterwave</div>
                </div>
                <span className="text-[4px] bg-[#3D2B6B] text-white px-1 py-0.5 rounded-full">2022-Now</span>
              </div>
              <div className="mt-0.5 space-y-0.5">
                <div className="text-[5px] text-[#2C2C36]">◆ Reduced drop-off by 32%</div>
                <div className="text-[5px] text-[#2C2C36]">◆ Built component library</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[5px] font-bold uppercase tracking-widest text-[#3D2B6B] mb-1">Skills</div>
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

export default function Landing() {
  const user = useAuthStore(s => s.user)
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EDE8F7] text-[#3D2B6B] text-xs font-semibold px-3 py-1.5 rounded-md mb-6">
              ✦ Powered by Claude AI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A22] leading-tight tracking-tight mb-5">
              Build resumes that<br />
              <span className="text-[#3D2B6B]">get you hired.</span>
            </h1>
            <p className="text-[#7A7893] text-lg leading-relaxed mb-8 max-w-md">
              AI-powered resume builder with ATS-friendly templates.
              Write better, faster and land more interviews.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/auth">
                <Button size="lg">Build my resume →</Button>
              </Link>
              <a href="#templates">
                <Button variant="outline" size="lg">See templates</Button>
              </a>
            </div>
            <p className="text-xs text-[#7A7893] mt-4">
              Free to start · No credit card required
            </p>
          </div>

          {/* Right — resume mockup */}
          <div className="flex justify-center md:justify-end">
            <ResumeMockup />
          </div>

        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="border-t border-[#E4E2EE] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-3">
            Why Orbit CV
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A22] tracking-tight mb-12">
            Everything you need to stand out.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <Card key={f.title}>
                <div className="text-2xl mb-4 text-[#3D2B6B]">{f.icon}</div>
                <h3 className="text-base font-semibold text-[#1A1A22] mb-2">{f.title}</h3>
                <p className="text-sm text-[#7A7893] leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
     <section id="templates" className="border-t border-[#E4E2EE] bg-[#F8F7FC]">
  <div className="max-w-6xl mx-auto px-6 py-20">
    <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-3">
      Templates
    </p>
    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A22] tracking-tight mb-12">
      Pick a template. Make it yours.
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TEMPLATES.map(t => (
        <div
          key={t.name}
          className="bg-white border border-[#E4E2EE] rounded-lg overflow-hidden hover:border-[#3D2B6B] transition-all duration-150 cursor-pointer group"
        >
          {/* Preview area */}
          <div className="h-52 border-b border-[#E4E2EE] overflow-hidden bg-[#F8F7FC] group-hover:bg-white transition-colors">
            {t.preview}
          </div>

          {/* Label */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-[#1A1A22]">{t.name}</h3>
              <Link to={user ? "/builder" : "/auth"}>
                <span className="text-xs text-[#3D2B6B] font-medium hover:underline">
                  Use this →
                </span>
              </Link>
            </div>
            <p className="text-xs text-[#7A7893]">{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ── BOTTOM CTA ── */}
      <section className="border-t border-[#E4E2EE] bg-[#3D2B6B]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Ready to build your resume?
          </h2>
          <p className="text-[#C4B8E8] mb-8">
            Join thousands of professionals who landed jobs with Orbit CV.
          </p>
          <Link to="/auth">
            <button className="bg-white text-[#3D2B6B] font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#EDE8F7] transition-colors duration-150">
              Get started for free →
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
     <footer className="max-w-6xl mx-auto px-5 md:px-8 py-6 mt-10 border-t border-[#E4E2EE]">
  <div className="flex flex-col md:flex-row items-center justify-between gap-3">
    <p className="text-xs text-[#7A7893]">
      Built by{' '}
      <a href="https://axiondigital.vercel.app" className="text-[#3D2B6B] hover:underline">
        Axion Digital
      </a>
    </p>
    <div className="flex items-center gap-4">
      <Link to="/privacy" className="text-xs text-[#7A7893] hover:text-[#3D2B6B] transition-colors">
        Privacy Policy
      </Link>
      <Link to="/terms" className="text-xs text-[#7A7893] hover:text-[#3D2B6B] transition-colors">
        Terms of Service
      </Link>
      <Link to="/support" className="text-xs text-[#7A7893] hover:text-[#3D2B6B] transition-colors">
        Support
      </Link>
    </div>
  </div>
</footer>

    </div>
  )
      }
