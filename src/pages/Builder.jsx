// src/pages/Builder.jsx
import { useState }    from 'react'
import { Link }        from 'react-router-dom'
import StepIndicator   from '../components/ui/StepIndicator'
import Button          from '../components/ui/Button'
import PersonalForm    from '../components/forms/PersonalForm'
import SummaryForm     from '../components/forms/SummaryForm'
import ExperienceForm  from '../components/forms/ExperienceForm'

// Remaining steps — we build these next
const PLACEHOLDER = ({ title }) => (
  <div className="flex items-center justify-center h-40 border border-dashed border-[#E4E2EE] rounded-lg">
    <p className="text-sm text-[#7A7893]">{title} form — coming next step</p>
  </div>
)

const STEPS = [
  { id: 1, component: <PersonalForm /> },
  { id: 2, component: <SummaryForm /> },
  { id: 3, component: <ExperienceForm /> },
  { id: 4, component: <PLACEHOLDER title="Education" /> },
  { id: 5, component: <PLACEHOLDER title="Skills" /> },
  { id: 6, component: <PLACEHOLDER title="Projects" /> },
  { id: 7, component: <PLACEHOLDER title="Certifications" /> },
]

export default function Builder() {
  const [step, setStep] = useState(1)

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length))
  const goPrev = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-[#E4E2EE] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-bold text-lg tracking-tight text-[#2C2C36]">
          Orbit<span className="text-[#3D2B6B]">CV</span>
        </Link>
        <StepIndicator current={step} />
        <button className="
          text-sm font-semibold text-white bg-[#3D2B6B]
          px-4 py-2 rounded-md hover:bg-[#2e2053] transition-colors
        ">
          Download PDF
        </button>
      </header>

      {/* ── Main two-panel layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Form panel */}
        <div className="w-full md:w-[42%] overflow-y-auto border-r border-[#E4E2EE] bg-white">
          <div className="p-6 max-w-xl">

            {/* Render current step */}
            {STEPS[step - 1].component}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4E2EE]">
              <Button
                variant="ghost"
                onClick={goPrev}
                disabled={step === 1}
              >
                ← Back
              </Button>

              <span className="text-xs text-[#7A7893]">
                {step} of {STEPS.length}
              </span>

              <Button onClick={goNext} disabled={step === STEPS.length}>
                {step === STEPS.length ? 'Finish' : 'Continue →'}
              </Button>
            </div>

          </div>
        </div>

        {/* Right — Preview panel (stub for now) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#F0EEF8] overflow-y-auto">
          <div className="bg-white w-[595px] min-h-[842px] shadow-sm border border-[#E4E2EE] rounded p-10">
            <p className="text-xs text-[#7A7893] text-center">
              Live preview — building next step
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}