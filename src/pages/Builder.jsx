// src/pages/Builder.jsx
import { useState }   from 'react'
import { Link }       from 'react-router-dom'
import StepIndicator  from '../components/ui/StepIndicator'
import Button         from '../components/ui/Button'
import PersonalForm   from '../components/forms/PersonalForm'
import SummaryForm    from '../components/forms/SummaryForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm  from '../components/forms/EducationForm'
import SkillsForm     from '../components/forms/SkillsForm'
import ProjectsForm   from '../components/forms/ProjectsForm'
import CertsForm      from '../components/forms/CertsForm'
import MinimalTemplate from '../components/resume/MinimalTemplate'

export default function Builder() {
  const [step, setStep] = useState(1)
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
      <header className="bg-white border-b border-[#E4E2EE] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-bold text-lg tracking-tight text-[#2C2C36]">
          Orbit<span className="text-[#3D2B6B]">CV</span>
        </Link>
        <StepIndicator current={step} />
        <button className="text-sm font-semibold text-white bg-[#3D2B6B] px-4 py-2 rounded-md hover:bg-[#2e2053] transition-colors">
          Download PDF
        </button>
      </header>

      {/* ── Two-panel layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Form */}
        <div className="w-full md:w-[42%] overflow-y-auto border-r border-[#E4E2EE] bg-white">
          <div className="p-6 max-w-xl">

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

       {/* Right — Live Preview */}
<div className="hidden md:flex flex-1 items-start justify-center bg-[#F0EEF8] overflow-y-auto p-8">
  <div
    id="resume-preview"
    className="bg-white w-[595px] min-h-[842px] shadow-sm border border-[#E4E2EE] rounded p-10"
  >
    <MinimalTemplate />
  </div>
</div>
      </div>
    </div>
  )
}