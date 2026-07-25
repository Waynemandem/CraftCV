// src/pages/Pricing.jsx
import { Link }    from 'react-router-dom'
import Navbar      from '../components/layout/Navbar'
import useAuthStore from '../store/authStore'

const PLANS = [
  {
    name:     'Free',
    price:    '₦0',
    period:   'forever',
    desc:     'Get started and explore the builder.',
    cta:      'Get Started Free',
    ctaLink:  '/auth',
    highlight: false,
    features: [
      'Up to 3 resumes',
      'Minimal template only',
      'Basic PDF export',
      'No AI features',
    ],
    missing: [
      'All 3 templates',
      'AI bullet improvements',
      'AI summary generator',
      'AI skill suggestions',
      'Unlimited resumes',
      'Clean PDF (no watermark)',
    ],
  },
  {
    name:     'Pro',
    price:    '₦8,900',
    period:   'per month',
    desc:     'Everything you need to land your next role.',
    cta:      'Start Pro',
    ctaLink:  '/auth',
    highlight: true,
    features: [
      'Unlimited resumes',
      'All 3 templates',
      'AI bullet improvements',
      'AI summary generator',
      'AI skill suggestions',
      'Clean PDF export',
      'Priority support',
    ],
    missing: [],
  },
  {
    name:     'Agency',
    price:    '₦24,900',
    period:   'per month',
    desc:     'For recruiters, HR firms, and career coaches.',
    cta:      'Contact Us',
    ctaLink:  'mailto:hello@saturnlab.dev',
    highlight: false,
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Custom branding',
      'Bulk resume creation',
      'Dedicated account manager',
      'Invoice billing',
    ],
    missing: [],
  },
]

const FAQ = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from your dashboard with no questions asked. You keep access until the end of your billing period.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all Nigerian bank cards, USSD, and bank transfers via Paystack.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'The Free plan lets you try the builder before upgrading. No credit card needed to start.',
  },
  {
    q: 'What makes OrbitCV ATS-friendly?',
    a: 'Our templates use clean single-column layouts, standard fonts, and no images or tables that confuse ATS software.',
  },
  {
    q: 'Can I use OrbitCV for multiple job applications?',
    a: 'Yes — Pro lets you create unlimited resumes so you can tailor one for each role you apply to.',
  },
]

