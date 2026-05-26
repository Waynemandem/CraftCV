// src/components/forms/SummaryForm.jsx
import Textarea  from '../ui/Textarea'
import AIButton  from '../ui/AIButton'
import useResumeStore from '../../store/resumeStore'
import { useState }   from 'react'
import { askAI } from '../../lib/ai'

export default function SummaryForm() {
  const { summary, updateSummary, personal } = useResumeStore()
  const [loading, setLoading] = useState(false)

  const generateSummary = async () => {
  if (!personal.title) {
    alert('Add your job title in Personal Details first.')
    return
  }
  setLoading(true)
  try {
    const result = await askAI(
      `Write a 3-sentence professional resume summary for a ${personal.title} named ${personal.name || 'the candidate'}. Make it confident, specific, and ATS-friendly. Return only the summary text, no quotes, no labels.`
    )
    updateSummary(result)
  } catch (err) {
    alert('AI failed: ' + err.message)
  }
  setLoading(false)
}

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-[#1A1A22]">Professional Summary</h2>
        <p className="text-sm text-[#7A7893] mt-0.5">A short paragraph that appears below your name.</p>
      </div>

      <Textarea
        label="Summary"
        placeholder="professional Summary about your experiences..."
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={5}
        hint="2–4 sentences works best. Keep it specific."
      />

      <div>
        <AIButton
          onClick={generateSummary}
          loading={loading}
          label="Generate summary with AI"
        />
      </div>
    </div>
  )
}
