// src/pages/Privacy.jsx
import { Link } from 'react-router-dom'
import Navbar   from '../components/layout/Navbar'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A22] tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#7A7893] mb-12">
          Last updated: June 2026
        </p>

        <div className="flex flex-col gap-10">

          <Section title="1. Introduction">
            OrbitCV ("we", "our", "us") is a product built by Axion Digital, based in Lagos, Nigeria. This Privacy Policy explains how we collect, use, and protect your information when you use our resume builder service at orbitcv.vercel.app.
          </Section>

          <Section title="2. Information We Collect">
            <p className="mb-3">When you use OrbitCV, we collect:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Account information:</strong> name, email address, and authentication details when you sign up.</li>
              <li><strong>Resume content:</strong> any information you enter into the builder, including work history, education, skills, and contact details.</li>
              <li><strong>Payment information:</strong> if you upgrade to Pro, payment is processed by Paystack. We do not store your card details.</li>
              <li><strong>Usage data:</strong> general analytics on how the app is used, to help us improve the product.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>To provide and operate the resume builder service.</li>
              <li>To generate AI-assisted content (summaries, bullet points, skill suggestions) using your inputs.</li>
              <li>To process payments and manage your subscription plan.</li>
              <li>To communicate with you about your account or service updates.</li>
              <li>To improve and maintain the platform.</li>
            </ul>
          </Section>

          <Section title="4. AI Processing">
            When you use AI features (summary generation, bullet improvement, skill suggestions), the relevant text you provide is sent securely to our AI provider to generate a response. We do not use your resume content to train any AI models. Data sent for AI processing is not stored by the AI provider beyond what is needed to generate the response.
          </Section>

          <Section title="5. Data Storage & Security">
            Your data is stored securely using Supabase, a hosted database provider with industry-standard encryption and security practices. We implement Row Level Security so that only you can access your own resume data. While we take reasonable steps to protect your information, no system is 100% secure, and we cannot guarantee absolute security.
          </Section>

          <Section title="6. Third-Party Services">
            <p className="mb-3">We use the following third-party services to operate OrbitCV:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li><strong>Supabase</strong> — authentication and database storage</li>
              <li><strong>Vercel</strong> — application hosting</li>
              <li><strong>Paystack</strong> — payment processing</li>
              <li><strong>Anthropic (Claude AI)</strong> — AI content generation</li>
            </ul>
            <p className="mt-3">
              Each of these providers has their own privacy policy governing how they handle data.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Export your resume data at any time via PDF download.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at the email below.
            </p>
          </Section>

          <Section title="8. Data Retention">
            We retain your account and resume data for as long as your account remains active. If you delete your account, your data will be permanently removed from our systems within 30 days.
          </Section>

          <Section title="9. Children's Privacy">
            OrbitCV is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@axiondigital.vercel.app" className="text-[#3D2B6B] hover:underline">
                hello@axiondigital.vercel.app
              </a>
            </p>
          </Section>

        </div>

        <div className="mt-16 pt-8 border-t border-[#E4E2EE]">
          <Link to="/" className="text-sm text-[#3D2B6B] hover:underline">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-[#1A1A22] mb-3">{title}</h2>
      <div className="text-sm text-[#7A7893] leading-relaxed">{children}</div>
    </section>
  )
}