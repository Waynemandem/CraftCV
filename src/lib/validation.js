// src/lib/validation.js

/**
 * Validation & sanitization utilities for OrbitCV
 * Nigerian SaaS best practices
 */

export const ValidationRules = {
  name: {
    min: 2,
    max: 100,
    regex: /^[a-zA-Z\s\-'áéíóúàèìòùâêîôûäëïöü]+$/,
    error: 'Name must contain only letters, spaces, hyphens, and apostrophes'
  },
  
  email: {
    max: 255,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    error: 'Please enter a valid email address'
  },
  
  phone: {
    // Nigerian phone: 09012345678 or +2349012345678
    regex: /^(\+234|0)[789]\d{9}$/,
    error: 'Enter valid Nigerian phone (09012345678 or +2349012345678)'
  },
  
  summary: {
    min: 10,
    max: 1000,
    error: 'Summary must be between 10 and 1000 characters'
  },
  
  role: {
    min: 2,
    max: 100,
    regex: /^[a-zA-Z0-9\s\-()&\/,]+$/,
    error: 'Job title contains invalid characters'
  },
  
  company: {
    min: 2,
    max: 150,
    regex: /^[a-zA-Z0-9\s\-()&'.]+$/,
    error: 'Company name contains invalid characters'
  },
  
  description: {
    max: 2000,
    error: 'Description must not exceed 2000 characters'
  },
  
  url: {
    regex: /^(https?:\/\/)?([\da-z\-]+\.)+[a-z]{2,}(\/.*)?$/i,
    error: 'Please enter a valid URL'
  },
  
  skills: {
    max: 50,
    eachMax: 50,
    error: 'Each skill must be max 50 characters'
  }
}

/**
 * Sanitize HTML/script tags from string
 * Prevents XSS attacks
 */
export const sanitizeHTML = (str) => {
  if (!str || typeof str !== 'string') return ''
  
  // Remove script tags and dangerous attributes
  let sanitized = str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')  // Remove onclick, onload, etc
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/<object[^>]*>.*?<\/object>/gi, '')
  
  return sanitized
}

/**
 * Validate a single field
 */
export const validateField = (field, value, rule) => {
  if (!value && !rule.required) return { valid: true }
  
  // Trim whitespace for validation
  const trimmedValue = value.trim()
  
  if (!trimmedValue) {
    return { valid: false, error: `${field} is required` }
  }
  
  // Check length AFTER trimming
  if (rule.min && trimmedValue.length < rule.min) {
    return { valid: false, error: `${field} must be at least ${rule.min} characters` }
  }
  
  if (rule.max && trimmedValue.length > rule.max) {
    return { valid: false, error: `${field} must not exceed ${rule.max} characters` }
  }
  
  // Check regex pattern
  if (rule.regex && !rule.regex.test(trimmedValue)) {
    return { valid: false, error: rule.error }
  }
  
  return { valid: true }
}
/**
 * Validate entire resume content object
 */
export const validateResumeContent = (content) => {
  const errors = {}
  
  // Personal info
  if (content.personal) {
    const { name, email, phone, location } = content.personal
    
    if (name) {
      const nameCheck = validateField('Full name', name, ValidationRules.name)
      if (!nameCheck.valid) errors.name = nameCheck.error
    }
    
    if (email) {
      const emailCheck = validateField('Email', email, ValidationRules.email)
      if (!emailCheck.valid) errors.email = emailCheck.error
    }
    
    if (phone && phone.trim()) {
      const phoneCheck = validateField('Phone', phone, ValidationRules.phone)
      if (!phoneCheck.valid) errors.phone = phoneCheck.error
    }
    
    if (location && location.length > 100) {
      errors.location = 'Location must not exceed 100 characters'
    }
  }
  
  // Summary
  if (content.summary && content.summary.trim()) {
    const summaryCheck = validateField('Professional summary', content.summary, ValidationRules.summary)
    if (!summaryCheck.valid) errors.summary = summaryCheck.error
  }
  
  // Experience
  if (content.experience && Array.isArray(content.experience)) {
    content.experience.forEach((exp, i) => {
      if (!exp.role || exp.role.trim() === '') {
        errors[`experience_${i}_role`] = 'Job title is required'
      } else {
        const roleCheck = validateField('Role', exp.role, ValidationRules.role)
        if (!roleCheck.valid) {
          errors[`experience_${i}_role`] = roleCheck.error
        }
      }
      if (!exp.company || exp.company.trim() === '') {
        errors[`experience_${i}_company`] = 'Company name is required'
      }
      if (Array.isArray(exp.bullets)) {
        exp.bullets.forEach((bullet, bi) => {
          if (bullet && bullet.length > 2000) {
            errors[`experience_${i}_bullet_${bi}`] = 'Bullet must not exceed 2000 characters'
          }
        })
      }
    })
  }
  
  // Education
  if (content.education && Array.isArray(content.education)) {
    content.education.forEach((edu, i) => {
      if (!edu.school || edu.school.trim() === '') {
        errors[`education_${i}_school`] = 'School name is required'
      }
      if (edu.degree && edu.degree.length > 100) {
        errors[`education_${i}_degree`] = 'Degree must not exceed 100 characters'
      }
      if (edu.field && edu.field.length > 100) {
        errors[`education_${i}_field`] = 'Field of study must not exceed 100 characters'
      }
      if (edu.year && !/^\d{4}$/.test(edu.year.trim())) {
        errors[`education_${i}_year`] = 'Graduation year must be a 4-digit year'
      }
    })
  }

  // Projects
  if (content.projects && Array.isArray(content.projects)) {
    content.projects.forEach((proj, i) => {
      if (!proj.name || proj.name.trim() === '') {
        errors[`project_${i}_name`] = 'Project name is required'
      }
      if (proj.desc && proj.desc.length > 2000) {
        errors[`project_${i}_desc`] = 'Description must not exceed 2000 characters'
      }
      if (proj.stack && proj.stack.length > 200) {
        errors[`project_${i}_stack`] = 'Tech stack must not exceed 200 characters'
      }
      if (proj.link && !ValidationRules.url.regex.test(proj.link.trim())) {
        errors[`project_${i}_link`] = ValidationRules.url.error
      }
    })
  }

  // Certifications
  if (content.certs && Array.isArray(content.certs)) {
    content.certs.forEach((cert, i) => {
      if (!cert.name || cert.name.trim() === '') {
        errors[`cert_${i}_name`] = 'Certification name is required'
      }
      if (!cert.issuer || cert.issuer.trim() === '') {
        errors[`cert_${i}_issuer`] = 'Issuing organisation is required'
      }
      if (cert.year && !/^\d{4}$/.test(cert.year.trim())) {
        errors[`cert_${i}_year`] = 'Year must be a 4-digit year'
      }
    })
  }
  
  // Skills
  if (content.skills && Array.isArray(content.skills)) {
    if (content.skills.length > ValidationRules.skills.max) {
      errors.skills = `Cannot add more than ${ValidationRules.skills.max} skills`
    }
    content.skills.forEach((skill, i) => {
      if (skill.length > ValidationRules.skills.eachMax) {
        errors[`skills_${i}`] = `Skill must be max ${ValidationRules.skills.eachMax} characters`
      }
    })
  }
  
  // URLs
  if (content.personal && content.personal.portfolio) {
    const urlCheck = validateField('Portfolio URL', content.personal.portfolio, ValidationRules.url)
    if (!urlCheck.valid) errors.portfolio = urlCheck.error
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Sanitize entire resume content
 * Removes dangerous HTML/scripts before storing
 */
export const sanitizeResumeContent = (content) => {
  const sanitized = { ...content }
  
  if (sanitized.personal) {
    sanitized.personal = {
      ...sanitized.personal,
      name:     sanitizeHTML(sanitized.personal.name)?.trim(),      // ✅ trim only here
      email:    sanitizeHTML(sanitized.personal.email)?.trim()?.toLowerCase(),
      phone:    sanitizeHTML(sanitized.personal.phone)?.trim(),
      location: sanitizeHTML(sanitized.personal.location)?.trim(),
      portfolio: sanitizeHTML(sanitized.personal.portfolio)?.trim(),
    }
  }
  
  
  if (sanitized.summary) {
    sanitized.summary = sanitizeHTML(sanitized.summary)
  }
  
  if (sanitized.experience && Array.isArray(sanitized.experience)) {
    sanitized.experience = sanitized.experience.map(exp => ({
      ...exp,
      role: sanitizeHTML(exp.role),
      company: sanitizeHTML(exp.company),
      from: sanitizeHTML(exp.from),
      to: sanitizeHTML(exp.to),
      bullets: Array.isArray(exp.bullets)
        ? exp.bullets.map(bullet => sanitizeHTML(bullet))
        : exp.bullets,
    }))
  }
  
  if (sanitized.education && Array.isArray(sanitized.education)) {
    sanitized.education = sanitized.education.map(edu => ({
      ...edu,
      school: sanitizeHTML(edu.school),
      degree: sanitizeHTML(edu.degree),
      field: sanitizeHTML(edu.field),
      year: sanitizeHTML(edu.year),
    }))
  }
  
  if (sanitized.skills && Array.isArray(sanitized.skills)) {
    sanitized.skills = sanitized.skills.map(skill => sanitizeHTML(skill))
  }
  
  if (sanitized.projects && Array.isArray(sanitized.projects)) {
    sanitized.projects = sanitized.projects.map(proj => ({
      ...proj,
      name: sanitizeHTML(proj.name),
      desc: sanitizeHTML(proj.desc),
      stack: sanitizeHTML(proj.stack),
      link: sanitizeHTML(proj.link),
    }))
  }
  
  if (sanitized.certs && Array.isArray(sanitized.certs)) {
    sanitized.certs = sanitized.certs.map(cert => ({
      ...cert,
      name: sanitizeHTML(cert.name),
      issuer: sanitizeHTML(cert.issuer),
      year: sanitizeHTML(cert.year),
    }))
  }
  
  return sanitized
}
