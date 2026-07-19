// src/lib/resumeService.js
import { supabase } from './supabase'
import { validateResumeContent, sanitizeResumeContent } from './validation'

/**
 * Fetch all resumes for the logged-in user
 */
export const fetchResumes = async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data || []
}

/**
 * Fetch a single resume by ID
 */
export const fetchResumeById = async (id) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

/**
 * Create a new resume
 * ✅ Validates content before saving
 * ✅ Sanitizes HTML/scripts
 * ✅ Prevents XSS attacks
 */
export const createResume = async ({ name, content, template }) => {
  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 2. Validate content
  const validation = validateResumeContent(content)
  if (!validation.valid) {
    const errorMsg = Object.values(validation.errors).join('; ')
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // 3. Sanitize content (remove HTML/scripts)
  const sanitizedContent = sanitizeResumeContent(content)

  // 4. Ensure name is safe
  const safeName = name?.trim() || 'My Resume'
  if (safeName.length > 200) {
    throw new Error('Resume name must be less than 200 characters')
  }

  // 5. Save to Supabase
  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: user.id,
      name: safeName,
      content: sanitizedContent,
      template: template || 'minimal',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

/**
 * Update an existing resume
 * ✅ Validates before updating
 * ✅ Sanitizes all input
 * ✅ Prevents data injection
 */
export const updateResume = async (id, { name, content, template }) => {
  // 1. Get current user (verify ownership)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 2. Verify user owns this resume
  const { data: existingResume } = await supabase
    .from('resumes')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!existingResume || existingResume.user_id !== user.id) {
    throw new Error('You do not own this resume')
  }

  // 3. Validate content
  const validation = validateResumeContent(content)
  if (!validation.valid) {
    const errorMsg = Object.values(validation.errors).join('; ')
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // 4. Sanitize content
  const sanitizedContent = sanitizeResumeContent(content)

  // 5. Ensure name is safe
  const safeName = name?.trim() || 'My Resume'
  if (safeName.length > 200) {
    throw new Error('Resume name must be less than 200 characters')
  }

  // 6. Update database
  const { data, error } = await supabase
    .from('resumes')
    .update({
      name: safeName,
      content: sanitizedContent,
      template: template || 'minimal',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

/**
 * Delete a resume
 * ✅ Verifies ownership before deleting
 */
export const deleteResume = async (id) => {
  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 2. Verify user owns this resume
  const { data: existingResume } = await supabase
    .from('resumes')
    .select('user_id')
    .eq('id', id)
    .single()

  if (!existingResume || existingResume.user_id !== user.id) {
    throw new Error('You do not own this resume')
  }

  // 3. Delete
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

/**
 * Duplicate a resume
 * Creates a copy with the same content but different name/ID
 */
export const duplicateResume = async (id) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Fetch the resume to duplicate
  const original = await fetchResumeById(id)

  if (original.user_id !== user.id) {
    throw new Error('You do not own this resume')
  }

  // Create copy with new name
  return createResume({
    name: `${original.name} (Copy)`,
    content: original.content,
    template: original.template,
  })
}


export const initializeSingleUnlock = async (resumeId) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const response = await fetch('/api/paystack-init-single', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, resumeId }),
  })

  const data = await response.json()

  if (!response.ok) throw new Error(data.error || 'Failed to initialize payment')

  return data.url
}