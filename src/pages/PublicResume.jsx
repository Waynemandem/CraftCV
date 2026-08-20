// src/pages/PublicResume.jsx
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchResumeBySlug } from '../lib/resumeService'
import MinimalTemplate   from '../components/resume/MinimalTemplate'
import CorporateTemplate from '../components/resume/CorporateTemplate'
import CreativeTemplate  from '../components/resume/CreativeTemplate'
import useResumeStore    from '../store/resumeStore'
import { useEffect } from 'react'

export default function PublicResume() {
  const { slug } = useParams()
  const { loadResume } = useResumeStore()

  const { data: resume, isLoading, error } = useQuery({
    queryKey: ['public-resume', slug],
    queryFn:  () => fetchResumeBySlug(slug),
    retry: false,
  })

  useEffect(() => {
    if (resume) {
      loadResume(resume.content, resume.template)
    }
  }, [resume])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg font-semibold text-[#1A1A22] mb-2">Resume not found</p>
          <p className="text-sm text-[#7A7893] mb-6">This link may be invalid or no longer shared.</p>
          <Link to="/" className="text-[#3D2B6B] font-semibold hover:underline">
            ← Go to OrbitCV
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0EEF8] flex flex-col items-center py-10 px-4">

      {/* Branding bar */}
      <div className="w-full md:w-[595px] mb-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight text-[#2C2C36]">
          Orbit<span className="text-[#3D2B6B]">CV</span>
        </Link>
        <Link
          to="/auth"
          className="text-xs font-semibold text-[#3D2B6B] border border-[#3D2B6B] px-3 py-1.5 rounded-md hover:bg-[#EDE8F7] transition-colors"
        >
          Build your own →
        </Link>
      </div>

      {/* Resume */}
      <div className="bg-white w-full md:w-[595px] min-h-[842px] shadow-sm border border-[#E4E2EE] rounded overflow-hidden">
        {resume.template === 'minimal'   && <div className="p-10"><MinimalTemplate /></div>}
        {resume.template === 'corporate' && <CorporateTemplate />}
        {resume.template === 'creative'  && <CreativeTemplate />}
      </div>

    </div>
  )
}