// src/components/forms/ExperienceForm.jsx
import Input     from '../ui/Input'
import AIButton  from '../ui/AIButton'
import Button    from '../ui/Button'
import useResumeStore from '../../store/resumeStore'
import { useState }   from 'react'
import { askAI } from '../../lib/ai'

export default function ExperienceForm() {
  const {
    experience,
    addExperience, updateExperience, removeExperience,
    addBullet, updateBullet, removeBullet,
  } = useResumeStore()

  const [loadingBullet, setLoadingBullet] = useState(null)

    const improveBullet = async (expId, index, text) => {
       if (!text.trim()) return
        setLoadingBullet(`${expId}-${index}`)
      try {
      const result = await askAI(
         `Rewrite this resume bullet point to be more professional, specific, and impactful. Start with a strong action verb. Use quantifiable results if possible. Return only the rewritten bullet, no quotes, no labels:\n\n"${text}"`
      )
        updateBullet(expId, index, result)
       } catch (err) {
          alert('AI failed: ' + err.message)
        }
       setLoadingBullet(null)
      }

      
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A22]">Work Experience</h2>
          <p className="text-sm text-[#7A7893] mt-0.5">Add your most recent jobs first.</p>
        </div>
        <Button variant="outline" size="sm" onClick={addExperience}>
          + Add Job
        </Button>
      </div>

      {experience.length === 0 && (
        <div className="border border-dashed border-[#E4E2EE] rounded-lg p-8 text-center">
          <p className="text-sm text-[#7A7893]">No experience added yet.</p>
          <button
            onClick={addExperience}
            className="text-sm text-[#3D2B6B] font-medium mt-2 hover:underline"
          >
            + Add your first job
          </button>
        </div>
      )}

      {experience.map((exp, ei) => (
        <div key={exp.id} className="border border-[#E4E2EE] rounded-lg p-5 bg-white">

          {/* Job header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#7A7893] uppercase tracking-wider">
              Job {ei + 1}
            </span>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Company" placeholder="Google"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
            />
            <Input
              label="Job Title" placeholder="Senior Frontend Engineer"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
            />
            <Input
              label="Start Date" placeholder="Jan 2022"
              value={exp.from}
              onChange={(e) => updateExperience(exp.id, { from: e.target.value })}
            />
            <Input
              label="End Date" placeholder="Dec 2024 (or Present)"
              value={exp.to}
              onChange={(e) => updateExperience(exp.id, { to: e.target.value })}
              hint="Type 'Present' if this is your current role"
            />
          </div>

          {/* Bullet points */}
          <div>
            <label className="text-sm font-medium text-[#2C2C36] block mb-2">
              Key Responsibilities
            </label>

            {exp.bullets.map((bullet, bi) => (
              <div key={bi} className="flex gap-2 mb-2 items-start">
                <span className="text-[#7A7893] mt-2.5 text-xs">•</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => updateBullet(exp.id, bi, e.target.value)}
                  placeholder="Describe what you did and the impact..."
                  className="
                    flex-1 px-3 py-2 text-sm border border-[#E4E2EE]
                    rounded-md bg-white text-[#2C2C36]
                    placeholder:text-[#7A7893] outline-none
                    focus:ring-2 focus:ring-[#3D2B6B]/20 focus:border-[#3D2B6B]
                  "
                />
                <div className="flex gap-1 mt-1">
                  <AIButton
                    label=""
                    loading={loadingBullet === `${exp.id}-${bi}`}
                    onClick={() => improveBullet(exp.id, bi, bullet)}
                  />
                  {exp.bullets.length > 1 && (
                    <button
                      onClick={() => removeBullet(exp.id, bi)}
                      className="text-xs text-red-400 hover:text-red-600 px-1"
                    >×</button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={() => addBullet(exp.id)}
              className="text-xs text-[#3D2B6B] hover:underline mt-1 font-medium"
            >
              + Add bullet point
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}