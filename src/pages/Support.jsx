// src/pages/Support.jsx
import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import useAuthStore from '../store/authStore'

export default function Support() {
  const user = useAuthStore(s => s.user)
  const [form, setForm] = useState({ 
    name: '', 
    email: user?.email || '', 
    subject: '', 
    message: '' 
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const update = (field) => (e) =>
    setForm(p => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      const response = await fetch('/api/send-support-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setSent(true)
    } catch (err) {
      setError('Could not send message. Try emailing us directly at support@orbitcv.vercel.app')
    }

    setSending(false)
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC]">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold text-[#3D2B6B] uppercase tracking-widest mb-3">
          Support
        </p>
        <h1 className="text-3xl font-bold text-[#1A1A22] tracking-tight mb-3">
          Need help?
        </h1>
        <p className="text-sm text-[#7A7893] mb-10">
          Send us a message and we'll get back to you within 24 hours.
        </p>

        {sent ? (
          <div className="bg-[#EDE8F7] border border-[#3D2B6B]/20 rounded-xl p-8 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-base font-semibold text-[#1A1A22] mb-2">Message sent!</h3>
            <p className="text-sm text-[#7A7893]">
              We'll reply to <strong>{form.email}</strong> within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C36] mb-2">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={update('name')}
                required
                className="w-full px-4 py-2.5 border border-[#E4E2EE] rounded-lg outline-none focus:border-[#3D2B6B] transition-colors text-[#1A1A22]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C36] mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                required
                className="w-full px-4 py-2.5 border border-[#E4E2EE] rounded-lg outline-none focus:border-[#3D2B6B] transition-colors text-[#1A1A22]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C36] mb-2">Subject</label>
              <select
                value={form.subject}
                onChange={update('subject')}
                required
                className="w-full px-4 py-2.5 border border-[#E4E2EE] rounded-lg outline-none focus:border-[#3D2B6B] transition-colors text-[#1A1A22] bg-white"
              >
                <option value="">Select a topic</option>
                <option value="billing">Billing / Payment issue</option>
                <option value="bug">Something isn't working</option>
                <option value="feature">Feature request</option>
                <option value="account">Account help</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C36] mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={update('message')}
                required
                rows={5}
                className="w-full px-4 py-2.5 border border-[#E4E2EE] rounded-lg outline-none focus:border-[#3D2B6B] transition-colors text-[#1A1A22] resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">⚠️ {error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#3D2B6B] text-white font-semibold py-2.5 rounded-lg hover:bg-[#2e2053] transition-colors disabled:opacity-60"
            >
              {sending ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}

        <div className="mt-10 pt-6 border-t border-[#E4E2EE] text-center">
          <p className="text-xs text-[#7A7893]">
            Or email us directly at{' '}
            <a href="mailto:support@orbitcv.vercel.app" className="text-[#3D2B6B] hover:underline">
              support@orbitcv.vercel.app
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}