// src/pages/Builder.jsx
import { useState, useEffect }                    from 'react'
import { Link, useSearchParams }                  from 'react-router-dom'
import { useMutation, useQuery, useQueryClient }  from '@tanstack/react-query'
import { PDFDownloadLink }                        from '@react-pdf/renderer'
import { createResume, updateResume, initializeSingleUnlock, fetchResumeById } from '../lib/resumeService'
import useResumeStore                             from '../store/resumeStore'
import { useProfile }                             from '../hooks/useProfile'
import StepIndicator                              from '../components/ui/StepIndicator'
import Button                                     from '../components/ui/Button'
import PersonalForm                               from '../components/forms/PersonalForm'
import SummaryForm                                from '../components/forms/SummaryForm'
import ExperienceForm                             from '../components/forms/ExperienceForm'
import EducationForm                              from '../components/forms/EducationForm'
import SkillsForm                                 from '../components/forms/SkillsForm'
import ProjectsForm                               from '../components/forms/ProjectsForm'
import CertsForm                                  from '../components/forms/CertsForm'
import MinimalTemplate                            from '../components/resume/MinimalTemplate'
import CorporateTemplate                          from '../components/resume/CorporateTemplate'
import CreativeTemplate                           from '../components/resume/CreativeTemplate'
import MinimalPDF                                 from '../components/resume/pdf/MinimalPDF'

