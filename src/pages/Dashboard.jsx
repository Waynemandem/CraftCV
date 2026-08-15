// src/pages/Dashboard.jsx
import { Link, useNavigate }                          from 'react-router-dom'
import { useQuery, useMutation, useQueryClient }      from '@tanstack/react-query'
import { fetchResumes, deleteResume as deleteResumeDB } from '../lib/resumeService'
import useAuthStore                                   from '../store/authStore'
import useResumeStore                                 from '../store/resumeStore'
import { useProfile }                                 from '../hooks/useProfile'
import Card                                           from '../components/ui/Card'
import Button                                         from '../components/ui/Button'
import UpgradeButton                                  from '../components/ui/UpgradeButton'
import { useState }                                   from 'react'
import { cancelSubscription }                         from '../lib/profileService'

export default function Dashboard() {
  const { user, signOut }       = useAuthStore()
  const { resetResume }         = useResumeStore()
  const { profile, isPro }      = useProfile()
  const navigate                = useNavigate()
  const queryClient             = useQueryClient()
  const [menuOpen, setMenuOpen] = useState(false)

  // ── Fetch resumes with TanStack Query ──
  const {
    data: resumes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['resumes'],
    queryFn:  fetchResumes,
  })

  // ── Delete resume mutation ──
  const deleteMutation = useMutation({
    mutationFn: deleteResumeDB,
    onSuccess: () => {
      // Automatically refresh resume list after delete
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    },
    onError: (err) => {
      alert('Failed to delete: ' + err.message)
    },
  })

  const cancelMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      alert('Subscription cancelled. You will keep Pro access until the current period ends.')
    },
    onError: (err) => {
      alert('Failed to cancel subscription: ' + err.message)
    },
  })

  const handleNewResume = () => {
    resetResume()
    navigate('/builder')
  }

    const handleSignOut = async () => {
    await signOut()
    queryClient.clear()
    navigate('/')
  }


  const handleEdit = (resume) => {
    navigate(`/builder?id=${resume.id}`)
  }

  const handleCancelSubscription = () => {
    const message = profile?.plan_expires
      ? `Cancel monthly renewal? You will keep Pro access until ${new Date(profile.plan_expires).toLocaleDateString()}.`
      : 'Cancel monthly renewal?'

    if (!window.confirm(message)) return

    cancelMutation.mutate()
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
            {/* Show Pro badge or upgrade button */}
            {isPro ? (
              <span className="text-xs font-semibold text-[#3D2B6B] bg-[#EDE8F7] px-3 py-1 rounded-full">
                ✦ Pro
              </span>
            ) : (
              <UpgradeButton size="sm" />
            )}
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
                  {isPro && (
                    <span className="text-[10px] font-semibold text-[#3D2B6B] bg-[#EDE8F7] px-2 py-0.5 rounded-full mt-1 inline-block">
                      ✦ Pro
                    </span>
                  )}
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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-[#E4E2EE] rounded-lg p-4 md:p-5">
            <p className="text-xl md:text-2xl font-bold text-[#1A1A22]">{resumes.length}</p>
            <p className="text-xs text-[#7A7893] mt-0.5">Resumes</p>
          </div>
          <div className="bg-white border border-[#E4E2EE] rounded-lg p-4 md:p-5">
            <p className="text-xl md:text-2xl font-bold text-[#1A1A22]">{isPro ? '3' : '1'}</p>
            <p className="text-xs text-[#7A7893] mt-0.5">Templates</p>
          </div>
          <div className="bg-white border border-[#E4E2EE] rounded-lg p-4 md:p-5">
            <p className="text-xl md:text-2xl font-bold"
               style={{ color: isPro ? '#3D2B6B' : '#1A1A22' }}>
              {isPro ? 'Pro ✦' : 'Free'}
            </p>
            <p className="text-xs text-[#7A7893] mt-0.5">Current plan</p>
          </div>
        </div>

        {/* ── Upgrade banner — only shown to free users ── */}
        {!isPro && (
          <div
            className="rounded-xl p-5 md:p-6 mb-8 flex items-center justify-between flex-wrap gap-4"
            style={{ background: 'linear-gradient(135deg, #3D2B6B 0%, #5B3FA6 100%)' }}
          >
            <div>
              <p className="text-base font-bold text-white mb-1">
                Unlock the full OrbitCV experience
              </p>
              <p className="text-sm text-[#C4B8E8]">
                AI writing · All 3 templates · Unlimited resumes · Clean PDF export
              </p>
            </div>
            <UpgradeButton size="md" />
          </div>
        )}

        {isPro && profile?.plan_expires && (
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#1A1A22]">Subscription</p>
                <p className="text-sm text-[#7A7893] mt-1">
                  {profile.cancelled_at
                    ? `Cancellation scheduled. Pro access ends on ${new Date(profile.plan_expires).toLocaleDateString()}.`
                    : `Monthly Pro renews on ${new Date(profile.plan_expires).toLocaleDateString()}.`}
                </p>
              </div>
              {!profile.cancelled_at && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleCancelSubscription}
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending ? 'Cancelling...' : 'Cancel subscription'}
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#1A1A22]">My Resumes</h2>
          <Button size="sm" onClick={handleNewResume}>+ New Resume</Button>
        </div>

        {/* ── Loading ── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-5 h-5 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin" />
          </div>

        ) : isError ? (
          /* Error state */
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-sm text-red-600 font-medium">Failed to load resumes.</p>
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ['resumes'] })}
              className="text-sm text-red-500 hover:underline mt-2"
            >
              Try again
            </button>
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
          /* ── Resume cards grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map(resume => (
              <Card key={resume.id}>

                {/* Thumbnail with real data */}
                <div className="w-full h-36 bg-[#F8F7FC] border border-[#E4E2EE] rounded-md mb-4 overflow-hidden">
                  <div className="p-3 h-full flex flex-col">
                    <div className="mb-2">
                      <p className="text-[11px] font-bold text-[#1A1A22] truncate">
                        {resume.content?.personal?.name || 'Untitled'}
                      </p>
                      <p className="text-[10px] text-[#5B3FA6] truncate">
                        {resume.content?.personal?.title || ''}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="h-1.5 w-full bg-[#E4E2EE] rounded" />
                      <div className="h-1.5 w-5/6 bg-[#E4E2EE] rounded" />
                      <div className="h-1.5 w-4/6 bg-[#E4E2EE] rounded" />
                      <div className="h-1.5 w-full bg-[#E4E2EE] rounded mt-1" />
                      <div className="h-1.5 w-3/4 bg-[#E4E2EE] rounded" />
                    </div>
                    {resume.content?.skills?.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-1">
                        {resume.content.skills.slice(0, 3).map(s => (
                          <span key={s} className="text-[8px] bg-[#EDE8F7] text-[#3D2B6B] px-1.5 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
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
                    {resume.content?.skills?.length > 0 && (
                      <p className="text-xs text-[#7A7893] mt-0.5">
                        {resume.content.skills.length} skills
                        {resume.content.experience?.length > 0 && ` · ${resume.content.experience.length} jobs`}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => handleEdit(resume)}
                      className="text-xs text-[#3D2B6B] border border-[#E4E2EE] px-2.5 py-1 rounded hover:bg-[#EDE8F7] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(resume.id)}
                      disabled={deleteMutation.isPending}
                      className="text-xs text-red-400 border border-[#E4E2EE] px-2.5 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {deleteMutation.isPending ? '...' : 'Del'}
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
