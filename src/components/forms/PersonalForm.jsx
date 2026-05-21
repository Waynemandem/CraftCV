// src/components/forms/PersonalForm.jsx
import Input from '../ui/Input'
import useResumeStore from '../../store/resumeStore'

export default function PersonalForm() {
  const { personal, updatePersonal } = useResumeStore()

  const update = (field) => (e) =>
    updatePersonal({ [field]: e.target.value })

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-[#1A1A22]">Personal Details</h2>
        <p className="text-sm text-[#7A7893] mt-0.5">Basic info shown at the top of your resume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name" placeholder="Wayne Johnson" required
          value={personal.name} onChange={update('name')}
        />
        <Input
          label="Job Title" placeholder="Frontend Developer"
          value={personal.title} onChange={update('title')}
        />
        <Input
          label="Email" type="email" placeholder="wayne@example.com" required
          value={personal.email} onChange={update('email')}
        />
        <Input
          label="Phone" placeholder="+234 800 000 0000"
          value={personal.phone} onChange={update('phone')}
        />
        <Input
          label="Location" placeholder="Lagos, Nigeria"
          value={personal.location} onChange={update('location')}
        />
        <Input
          label="LinkedIn URL" placeholder="linkedin.com/in/wayne"
          value={personal.linkedin} onChange={update('linkedin')}
        />
      </div>

      <Input
        label="Portfolio / Website" placeholder="waynedev.com"
        value={personal.portfolio} onChange={update('portfolio')}
      />
    </div>
  )
}