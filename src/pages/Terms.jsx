// src/pages/Terms.jsx
import { Link } from 'react-router-dom'
import Navbar   from '../components/layout/Navbar'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A22] tracking-tight mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-[#7A7893] mb-12">
          Last updated: June 2026
        </p>

        <div className="flex flex-col gap-10">

          <Section title="1. Agreement to Terms">
            By accessing or using OrbitCV ("the Service"), operated by Axion Digital ("we", "our", "us"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
          </Section>

          <Section title="2. Description of Service">
            OrbitCV is a web-based resume building tool that allows users to create, edit, save, and export professional resumes. The Service includes AI-assisted writing features, multiple resume templates, and PDF export functionality. Some features are available only on paid subscription plans.
          </Section>

          <Section title="3. Accounts">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must be at least 16 years old to use this Service.</li>
            </ul>
          </Section>

          <Section title="4. Subscription Plans & Payments">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>OrbitCV offers a Free plan and a paid Pro plan billed monthly via Paystack.</li>
              <li>Subscription fees are billed in advance on a recurring monthly basis.</li>
              <li>You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period.</li>
              <li>We do not offer refunds for partial billing periods, except where required by law.</li>
              <li>We reserve the right to change subscription pricing with reasonable notice.</li>
            </ul>
          </Section>

          <Section title="5. Acceptable Use">
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Use the Service for any unlawful purpose or to submit false or misleading information.</li>
              <li>Attempt to gain unauthorized access to any part of the Service, other accounts, or systems.</li>
              <li>Use automated tools, bots, or scripts to access the Service or abuse the AI features.</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the Service.</li>
              <li>Use the Service to generate content that is fraudulent, defamatory, or infringes on others' rights.</li>
            </ul>
          </Section>

          <Section title="6. AI-Generated Content">
            OrbitCV uses third-party AI services to help generate resume content such as summaries, bullet points, and skill suggestions. AI-generated content is provided as a suggestion only. You are responsible for reviewing, editing, and verifying the accuracy of any content before using it in your resume or any job application. We do not guarantee the accuracy, truthfulness, or suitability of AI-generated content.
          </Section>

          <Section title="7. Your Content">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>You retain full ownership of the resume content you create using the Service.</li>
              <li>By using the Service, you grant us a limited license to store, process, and display your content solely for the purpose of providing the Service to you.</li>
              <li>You are solely responsible for the accuracy and legality of the content you submit.</li>
            </ul>
          </Section>

          <Section title="8. Service Availability">
            We strive to keep OrbitCV available at all times but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or factors beyond our control. We are not liable for any loss resulting from service downtime.
          </Section>

          <Section title="9. Limitation of Liability">
            OrbitCV is provided "as is" without warranties of any kind. We are not responsible for employment outcomes, interview results, or job application decisions made using resumes created on our platform. To the fullest extent permitted by law, Axion Digital shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
          </Section>

          <Section title="10. Termination">
            We reserve the right to suspend or terminate your account if you violate these Terms, engage in abusive behavior toward the Service (including excessive automated use of AI features), or for any other reason at our discretion, with or without notice.
          </Section>

          <Section title="11. Changes to These Terms">
            We may update these Terms from time to time. Continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.
          </Section>

          <Section title="12. Governing Law">
            These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict of law principles.
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have any questions about these Terms, please contact us at{' '}
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