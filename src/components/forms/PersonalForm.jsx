// src/components/forms/PersonalForm.jsx
import { useState } from 'react'
import Input from '../ui/Input'
import useResumeStore from '../../store/resumeStore'
import { validateField, sanitizeHTML } from '../../lib/validation'
import { ValidationRules } from '../../lib/validation'

export default function PersonalForm() {
  const { personal, updatePersonal } = useResumeStore()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    // Sanitize as user types (remove script tags instantly)
    const sanitized = sanitizeHTML(value)

    // Validate
    const rule = ValidationRules[name]
    if (rule) {
      const validation = validateField(name, sanitized, rule)
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, [name]: validation.error }))
      } else {
        setErrors(prev => ({ ...prev, [name]: null }))
      }
    }

    // Update store
    updatePersonal({ [name]: sanitized })
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value

    // Auto-format Nigerian phone numbers
    // 09012345678 → +2349012345678
    if (value.startsWith('0')) {
      value = '+234' + value.slice(1)
    }

    const validation = validateField('phone', value, ValidationRules.phone)
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, phone: validation.error }))
    } else {
      setErrors(prev => ({ ...prev, phone: null }))
    }

    updatePersonal({ phone: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold text-[#1A1A22]">Personal Details</h2>
        <p className="text-sm text-[#7A7893] mt-0.5">
          Basic info shown at the top of your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <Input
            label="Full Name"
            placeholder="e.g., Chioma Okafor"
            required
            value={personal.name || ''}
            onChange={handleChange}
            name="name"
            error={errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">⚠️ {errors.name}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <Input
            label="Job Title"
            placeholder="e.g., Frontend Developer"
            value={personal.title || ''}
            onChange={(e) => updatePersonal({ title: sanitizeHTML(e.target.value) })}
          />
        </div>

        {/* Email */}
        <div>
          <Input
            label="Email"
            type="email"
            placeholder="e.g., wayne@example.com"
            required
            value={personal.email || ''}
            onChange={handleChange}
            name="email"
            error={errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">⚠️ {errors.email}</p>
          )}
        </div>

        {/* Phone - Nigerian */}
        <div>
          <Input
            label="Phone (Optional - Nigerian)"
            placeholder="09012345678 or +2349012345678"
            value={personal.phone || ''}
            onChange={handlePhoneChange}
            error={errors.phone}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">⚠️ {errors.phone}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <Input
            label="Location"
            placeholder="e.g., Lagos, Nigeria"
            value={personal.location || ''}
            onChange={(e) => updatePersonal({ location: sanitizeHTML(e.target.value) })}
          />
        </div>

        {/* LinkedIn */}
        <div>
          <Input
            label="LinkedIn URL (Optional)"
            placeholder="linkedin.com/in/chioma"
            value={personal.linkedin || ''}
            onChange={(e) => updatePersonal({ linkedin: sanitizeHTML(e.target.value) })}
            error={errors.linkedin}
          />
          {errors.linkedin && (
            <p className="text-xs text-red-500 mt-1">⚠️ {errors.linkedin}</p>
          )}
        </div>
      </div>

      {/* Portfolio */}
      <div>
        <Input
          label="Portfolio / Website (Optional)"
          placeholder="https://waynedev.com"
          value={personal.portfolio || ''}
          onChange={handleChange}
          name="portfolio"
          error={errors.portfolio}
        />
        {errors.portfolio && (
          <p className="text-xs text-red-500 mt-1">⚠️ {errors.portfolio}</p>
        )}
      </div>
    </div>
  )
}