export default function Pricing() {
  const user = useAuthStore(s => s.user)

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-[#EDE8F7] text-[#3D2B6B] text-xs font-semibold px-3 py-1.5 rounded-md mb-6">
          ✦ Simple, transparent pricing
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-[#1A1A22] tracking-tight leading-tight mb-4">
          Invest in your career.
        </h1>
        <p className="text-[#7A7893] text-lg max-w-md mx-auto">
          One affordable plan. Cancel anytime. No hidden fees.
        </p>
      </section>

      {/* ── PLANS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`
                rounded-xl border p-7 flex flex-col relative
                ${plan.highlight
                  ? 'bg-[#3D2B6B] border-[#3D2B6B] shadow-xl shadow-[#3D2B6B]/20'
                  : 'bg-white border-[#E4E2EE]'}
              `}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FFD700] text-[#1A1A22] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${plan.highlight ? 'text-[#C4B8E8]' : 'text-[#7A7893]'}`}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span className={`text-3xl font-bold tracking-tight ${plan.highlight ? 'text-white' : 'text-[#1A1A22]'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-1 ${plan.highlight ? 'text-[#C4B8E8]' : 'text-[#7A7893]'}`}>
                  / {plan.period}
                </span>
              </div>

              <p className={`text-sm mb-6 ${plan.highlight ? 'text-[#C4B8E8]' : 'text-[#7A7893]'}`}>
                {plan.desc}
              </p>

              {/* CTA */}
              <Link
                to={plan.ctaLink}
                className={`
                  w-full text-center text-sm font-semibold py-2.5 rounded-md mb-6 block transition-colors
                  ${plan.highlight
                    ? 'bg-white text-[#3D2B6B] hover:bg-[#EDE8F7]'
                    : 'bg-[#3D2B6B] text-white hover:bg-[#2e2053]'}
                `}
              >
                {plan.cta} →
              </Link>

              {/* Divider */}
              <div className={`border-t mb-5 ${plan.highlight ? 'border-[#5B3FA6]' : 'border-[#E4E2EE]'}`} />

              {/* Features */}
              <ul className="flex flex-col gap-2.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 flex-shrink-0 text-sm ${plan.highlight ? 'text-[#A78BFA]' : 'text-[#3D2B6B]'}`}>
                      ✓
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-[#E4E2EE]' : 'text-[#2C2C36]'}`}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map(f => (
                  <li key={f} className="flex items-start gap-2.5 opacity-40">
                    <span className="mt-0.5 flex-shrink-0 text-sm text-[#7A7893]">✕</span>
                    <span className="text-sm text-[#7A7893]">{f}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* Money back note */}
        <p className="text-center text-xs text-[#7A7893] mt-8">
          🔒 Secured by Paystack · Cancel anytime · No contracts
        </p>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-[#1A1A22] tracking-tight text-center mb-8">
          Compare plans
        </h2>
        <div className="bg-white border border-[#E4E2EE] rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-[#E4E2EE]">
            <div className="p-4 col-span-1" />
            {['Free', 'Pro', 'Agency'].map((p, i) => (
              <div key={p} className={`p-4 text-center ${i === 1 ? 'bg-[#3D2B6B]' : ''}`}>
                <p className={`text-sm font-bold ${i === 1 ? 'text-white' : 'text-[#1A1A22]'}`}>{p}</p>
                <p className={`text-xs mt-0.5 ${i === 1 ? 'text-[#C4B8E8]' : 'text-[#7A7893]'}`}>
                  {['₦0', '₦8,900', '₦24,900'][i]}
                </p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            { feature: 'Resumes',          vals: ['Up to 3 resumes', 'Unlimited', 'Unlimited'] },
            { feature: 'Templates',        vals: ['1', '3', '3'] },
            { feature: 'AI features',      vals: ['✕', '✓', '✓'] },
            { feature: 'PDF export',       vals: ['Watermarked', 'Clean', 'Clean'] },
            { feature: 'Team members',     vals: ['1', '1', '10'] },
            { feature: 'Custom branding',  vals: ['✕', '✕', '✓'] },
            { feature: 'Priority support', vals: ['✕', '✓', '✓'] },
          ].map((row, i) => (
            <div key={row.feature} className={`grid grid-cols-4 border-b border-[#E4E2EE] last:border-0 ${i % 2 === 0 ? 'bg-[#F8F7FC]' : 'bg-white'}`}>
              <div className="p-3.5 pl-5">
                <p className="text-sm text-[#2C2C36] font-medium">{row.feature}</p>
              </div>
              {row.vals.map((val, j) => (
                <div key={j} className={`p-3.5 text-center ${j === 1 ? 'bg-[#3D2B6B]/5' : ''}`}>
                  <p className={`text-sm ${val === '✓' ? 'text-[#3D2B6B] font-bold' : val === '✕' ? 'text-[#E4E2EE]' : 'text-[#2C2C36]'}`}>
                    {val}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold text-[#1A1A22] tracking-tight text-center mb-8">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {FAQ.map(item => (
            <div key={item.q} className="bg-white border border-[#E4E2EE] rounded-lg p-5">
              <p className="text-sm font-semibold text-[#1A1A22] mb-2">{item.q}</p>
              <p className="text-sm text-[#7A7893] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#3D2B6B] py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            Ready to get hired faster?
          </h2>
          <p className="text-[#C4B8E8] mb-8">
            Join thousands of professionals building better resumes with OrbitCV.
          </p>
          <Link
            to={user ? '/dashboard' : '/auth'}
            className="inline-block bg-white text-[#3D2B6B] font-semibold text-sm px-8 py-3 rounded-md hover:bg-[#EDE8F7] transition-colors"
          >
            {user ? 'Go to Dashboard →' : 'Start for free →'}
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
