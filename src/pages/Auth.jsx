// src/pages/Auth.jsx
import { useState }    from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input           from '../components/ui/Input'
import Button          from '../components/ui/Button'
import useAuthStore    from '../store/authStore'

export default function Auth() {
  const [tab, setTab]     = useState('signup')
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signUp, signIn, signInWithGoogle } = useAuthStore()
  const navigate = useNavigate()

  const update = (field) => (e) =>
    setForm(p => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (tab === 'signup') {
        await signUp(form.email, form.password, form.name)
        // Supabase sends a confirmation email
        // For now go straight to dashboard
        navigate('/dashboard')
      } else {
        await signIn(form.email, form.password)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
      // Google redirects back automatically
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* ── LEFT — Brand panel ── */}
      <div className="hidden md:flex flex-col justify-between bg-[#3D2B6B] p-12">
        <Link to="/" className="text-white font-bold text-xl tracking-tight">
          Orbit<span className="text-[#C4B8E8]">CV</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-white leading-snug mb-4 tracking-tight">
            Your next job starts<br />with a great resume.
          </h2>
          <p className="text-[#C4B8E8] text-sm leading-relaxed max-w-xs">
            AI-powered. ATS-friendly. Built for professionals who want to move fast.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { val: '10k+', label: 'Resumes built' },
              { val: '3',    label: 'Templates'     },
              { val: '98%',  label: 'ATS pass rate' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-white font-bold text-xl">{s.val}</p>
                <p className="text-[#C4B8E8] text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[#9B8DC0] text-xs">
          Built by <a href="https://saturnlab.dev" className="text-[#C4B8E8] hover:underline">Saturn Lab</a>
        </p>
      </div>

      {/* ── RIGHT — Form ── */}
      <div className="flex items-center justify-center bg-[#F8F7FC] px-6 py-12">
        <div className="w-full max-w-sm">

          <Link to="/" className="md:hidden block text-center font-bold text-xl mb-8 tracking-tight">
            Orbit<span className="text-[#3D2B6B]">CV</span>
          </Link>

          {/* Tabs */}
          <div className="flex border border-[#E4E2EE] rounded-md p-1 bg-white mb-8">
            {['signup', 'login'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError('') }}
                className={`flex-1 py-2 text-sm font-medium rounded transition-all duration-150 ${tab === t ? 'bg-[#3D2B6B] text-white' : 'text-[#7A7893] hover:text-[#2C2C36]'}`}>
                {t === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="text-xl font-bold text-[#1A1A22] tracking-tight">
              {tab === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-[#7A7893] mt-1">
              {tab === 'signup' ? 'Free to start. No credit card required.' : 'Log in to access your resumes.'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'signup' && (
              <Input label="Full Name" placeholder="John Doe"
                value={form.name} onChange={update('name')} required />
            )}
            <Input label="Email Address" type="email" placeholder="you@example.com"
              value={form.email} onChange={update('email')} required />
            <Input label="Password" type="password" placeholder="••••••••"
              value={form.password} onChange={update('password')}
              hint={tab === 'signup' ? 'Minimum 8 characters' : ''} required />

            {tab === 'login' && (
              <div className="text-right -mt-1">
                <a href="#" className="text-xs text-[#3D2B6B] hover:underline">Forgot password?</a>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Please wait...' : tab === 'signup' ? 'Create account →' : 'Log in →'}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E4E2EE]" />
            <span className="text-xs text-[#7A7893]">or continue with</span>
            <div className="flex-1 h-px bg-[#E4E2EE]" />
          </div>

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 border border-[#E4E2EE] bg-white rounded-md py-2.5 text-sm font-medium text-[#2C2C36] hover:bg-[#F8F7FC] transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-[#7A7893] mt-6">
            {tab === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => { setTab(tab === 'signup' ? 'login' : 'signup'); setError('') }}
              className="text-[#3D2B6B] font-medium hover:underline">
              {tab === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}