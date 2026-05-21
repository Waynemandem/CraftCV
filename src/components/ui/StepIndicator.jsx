// src/cpmponents/ui/StepIndicator.jsx
// shows progress through the 7 builder steps

const STEPS = [
  { id: 1, label: 'Personal'   },
  { id: 2, label: 'Summary'    },
  { id: 3, label: 'Experience' },
  { id: 4, label: 'Education'  },
  { id: 5, label: 'Skills'     },
  { id: 6, label: 'Projects'   },
  { id: 7, label: 'Certs'      },
]



export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">

          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div className={`
              w-7 h-7 rounded-full flex items-center justify-center
              text-xs font-semibold transition-all duration-200
              ${current === step.id
                ? 'bg-[#3D2B6B] text-white'
                : current > step.id
                  ? 'bg-[#3D2B6B]/20 text-[#3D2B6B]'
                  : 'bg-[#E4E2EE] text-[#7A7893]'}
            `}>
              {current > step.id ? '✓' : step.id}
            </div>
            <span className={`
              text-[10px] mt-1 font-medium hidden md:block
              ${current === step.id ? 'text-[#3D2B6B]' : 'text-[#7A7893]'}
            `}>
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {i < STEPS.length - 1 && (
            <div className={`
              h-px w-6 md:w-8 mb-4 mx-1 transition-all duration-200
              ${current > step.id ? 'bg-[#3D2B6B]/40' : 'bg-[#E4E2EE]'}
            `}/>
          )}

        </div>
      ))}
    </div>
  )
}