export default function Builder() {
  // ── UI state
  const [step,        setStep]        = useState(1)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // ── Save state
  const [resumeId, setResumeId] = useState(null)
  const [saveName, setSaveName] = useState('My Resume')

  const TOTAL = 7

  // ── Resume store
  const {
    personal, summary, experience,
    education, skills, projects, certs,
    template, setTemplate, loadResume,
  } = useResumeStore()

  // ── Auth / plan
  const { isPro } = useProfile()

  // ── TanStack Query
  const queryClient = useQueryClient()

  // ── URL params — editing existing resume
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('id')

  // Fetch existing resume if editing
  const { data: existingResume } = useQuery({
    queryKey: ['resume', editId],
    queryFn:  () => fetchResumeById(editId),
    enabled:  !!editId,
    staleTime: Infinity,
  })

  const isResumeUnlocked = existingResume?.is_unlocked || false
  const hasAccess = isPro || isResumeUnlocked

  // Load existing resume into store when data arrives
  useEffect(() => {
    if (existingResume) {
      loadResume(existingResume.content, existingResume.template)
      setResumeId(existingResume.id)
      setSaveName(existingResume.name)
    }
  }, [existingResume])

  // Pre-fill save name from personal data
  useEffect(() => {
    if (personal.name && !editId) {
      setSaveName(`${personal.name}'s Resume`)
    }
  }, [personal.name])

  // ── Save mutation via TanStack Query ──
  const saveMutation = useMutation({
    mutationFn: ({ isNew, data }) =>
      isNew ? createResume(data) : updateResume(resumeId, data),

    onSuccess: (result) => {
      if (!resumeId && result?.id) {
        setResumeId(result.id)
      }
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    },

    onError: (err) => {
      if (err.message?.includes('Premium template requires')) {
        alert('This template requires Pro or a resume unlock. Upgrade to save with this template.')
      } else if (err.message?.includes('Free plan is limited')) {
        alert('You\'ve reached your free plan limit. Upgrade to Pro for unlimited resumes.')
      } else {
        alert('Failed to save: ' + err.message)
      }
    },
  })

  const handleSave = () => {
    const content = {
      personal, summary, experience,
      education, skills, projects, certs,
    }
    saveMutation.mutate({
      isNew: !resumeId,
      data:  { name: saveName, content, template },
    })
  }

  // ── Step navigation
  const goNext = () => setStep(s => Math.min(s + 1, TOTAL))
  const goPrev = () => setStep(s => Math.max(s - 1, 1))

  function renderStep() {
    switch (step) {
      case 1: return <PersonalForm />
      case 2: return <SummaryForm />
      case 3: return <ExperienceForm />
      case 4: return <EducationForm />
      case 5: return <SkillsForm />
      case 6: return <ProjectsForm />
      case 7: return <CertsForm />
      default: return null
    }
  }

  const saveLabel = () => {
    if (saveMutation.isPending) return 'Saving...'
    if (saveMutation.isSuccess) return '✓ Saved'
    return 'Save'
  }

  // ── Shared PDF document — used by both desktop and mobile download buttons
  const pdfDocument = (
    <MinimalPDF
      personal={personal}
      summary={summary}
      experience={experience}
      education={education}
      skills={skills}
      projects={projects}
      certs={certs}
    />
  )
  const pdfFileName = `${personal.name || 'Resume'} - OrbitCV.pdf`

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-[#E4E2EE] px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-50">

        <Link to="/" className="font-bold text-lg tracking-tight text-[#2C2C36]">
          Orbit<span className="text-[#3D2B6B]">CV</span>
        </Link>

        <div className="hidden md:block">
          <StepIndicator current={step} />
        </div>

        <div className="flex items-center gap-2">

          {/* Resume name — desktop only */}
          <input
            type="text"
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            className="hidden md:block text-sm border border-[#E4E2EE] rounded-md px-3 py-1.5 text-[#2C2C36] outline-none focus:border-[#3D2B6B] w-36"
            placeholder="Resume name"
          />

          {/* Save button — desktop only */}
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className={`
              hidden md:block text-sm font-medium px-4 py-2 rounded-md border transition-colors
              ${saveMutation.isSuccess
                ? 'bg-green-50 border-green-300 text-green-600'
                : 'border-[#E4E2EE] text-[#2C2C36] hover:border-[#3D2B6B] hover:text-[#3D2B6B]'}
            `}
          >
            {saveLabel()}
          </button>

          {/* Download PDF — desktop only — react-pdf, works reliably on mobile too */}
          <PDFDownloadLink
            document={pdfDocument}
            fileName={pdfFileName}
            className="hidden md:block"
          >
            {({ loading }) => (
              <button
                disabled={loading}
                className="text-sm font-semibold text-white bg-[#3D2B6B] px-4 py-2 rounded-md hover:bg-[#2e2053] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Preparing PDF...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>

          {/* Hamburger — mobile only */}
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
              <div className="absolute right-0 top-11 w-56 bg-white border border-[#E4E2EE] rounded-lg shadow-lg z-50 overflow-hidden">

                {/* Preview toggle */}
                <button
                  onClick={() => { setShowPreview(o => !o); setMenuOpen(false) }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-[#F8F7FC] transition-colors border-b border-[#E4E2EE]"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${showPreview ? 'bg-[#3D2B6B]' : 'bg-[#E4E2EE]'}`} />
                    <span className="font-medium text-[#2C2C36]">
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors duration-200 ${showPreview ? 'bg-[#3D2B6B]' : 'bg-[#E4E2EE]'}`}>
                    <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-200 ${showPreview ? 'left-4' : 'left-0.5'}`} />
                  </div>
                </button>

                {/* Progress */}
                <div className="px-4 py-3 border-b border-[#E4E2EE]">
                  <p className="text-xs text-[#7A7893] mb-1 font-medium">PROGRESS</p>
                  <p className="text-sm font-semibold text-[#2C2C36]">Step {step} of {TOTAL}</p>
                  <div className="w-full h-1.5 bg-[#E4E2EE] rounded-full mt-2">
                    <div
                      className="h-1.5 bg-[#3D2B6B] rounded-full transition-all duration-300"
                      style={{ width: `${(step / TOTAL) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Save in menu */}
                <div className="px-4 py-3 border-b border-[#E4E2EE]">
                  <input
                    type="text"
                    value={saveName}
                    onChange={e => setSaveName(e.target.value)}
                    className="w-full text-sm border border-[#E4E2EE] rounded-md px-3 py-1.5 text-[#2C2C36] outline-none focus:border-[#3D2B6B] mb-2"
                    placeholder="Resume name"
                  />
                  <button
                    onClick={() => { handleSave(); setMenuOpen(false) }}
                    disabled={saveMutation.isPending}
                    className={`
                      w-full text-sm font-medium py-2 rounded-md border transition-colors
                      ${saveMutation.isSuccess
                        ? 'bg-green-50 border-green-300 text-green-600'
                        : 'border-[#E4E2EE] text-[#2C2C36] hover:border-[#3D2B6B]'}
                    `}
                  >
                    {saveLabel()}
                  </button>
                </div>

                {/* Download in menu — react-pdf */}
                <PDFDownloadLink
                  document={pdfDocument}
                  fileName={pdfFileName}
                  className="w-full block"
                >
                  {({ loading }) => (
                    <button
                      onClick={() => !loading && setMenuOpen(false)}
                      disabled={loading}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#3D2B6B] hover:bg-[#F8F7FC] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Preparing PDF...' : '↓ Download PDF'}
                    </button>
                  )}
                </PDFDownloadLink>

              </div>
            )}
          </div>

        </div>
      </header>

      {/* ── Mobile step progress bar ── */}
      <div className="md:hidden bg-white border-b border-[#E4E2EE] px-4 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-medium text-[#7A7893]">Step {step} of {TOTAL}</p>
          <p className="text-xs font-semibold text-[#3D2B6B]">
            {['Personal','Summary','Experience','Education','Skills','Projects','Certifications'][step - 1]}
          </p>
        </div>
        <div className="w-full h-1 bg-[#E4E2EE] rounded-full">
          <div
            className="h-1 bg-[#3D2B6B] rounded-full transition-all duration-300"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Two-panel layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Form */}
        <div className={`
          w-full md:w-[42%] overflow-y-auto border-r border-[#E4E2EE] bg-white
          ${showPreview ? 'hidden' : 'block'} md:block
        `}>
          <div className="p-5 md:p-6 max-w-xl pb-24 md:pb-6">
            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4E2EE]">
              <Button variant="ghost" onClick={goPrev} disabled={step === 1}>← Back</Button>
              <span className="text-xs text-[#7A7893]">{step} of {TOTAL}</span>
              <Button onClick={goNext} disabled={step === TOTAL}>
                {step === TOTAL ? 'Finish' : 'Continue →'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right — Live Preview */}
        <div className={`
          flex-1 flex-col items-center bg-[#F0EEF8] overflow-y-auto p-4 md:p-8
          ${showPreview ? 'flex' : 'hidden'} md:flex
        `}>

          {/* Template switcher */}
          <div className="flex gap-2 mb-4 bg-white border border-[#E4E2EE] rounded-lg p-1">
            {['minimal', 'corporate', 'creative'].map(t => {
              const isLocked = !hasAccess && t !== 'minimal'
              return (
                <button
                  key={t}
                  onClick={() => !isLocked && setTemplate(t)}
                  title={isLocked ? 'Locked — go Pro or unlock this resume' : ''}
                  className={`
                    px-4 py-1.5 text-xs font-semibold rounded-md capitalize
                    transition-all duration-150 flex items-center gap-1.5
                    ${template === t
                      ? 'bg-[#3D2B6B] text-white'
                      : isLocked
                        ? 'text-[#C4C4C4] cursor-not-allowed'
                        : 'text-[#7A7893] hover:text-[#2C2C36] cursor-pointer'}
                  `}
                >
                  {isLocked && <span className="text-[10px]">🔒</span>}
                  {t}
                </button>
              )
            })}
          </div>

          {/* Access options */}
          {!hasAccess && (
            <div className="w-full md:w-[595px] mb-4 bg-white border border-[#E4E2EE] rounded-xl p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm font-semibold text-[#2C2C36]">Access options</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    if (!resumeId) return
                    try {
                      const url = await initializeSingleUnlock(resumeId)
                      window.location.href = url
                    } catch (err) {
                      alert('Could not start payment: ' + err.message)
                    }
                  }}
                  disabled={!resumeId}
                  className={`
                    text-left rounded-xl border p-4 transition-all duration-150
                    ${resumeId
                      ? 'bg-white border-[#E4E2EE] hover:border-[#CDBEE8] hover:shadow-sm cursor-pointer'
                      : 'bg-[#FAFAFC] border-[#E4E2EE] opacity-60 cursor-not-allowed'}
                  `}
                >
                  <p className="text-2xl font-bold tracking-tight text-[#1A1A22]">₦1,500</p>
                  <p className="mt-1 text-sm text-[#7A7893]">This resume only</p>
                </button>

                <button
                  type="button"
                  onClick={() => { window.location.href = '/pricing' }}
                  className="text-left rounded-xl border border-[#E4E2EE] bg-white p-4 transition-all duration-150 hover:border-[#CDBEE8] hover:shadow-sm cursor-pointer"
                >
                  <p className="text-2xl font-bold tracking-tight text-[#1A1A22]">₦5,000/mo</p>
                  <p className="mt-1 text-sm text-[#7A7893]">Unlimited resumes and templates</p>
                </button>
              </div>

              {!resumeId && (
                <p className="text-[11px] text-[#7A7893] mt-2">
                  💡 Save this resume first to unlock the single-resume option.
                </p>
              )}
            </div>
          )}

          {/* Resume preview */}
          <div
            id="resume-preview"
            className="bg-white w-full md:w-[595px] min-h-[842px] shadow-sm border border-[#E4E2EE] rounded overflow-hidden"
          >
            {template === 'minimal'   && <div className="p-10"><MinimalTemplate /></div>}
            {template === 'corporate' && <CorporateTemplate />}
            {template === 'creative'  && <CreativeTemplate />}
          </div>

        </div>

      </div>

      {/* ── Mobile floating preview toggle ── */}
      <button
        onClick={() => setShowPreview(o => !o)}
        className="md:hidden fixed bottom-6 right-5 z-40 flex items-center gap-2 bg-[#3D2B6B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-[#3D2B6B]/30 border border-[#5B3FA6] transition-all duration-200 active:scale-95"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${showPreview ? 'bg-[#A78BFA]' : 'bg-white'}`} />
        {showPreview ? 'Edit Form' : 'Preview'}
      </button>

    </div>
  )
}