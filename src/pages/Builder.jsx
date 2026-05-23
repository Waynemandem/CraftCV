// src/pages/Builder.jsx
import { useState }    from 'react'
import { Link }        from 'react-router-dom'
import StepIndicator   from '../components/ui/StepIndicator'
import Button          from '../components/ui/Button'
import PersonalForm    from '../components/forms/PersonalForm'
import SummaryForm     from '../components/forms/SummaryForm'
import ExperienceForm  from '../components/forms/ExperienceForm'
import EducationForm   from '../components/forms/EducationForm'
import SkillsForm      from '../components/forms/SkillsForm'
import ProjectsForm    from '../components/forms/ProjectsForm'
import CertsForm       from '../components/forms/CertsForm'
import MinimalTemplate from '../components/resume/MinimalTemplate'

export default function Builder() {
  const [step, setStep]           = useState(1)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const TOTAL = 7

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL))
  const goPrev = () => setStep((s) => Math.max(s - 1, 1))

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

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-[#E4E2EE] px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-50">

        {/* Logo */}
        <Link to="/" className="font-bold text-lg tracking-tight text-[#2C2C36]">
          Orbit<span className="text-[#3D2B6B]">CV</span>
        </Link>

        {/* Step indicator — hidden on mobile */}
        <div className="hidden md:block">
          <StepIndicator current={step} />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">

          {/* Download — desktop only */}
          <button className="hidden md:block text-sm font-semibold text-white bg-[#3D2B6B] px-4 py-2 rounded-md hover:bg-[#2e2053] transition-colors">
            Download PDF
          </button>

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

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 top-11 w-52 bg-white border border-[#E4E2EE] rounded-lg shadow-lg z-50 overflow-hidden">

                {/* Preview toggle */}
                <button
                  onClick={() => { setShowPreview(o => !o); setMenuOpen(false) }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-[#F8F7FC] transition-colors border-b border-[#E4E2EE]"
                >
                  <div className="flex items-center gap-2">
                    {/* Colored indicator dot */}
                    <span className={`w-2 h-2 rounded-full ${showPreview ? 'bg-[#3D2B6B]' : 'bg-[#E4E2EE]'}`} />
                    <span className="font-medium text-[#2C2C36]">
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </span>
                  </div>
                  {/* Toggle pill */}
                  <div className={`w-8 h-4 rounded-full transition-colors duration-200 relative ${showPreview ? 'bg-[#3D2B6B]' : 'bg-[#E4E2EE]'}`}>
                    <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all duration-200 ${showPreview ? 'left-4' : 'left-0.5'}`} />
                  </div>
                </button>

                {/* Step indicator in menu */}
                <div className="px-4 py-3 border-b border-[#E4E2EE]">
                  <p className="text-xs text-[#7A7893] mb-2 font-medium">PROGRESS</p>
                  <p className="text-sm font-semibold text-[#2C2C36]">
                    Step {step} of {TOTAL}
                  </p>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#E4E2EE] rounded-full mt-2">
                    <div
                      className="h-1.5 bg-[#3D2B6B] rounded-full transition-all duration-300"
                      style={{ width: `${(step / TOTAL) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Download in menu */}
                <button className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#3D2B6B] hover:bg-[#F8F7FC] transition-colors">
                  ↓ Download PDF
                </button>

              </div>
            )}
          </div>

        </div>
      </header>

      {/* ── Mobile step progress bar ── */}
      <div className="md:hidden bg-white border-b border-[#E4E2EE] px-4 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-medium text-[#7A7893]">
            Step {step} of {TOTAL}
          </p>
          <p className="text-xs font-semibold text-[#3D2B6B]">
            {['Personal', 'Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications'][step - 1]}
          </p>
        </div>
        <div className="w-full h-1 bg-[#E4E2EE] rounded-full">
          <div
            className="h-1 bg-[#3D2B6B] rounded-full transition-all duration-300"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Main two-panel layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Form panel */}
        <div className={`
          w-full md:w-[42%] overflow-y-auto border-r border-[#E4E2EE] bg-white
          ${showPreview ? 'hidden' : 'block'}
          md:block
        `}>
          <div className="p-5 md:p-6 max-w-xl">

            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4E2EE]">
              <Button variant="ghost" onClick={goPrev} disabled={step === 1}>
                ← Back
              </Button>
              <span className="text-xs text-[#7A7893]">{step} of {TOTAL}</span>
              <Button onClick={goNext} disabled={step === TOTAL}>
                {step === TOTAL ? 'Finish' : 'Continue →'}
              </Button>
            </div>

          </div>
        </div>

        {/* Right — Preview panel */}
        <div className={`
          flex-1 items-start justify-center bg-[#F0EEF8] overflow-y-auto p-4 md:p-8
          ${showPreview ? 'flex' : 'hidden'}
          md:flex
        `}>
          <div
            id="resume-preview"
            className="bg-white w-full md:w-[595px] min-h-[842px] shadow-sm border border-[#E4E2EE] rounded p-6 md:p-10"
          >
            <MinimalTemplate />
          </div>
        </div>

      </div>

      {/* ── Mobile floating preview toggle button ── */}
      <button
        onClick={() => setShowPreview(o => !o)}
        className="
          md:hidden fixed bottom-6 right-5 z-40
          flex items-center gap-2
          bg-[#3D2B6B] text-white
          text-xs font-semibold
          px-4 py-2.5 rounded-full
          shadow-lg shadow-[#3D2B6B]/30
          border border-[#5B3FA6]
          transition-all duration-200 active:scale-95
        "
      >
        <span className={`w-1.5 h-1.5 rounded-full ${showPreview ? 'bg-[#A78BFA]' : 'bg-white'}`} />
        {showPreview ? 'Edit Form' : 'Preview'}
      </button>

    </div>
  )
}