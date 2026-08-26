// src/pages/Features.jsx
import { Link }  from 'react-router-dom'
import Navbar    from '../components/layout/Navbar'

const FEATURES = [
  {
    icon: '✦',
    category: 'AI POWERED',
    title: 'AI Resume Writing',
    desc: 'Stuck on what to write? Codex generates professional bullet points, summaries, and skill suggestions tailored to your job title. No more staring at a blank page.',
    points: [
      'Generate your professional summary in one click',
      'Rewrite weak bullet points with strong action verbs',
      'Get 10 relevant skills suggested for your role',
    ],
    color: '#3D2B6B',
  },
  {
    icon: '◎',
    category: 'ATS FRIENDLY',
    title: 'Beat the Robots',
    desc: 'Over 75% of resumes are rejected by ATS software before a human ever reads them. OrbitCV templates are engineered to pass every filter.',
    points: [
      'Clean single-column layouts scanners love',
      'Standard fonts and no images or tables',
      'Proper section headings ATS systems recognise',
    ],
    color: '#0EA5E9',
  },
  {
    icon: '↓',
    category: 'PDF EXPORT',
    title: 'One-Click PDF Download',
    desc: 'Download a pixel-perfect PDF resume instantly. What you see in the preview is exactly what the employer gets — no layout shifts, no surprises.',
    points: [
      'A4 format ready for any job application',
      'Print-accurate colours and fonts',
      'Named after you automatically',
    ],
    color: '#10B981',
  },
  {
    icon: '⟳',
    category: 'LIVE PREVIEW',
    title: 'Real-Time Preview',
    desc: 'Watch your resume build itself as you type. Every field updates the preview instantly — no saving, no refreshing.',
    points: [
      'Side-by-side form and preview on desktop',
      'Toggle preview on mobile with one tap',
      'Switch templates without losing your data',
    ],
    color: '#F59E0B',
  },
  {
    icon: '☁',
    category: 'CLOUD STORAGE',
    title: 'Save & Access Anywhere',
    desc: 'Your resumes are saved securely to the cloud. Pick up where you left off on any device — phone, tablet, or computer.',
    points: [
      'Unlimited saves on Pro plan',
      'Access from any device',
      'Edit and update anytime',
    ],
    color: '#8B5CF6',
  },
  {
    icon: '◈',
    category: 'MULTI TEMPLATE',
    title: '3 Professional Templates',
    desc: 'Choose from three carefully designed templates — each built for different industries and roles. Switch instantly without re-entering your data.',
    points: [
      'Minimal — clean and tech-friendly',
      'Corporate — bold and business-ready',
      'Creative — standout for design roles',
    ],
    color: '#EC4899',
  },
]

