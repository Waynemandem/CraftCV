// src/pages/Dashboard.jsx
import { useEffect, useState }                        from 'react'
import { Link, useNavigate }                          from 'react-router-dom'
import { fetchResumes, deleteResume as deleteResumeDB } from '../lib/resumeService'
import useAuthStore                                   from '../store/authStore'
import useResumeStore                                 from '../store/resumeStore'
import Card                                           from '../components/ui/Card'
import Button                                         from '../components/ui/Button'

export default function Dashboard() {
  const { user, signOut }       = useAuthStore()
  const { resetResume }         = useResumeStore()
  const navigate                = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumes,  setResumes]  = useState([])
  const [loading,  setLoading]  = useState(true)

  // Load resumes from Supabase on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchResumes()
        setResumes(data)
      } catch (err) {
        console.error('Failed to load resumes:', err)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleNewResume = () => {
    resetResume()
    navigate('/builder')
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const deleteResume = async (id) => {
    try {
      await deleteResumeDB(id)
      setResumes(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    }
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0]
    || user?.email?.split('@')[0]
    || 'there'

  return (
    <div className="min-h-screen bg-[#F8F7FC]">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-[#E4E2EE] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">

          <Link to="/" className="font-bold text-lg tracking-tight text-[#2C2C36]">
            Orbit<span className="text-[#3D2B6B]">CV</span>
          </Link>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-[#7A7893]">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-[#7A7893] hover:text-[#2C2C36] transition-colors"
            >
              Sign out
            </button>
            <Button size="sm" onClick={handleNewResume}>+ New Resume</Button>
          </div>

          {/* Mobile hamburger */}
          <div className="relative md:hidden">
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 border border-[#E4E2EE] rounded-md"
            >
              <span className={`block w-4 h-px bg-[#2C2C36] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-4 h-px bg-[#2C2C36] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-px bg-[#2C2C36] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 w-52 bg-white border border-[#E4E2EE] rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E4E2EE]">
                  <p className="text-xs text-[#7A7893]">Signed in as</p>
                  <p className="text-sm font-medium text-[#2C2C36] truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { handleNewResume(); setMenuOpen(false) }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-[#3D2B6B] hover:bg-[#F8F7FC] border-b border-[#E4E2EE]"
                >
                  + New Resume
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-10">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A22] tracking-tight">
            Hey, {firstName}!
          </h1>
          <p className="text-sm text-[#7A7893] mt-1">
            Manage your resumes and build new ones.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { val: resumes.length, label: 'Resumes'      },
            { val: '3',            label: 'Templates'     },
            { val: 'Free',         label: 'Current plan'  },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#E4E2EE] rounded-lg p-4 md:p-5">
              <p className="text-xl md:text-2xl font-bold text-[#1A1A22]">{s.val}</p>
              <p className="text-xs text-[#7A7893] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#1A1A22]">My Resumes</h2>
          <Button size="sm" onClick={handleNewResume}>+ New Resume</Button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-5 h-5 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin" />
          </div>

        ) : resumes.length === 0 ? (
          /* Empty state */
          <div className="bg-white border border-dashed border-[#E4E2EE] rounded-lg p-16 text-center">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-base font-semibold text-[#1A1A22] mb-2">No resumes yet</h3>
            <p className="text-sm text-[#7A7893] mb-6">
              Create your first resume and start landing interviews.
            </p>
            <Button onClick={handleNewResume}>Build my first resume →</Button>
          </div>

        ) : (
          /* Resume cards grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map(resume => (
              <Card key={resume.id}>

                {/* Thumbnail */}
                <div className="w-full h-36 bg-[#F8F7FC] border border-[#E4E2EE] rounded-md mb-4 flex flex-col items-start justify-start p-3 overflow-hidden">
                  <div className="h-2.5 w-24 bg-[#2C2C36]/40 rounded mb-1.5" />
                  <div className="h-2 w-16 bg-[#3D2B6B]/30 rounded mb-3" />
                  <div className="h-1.5 w-full bg-[#E4E2EE] rounded mb-1" />
                  <div className="h-1.5 w-5/6 bg-[#E4E2EE] rounded mb-1" />
                  <div className="h-1.5 w-4/6 bg-[#E4E2EE] rounded" />
                </div>

                {/* Info + actions */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#1A1A22] truncate">
                      {resume.name}
                    </h3>
                    <p className="text-xs text-[#7A7893] mt-0.5 capitalize">
                      {resume.template} · {new Date(resume.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => navigate('/builder')}
                      className="text-xs text-[#3D2B6B] border border-[#E4E2EE] px-2.5 py-1 rounded hover:bg-[#EDE8F7] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteResume(resume.id)}
                      className="text-xs text-red-400 border border-[#E4E2EE] px-2.5 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      Del
                    </button>
                  </div>
                </div>

              </Card>
            ))}

            {/* New resume card */}
            <button
              onClick={handleNewResume}
              className="bg-white border border-dashed border-[#E4E2EE] rounded-lg p-5 flex flex-col items-center justify-center gap-2 hover:border-[#3D2B6B] hover:bg-[#F8F7FC] transition-all duration-150 min-h-[180px]"
            >
              <span className="text-2xl text-[#E4E2EE]">+</span>
              <span className="text-sm font-medium text-[#7A7893]">New Resume</span>
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-5 md:px-8 py-6 mt-10 border-t border-[#E4E2EE]">
        <p className="text-xs text-[#7A7893]">
          Built by <a href="https://axiondigital.vercel.app" className="text-[#3D2B6B] hover:underline">Axion Digital</a>
        </p>
      </footer>

    </div>
  )
}