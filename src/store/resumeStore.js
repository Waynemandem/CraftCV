// src/store/resumeStore.js
// This is the brain of the entire app.
// Every form step writes here. The live preview reads from here.

import { create } from 'zustand'

const useResumeStore = create((set) => ({

  // ── RESUME DATA ──────────────────────────────────────
  personal: {
    name:      '',
    title:     '',
    email:     '',
    phone:     '',
    location:  '',
    linkedin:  '',
    portfolio: '',
  },

  summary: '',

  experience: [
    // Each job looks like this:
    // { id, company, role, from, to, current, bullets: [] }
  ],

  education: [
    // { id, school, degree, field, year }
  ],

  skills: [],
  // Array of strings e.g. ['React', 'TypeScript', 'Node.js']

  projects: [
    // { id, name, desc, stack, link }
  ],

  certs: [
    // { id, name, issuer, year }
  ],

  template: 'minimal', // 'minimal' | 'corporate' | 'creative'

  // ── UPDATERS ─────────────────────────────────────────

  // Personal — merge partial updates
  updatePersonal: (data) => set((state) => ({
    personal: { ...state.personal, ...data }
  })),

  // Summary — plain string
  updateSummary: (text) => set({ summary: text }),

  // Template switcher
  setTemplate: (name) => set({ template: name }),

  // ── EXPERIENCE ───────────────────────────────────────

  addExperience: () => set((state) => ({
    experience: [
      ...state.experience,
      {
        id:      crypto.randomUUID(),
        company: '',
        role:    '',
        from:    '',
        to:      '',
        current: false,
        bullets: [''],
      }
    ]
  })),

  updateExperience: (id, data) => set((state) => ({
    experience: state.experience.map((exp) =>
      exp.id === id ? { ...exp, ...data } : exp
    )
  })),

  removeExperience: (id) => set((state) => ({
    experience: state.experience.filter((exp) => exp.id !== id)
  })),

  // Bullet points inside an experience item
  updateBullet: (expId, index, value) => set((state) => ({
    experience: state.experience.map((exp) => {
      if (exp.id !== expId) return exp
      const bullets = [...exp.bullets]
      bullets[index] = value
      return { ...exp, bullets }
    })
  })),

  addBullet: (expId) => set((state) => ({
    experience: state.experience.map((exp) =>
      exp.id === expId
        ? { ...exp, bullets: [...exp.bullets, ''] }
        : exp
    )
  })),

  removeBullet: (expId, index) => set((state) => ({
    experience: state.experience.map((exp) => {
      if (exp.id !== expId) return exp
      const bullets = exp.bullets.filter((_, i) => i !== index)
      return { ...exp, bullets }
    })
  })),

  // ── EDUCATION ────────────────────────────────────────

  addEducation: () => set((state) => ({
    education: [
      ...state.education,
      {
        id:     crypto.randomUUID(),
        school: '',
        degree: '',
        field:  '',
        year:   '',
      }
    ]
  })),

  updateEducation: (id, data) => set((state) => ({
    education: state.education.map((edu) =>
      edu.id === id ? { ...edu, ...data } : edu
    )
  })),

  removeEducation: (id) => set((state) => ({
    education: state.education.filter((edu) => edu.id !== id)
  })),

  // ── SKILLS ───────────────────────────────────────────

  addSkill: (skill) => set((state) => {
    if (state.skills.includes(skill)) return state // no duplicates
    return { skills: [...state.skills, skill] }
  }),

  removeSkill: (skill) => set((state) => ({
    skills: state.skills.filter((s) => s !== skill)
  })),

  // ── PROJECTS ─────────────────────────────────────────

  addProject: () => set((state) => ({
    projects: [
      ...state.projects,
      {
        id:    crypto.randomUUID(),
        name:  '',
        desc:  '',
        stack: '',
        link:  '',
      }
    ]
  })),

  updateProject: (id, data) => set((state) => ({
    projects: state.projects.map((p) =>
      p.id === id ? { ...p, ...data } : p
    )
  })),

  removeProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id)
  })),

  // ── CERTIFICATIONS ───────────────────────────────────

  addCert: () => set((state) => ({
    certs: [
      ...state.certs,
      {
        id:     crypto.randomUUID(),
        name:   '',
        issuer: '',
        year:   '',
      }
    ]
  })),

  updateCert: (id, data) => set((state) => ({
    certs: state.certs.map((c) =>
      c.id === id ? { ...c, ...data } : c
    )
  })),

  removeCert: (id) => set((state) => ({
    certs: state.certs.filter((c) => c.id !== id)
  })),

  // ── RESET (used when creating a new resume) ──────────
  resetResume: () => set({
    personal:   { name: '', title: '', email: '', phone: '', location: '', linkedin: '', portfolio: '' },
    summary:    '',
    experience: [],
    education:  [],
    skills:     [],
    projects:   [],
    certs:      [],
    template:   'minimal',
  }),


loadResume: (content, template) => set({
  personal:   content.personal   || { name:'', title:'', email:'', phone:'', location:'', linkedin:'', portfolio:'' },
  summary:    content.summary    || '',
  experience: content.experience || [],
  education:  content.education  || [],
  skills:     content.skills     || [],
  projects:   content.projects   || [],
  certs:      content.certs      || [],
  template:   template           || 'minimal',
}),


}))

export default useResumeStore