const STEPS = [
  { num: '01', title: 'Create your account', desc: 'Sign up free in 30 seconds. No credit card required.' },
  { num: '02', title: 'Fill in your details', desc: 'Work through 7 simple steps — personal info, experience, skills, and more.' },
  { num: '03', title: 'Let AI help you', desc: 'Use AI to improve your bullet points, generate a summary, and suggest skills.' },
  { num: '04', title: 'Pick your template', desc: 'Choose from Minimal, Corporate, or Creative. Switch any time.' },
  { num: '05', title: 'Download your PDF', desc: 'Hit Download and get a print-perfect resume in seconds.' },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#EDE8F7] text-[#3D2B6B] text-xs font-semibold px-3 py-1.5 rounded-md mb-6">
          ✦ Everything you need to get hired
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A22] tracking-tight leading-tight mb-5">
          Built for job seekers<br />
          <span className="text-[#3D2B6B]">who want results.</span>
        </h1>
        <p className="text-lg text-[#7A7893] max-w-xl mx-auto leading-relaxed">
          OrbitCV combines AI writing assistance, ATS-friendly templates, and a dead-simple builder so you can create a resume that actually lands interviews.
        </p>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="bg-white border border-[#E4E2EE] rounded-xl p-6 flex flex-col gap-4 hover:border-[#3D2B6B] transition-all duration-150 hover:-translate-y-1 group"
            >
              {/* Icon + category */}
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                  style={{ background: f.color + '15', color: f.color }}
                >
                  {f.icon}
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider"
                  style={{ background: f.color + '12', color: f.color }}
                >
                  {f.category}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-base font-bold text-[#1A1A22] mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-[#7A7893] leading-relaxed mb-4">
                  {f.desc}
                </p>

                {/* Points */}
                <ul className="flex flex-col gap-2">
                  {f.points.map(point => (
                    <li key={point} className="flex items-start gap-2">
                      <span style={{ color: f.color }} className="mt-0.5 flex-shrink-0 text-xs font-bold">✓</span>
                      <span className="text-xs text-[#7A7893] leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-[#E4E2EE] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-3 text-center">
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A22] tracking-tight text-center mb-14">
            From blank page to hired in minutes.
          </h2>

          <div className="flex flex-col gap-0">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex gap-6 items-start pb-10 relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-5 top-12 w-px h-full bg-[#E4E2EE]" />
                )}

                {/* Number circle */}
                <div className="w-10 h-10 rounded-full bg-[#3D2B6B] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                  {s.num}
                </div>

                {/* Text */}
                <div className="pt-1.5">
                  <h3 className="text-base font-semibold text-[#1A1A22] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#7A7893] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE VS PRO ── */}
      <section className="border-t border-[#E4E2EE] bg-[#F8F7FC]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A22] tracking-tight text-center mb-12">
            Free vs Pro
          </h2>

          <div className="bg-white border border-[#E4E2EE] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-[#E4E2EE]">
              <div className="p-4 col-span-1" />
              <div className="p-4 text-center border-l border-[#E4E2EE]">
                <p className="text-sm font-bold text-[#1A1A22]">Free</p>
                <p className="text-xs text-[#7A7893] mt-0.5">₦0</p>
              </div>
              <div className="p-4 text-center bg-[#3D2B6B] border-l border-[#3D2B6B]">
                <p className="text-sm font-bold text-white">Pro ✦</p>
                                <p className="text-xs text-[#C4B8E8] mt-0.5">₦5,000/mo</p>

              </div>
            </div>

            {[
              { feature: 'Resumes',         free: '3',            pro: 'Unlimited' },
              { feature: 'Templates',        free: 'Minimal only', pro: 'All 3'    },
              { feature: 'AI Summary',       free: '✕',            pro: '✓'        },
              { feature: 'AI Bullet Points', free: '✕',            pro: '✓'        },
              { feature: 'AI Skill Suggest', free: '✕',            pro: '✓'        },
              { feature: 'PDF Export',       free: 'Watermarked',  pro: 'Clean'    },
              { feature: 'Cloud Save',       free: '✓',            pro: '✓'        },
              { feature: 'Priority Support', free: '✕',            pro: '✓'        },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-b border-[#E4E2EE] last:border-0 ${i % 2 === 0 ? 'bg-[#F8F7FC]' : 'bg-white'}`}>
                <div className="p-3.5 pl-5">
                  <p className="text-sm text-[#2C2C36] font-medium">{row.feature}</p>
                </div>
                <div className="p-3.5 text-center border-l border-[#E4E2EE]">
                  <p className={`text-sm ${row.free === '✕' ? 'text-[#E4E2EE]' : 'text-[#2C2C36]'}`}>{row.free}</p>
                </div>
                <div className="p-3.5 text-center border-l border-[#E4E2EE] bg-[#3D2B6B]/5">
                  <p className={`text-sm font-semibold ${row.pro === '✓' || row.pro === 'Unlimited' || row.pro === 'All 3' || row.pro === 'Clean' ? 'text-[#3D2B6B]' : 'text-[#2C2C36]'}`}>
                    {row.pro}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#3D2B6B] py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Start building for free.
          </h2>
          <p className="text-[#C4B8E8] mb-8">
            No credit card. No commitment. Just a better resume.
          </p>
          <Link
            to="/auth"
            className="inline-block bg-white text-[#3D2B6B] font-semibold text-sm px-8 py-3 rounded-md hover:bg-[#EDE8F7] transition-colors"
          >
            Create my resume →
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  </div>
</footer>
    </div>
  )
}