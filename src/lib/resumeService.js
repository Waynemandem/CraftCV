// src/lib/resumeService.js
// All Supabase database operations for resumes

import { supabase } from './supabase'

// ── Fetch all resumes for the logged-in user
export const fetchResumes = async () => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}

// ── Save a new resume
export const createResume = async ({ name, content, template }) => {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id:  user.id,
      name,
      content,
      template,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ── Update an existing resume
export const updateResume = async (id, { name, content, template }) => {
  const { data, error } = await supabase
    .from('resumes')
    .update({
      name,
      content,
      template,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// ── Delete a resume
export const deleteResume = async (id) => {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const fetchResumeById = async (id) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}