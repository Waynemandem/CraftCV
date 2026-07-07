// src/components/forms/PersonalForm.jsx
import { useState } from 'react'
import Input from '../ui/Input'
import useResumeStore from '../../store/resumeStore'
import { validateField, sanitizeHTML } from '../../lib/validation'
import { ValidationRules } from '../../lib/validation'

export default function PersonalForm() {
  const { personal, updatePersonal } = useResumeStore()
  const [errors, setErrors] = useState({})

  // Sanitize + update (NO validation on keystroke)
  const handleChange = (e) => {
    const { name, value } = e.target
    const sanitized = sanitizeHTML(value)
    updatePersonal({ [name]: sanitized })
  }

  // Validate ONLY when user leaves the field (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target
    const rule = ValidationRules[name]
    
    if (rule) {
      const validation = validateField(name, value, rule)
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, [name]: validation.error }))
      } else {
        setErrors(prev => ({ ...prev, [name]: null }))
      }
    }
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value

    // Auto-format Nigerian phone numbers
    if (value.startsWith('0')) {
      value = '+234' + value.slice(1)
    }

    updatePersonal({ phone: value })
  }

  const handlePhoneBlur = (e) => {
    const value = e.target.value
    const validation = validateField('phone', value, ValidationRules.phone)
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, phone: validation.error }))
    } else {
      setErrors(prev => ({ ...prev, phone: null }))
    }
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
            placeholder=""
            required
            value={personal.name || ''}
            onChange={handleChange}
            onBlur={handleBlur}
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
            placeholder=""
            value={personal.title || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            name="title"
          />
        </div>

        {/* Email */}
        <div>
          <Input
            label="Email"
            type="email"
            placeholder=""
            required
            value={personal.email || ''}
            onChange={handleChange}
            onBlur={handleBlur}
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
            placeholder="090 or +234"
            value={personal.phone || ''}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
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
            placeholder=""
            value={personal.location || ''}
            onChange={handleChange}
          />
        </div>

        {/* LinkedIn */}
        <div>
          <Input
            label="LinkedIn URL (Optional)"
            placeholder=""
            value={personal.linkedin || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            name="linkedin"
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
          placeholder=""
          value={personal.portfolio || ''}
          onChange={handleChange}
          onBlur={handleBlur}
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