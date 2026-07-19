// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const queryClient    = useQueryClient()
  const [status, setStatus] = useState('verifying')

  const reference    = searchParams.get('reference')
  const paymentType  = searchParams.get('type')       // 'single' or null (monthly)
  const resumeId     = searchParams.get('resumeId')   // only present for single unlock

  useEffect(() => {
    // Invalidate relevant caches so UI updates immediately
    queryClient.invalidateQueries({ queryKey: ['profile'] })
    if (resumeId) {
      queryClient.invalidateQueries({ queryKey: ['resume', resumeId] })
    }

    const timer = setTimeout(() => {
      setStatus('success')
    }, 2000)

    return () => clearTimeout(timer)
  }, [queryClient, resumeId])

  const isSingleUnlock = paymentType === 'single'

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E4E2EE] rounded-2xl p-10 max-w-md w-full text-center shadow-sm">

        {status === 'verifying' ? (
          <>
            <div className="w-12 h-12 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-xl font-bold text-[#1A1A22] mb-2">Confirming payment...</h1>
            <p className="text-sm text-[#7A7893]">Please wait a moment.</p>
          </>
        ) : (
          <>
            {/* Success icon */}
            <div className="w-16 h-16 bg-[#EDE8F7] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✦</span>
            </div>

            {isSingleUnlock ? (
              <>
                <h1 className="text-2xl font-bold text-[#1A1A22] tracking-tight mb-2">
                  Resume unlocked!
                </h1>
                <p className="text-sm text-[#7A7893] mb-2">
                  This resume now has full access to Pro templates and AI features — forever.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-[#1A1A22] tracking-tight mb-2">
                  You're now Pro!
                </h1>
                <p className="text-sm text-[#7A7893] mb-2">
                  Welcome to OrbitCV Pro. All features are now unlocked.
                </p>
              </>
            )}

            {reference && (
              <p className="text-xs text-[#7A7893] mb-8">
                Reference: <span className="font-mono text-[#3D2B6B]">{reference}</span>
              </p>
            )}

            {/* What's unlocked */}
            <div className="bg-[#F8F7FC] rounded-xl p-4 mb-8 text-left">
              <p className="text-xs font-bold text-[#7A7893] uppercase tracking-wider mb-3">
                Now unlocked
              </p>
              {(isSingleUnlock
                ? ['Corporate & Creative templates on this resume', 'AI summary generator', 'AI bullet point improver', 'AI skill suggestions', 'Clean PDF export']
                : ['Corporate & Creative templates', 'AI summary generator', 'AI bullet point improver', 'AI skill suggestions', 'Unlimited resumes', 'Clean PDF export']
              ).map(item => (
                <div key={item} className="flex items-center gap-2 py-1.5 border-b border-[#E4E2EE] last:border-0">
                  <span className="text-[#3D2B6B] text-xs font-bold">✓</span>
                  <span className="text-sm text-[#2C2C36]">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to={isSingleUnlock && resumeId ? `/builder?id=${resumeId}` : '/dashboard'}
              className="inline-block w-full bg-[#3D2B6B] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#2e2053] transition-colors"
            >
              {isSingleUnlock ? 'Back to my resume →' : 'Go to my dashboard →'}
            </Link>
          </>
        )}

      </div>
    </div>
  )
}