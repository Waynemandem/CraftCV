// src/components/forms/ProjectsForm.jsx
import Input          from '../ui/Input'
import Textarea       from '../ui/Textarea'
import Button         from '../ui/Button'
import useResumeStore from '../../store/resumeStore'

export default function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#1A1A22]">Projects</h2>
          <p className="text-sm text-[#7A7893] mt-0.5">Showcase your best work.</p>
        </div>
        <Button variant="outline" size="sm" onClick={addProject}>+ Add Project</Button>
      </div>

      {projects.length === 0 && (
        <div className="border border-dashed border-[#E4E2EE] rounded-lg p-8 text-center">
          <p className="text-sm text-[#7A7893]">No projects added yet.</p>
          <button onClick={addProject} className="text-sm text-[#3D2B6B] font-medium mt-2 hover:underline">
            + Add your first project
          </button>
        </div>
      )}

      {projects.map((project, i) => (
        <div key={project.id} className="border border-[#E4E2EE] rounded-lg p-5 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-[#7A7893] uppercase tracking-wider">
              Project {i + 1}
            </span>
            <button onClick={() => removeProject(project.id)} className="text-xs text-red-400 hover:text-red-600">
              Remove
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Project Name" placeholder="CoinPulse"
                value={project.name}
                onChange={(e) => updateProject(project.id, { name: e.target.value })}
              />
              <Input
                label="Tech Stack" placeholder="React, Supabase, Paystack"
                value={project.stack}
                onChange={(e) => updateProject(project.id, { stack: e.target.value })}
              />
            </div>
            <Textarea
              label="Description"
              placeholder="What did you build and what problem does it solve?"
              value={project.desc}
              onChange={(e) => updateProject(project.id, { desc: e.target.value })}
              rows={3}
            />
            <Input
              label="Project Link (optional)" placeholder="https://coinpulse.app"
              value={project.link}
              onChange={(e) => updateProject(project.id, { link: e.target.value })}
            />
          </div>
        </div>
      ))}
    </div>
  )
}