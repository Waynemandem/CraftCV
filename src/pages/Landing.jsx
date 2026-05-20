// src/pages/Landing.jsx
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card   from '../components/ui/Card'
import ResumeMockup from '../components/resume/ResumeMockup'
import Navbar from '../components/layout/Navbar'

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
  { name: 'Minimal',   desc: 'Clean and distraction-free. Perfect for tech roles.' },
  { name: 'Corporate', desc: 'Two-column layout for business and management roles.' },
  { name: 'Creative',  desc: 'Bold header treatment for design and marketing roles.' },
]

export default function Landing() {
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
              Write better, faster — land more interviews.
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
              <Card key={t.name} onClick={() => {}}>
                {/* Template preview placeholder */}
                <div className="w-full h-44 bg-[#F8F7FC] border border-[#E4E2EE] rounded mb-4 flex items-center justify-center">
                  <span className="text-xs text-[#7A7893]">{t.name} preview</span>
                </div>
                <h3 className="text-sm font-semibold text-[#1A1A22] mb-1">{t.name}</h3>
                <p className="text-xs text-[#7A7893]">{t.desc}</p>
              </Card>
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
      <footer className="border-t border-[#E4E2EE] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-[#2C2C36]">Orbit<span className="text-[#3D2B6B]">CV</span></span>
          <p className="text-xs text-[#7A7893]">Built by <a href="https://saturnlab.dev" className="text-[#3D2B6B] hover:underline">Saturn Lab</a></p>
          <p className="text-xs text-[#7A7893]">© 2026 OrbitCV. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
      }
