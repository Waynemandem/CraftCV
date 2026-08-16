// src/components/forms/EducationForm.jsx
import Input  from '../ui/Input'
import Button from '../ui/Button'
import useResumeStore from '../../store/resumeStore'

export default function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A22]">Education</h2>
          <p className="text-sm text-[#7A7893] mt-0.5">Most recent first.</p>
        </div>
        <Button variant="outline" size="sm" onClick={addEducation}>+ Add</Button>
      </div>

      {education.length === 0 && (
        <div className="border border-dashed border-[#E4E2EE] rounded-lg p-8 text-center">
          <p className="text-sm text-[#7A7893]">No education added yet.</p>
          <button onClick={addEducation} className="text-sm text-[#3D2B6B] font-medium mt-2 hover:underline">
            + Add education
          </button>
        </div>
      )}

      {education.map((edu, i) => (
        <div key={edu.id} className="border border-[#E4E2EE] rounded-lg p-5 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-[#7A7893] uppercase tracking-wider">
              Entry {i + 1}
            </span>
            <button onClick={() => removeEducation(edu.id)} className="text-xs text-red-400 hover:text-red-600">
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="School / University" 
              value={edu.school}
              onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
            />
            <Input
              label="Degree" 
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
            />
            <Input
              label="Field of Study" 
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
            />
            <Input
              label="Graduation Year" 
              value={edu.year}
              onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
            />
          </div>
        </div>
      ))}
    </div>
  )
}