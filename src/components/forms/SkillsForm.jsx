// src/components/forms/SkillsForm.jsx
import { useState }   from 'react'
import Badge          from '../ui/Badge'
import AIButton       from '../ui/AIButton'
import useResumeStore from '../../store/resumeStore'

const SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'Tailwind CSS', 'Supabase', 'Git', 'REST APIs', 'SQL',
  'Figma', 'Next.js', 'MongoDB', 'Docker', 'AWS',
]

export default function SkillsForm() {
  const { skills, addSkill, removeSkill, personal } = useResumeStore()
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    addSkill(trimmed)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
  }

  const suggestSkills = async () => {
    if (!personal.title) { alert('Add your job title in Personal Details first.'); return }
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 200,
          messages: [{
            role: 'user',
            content: `List exactly 10 relevant technical and soft skills for a ${personal.title}. Return only a comma-separated list, nothing else.`
          }]
        })
      })
      const data = await res.json()
      const suggested = data.content[0].text.split(',').map(s => s.trim())
      suggested.forEach(s => addSkill(s))
    } catch { alert('AI failed. Check your API key.') }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-base font-semibold text-[#1A1A22]">Skills</h2>
        <p className="text-sm text-[#7A7893] mt-0.5">Add skills relevant to the role you're applying for.</p>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a skill and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            flex-1 px-3 py-2.5 text-sm border border-[#E4E2EE]
            rounded-md bg-white text-[#2C2C36] placeholder:text-[#7A7893]
            outline-none focus:ring-2 focus:ring-[#3D2B6B]/20 focus:border-[#3D2B6B]
          "
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-sm font-medium bg-[#3D2B6B] text-white rounded-md hover:bg-[#2e2053]"
        >
          Add
        </button>
      </div>

      {/* AI suggest */}
      <AIButton onClick={suggestSkills} loading={loading} label="Suggest skills for my role" />

      {/* Added skills */}
      {skills.length > 0 && (
        <div>
          <p className="text-xs font-medium text-[#7A7893] mb-2 uppercase tracking-wider">
            Your Skills ({skills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} onRemove={() => removeSkill(skill)}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Quick add suggestions */}
      <div>
        <p className="text-xs font-medium text-[#7A7893] mb-2 uppercase tracking-wider">
          Quick Add
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.filter(s => !skills.includes(s)).map(s => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="text-xs border border-[#E4E2EE] text-[#7A7893] px-2.5 py-1 rounded-md hover:border-[#3D2B6B] hover:text-[#3D2B6B] transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}