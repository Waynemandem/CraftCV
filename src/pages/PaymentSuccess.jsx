// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const queryClient    = useQueryClient()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('Please wait a moment.')

  const reference    = searchParams.get('reference')
  const paymentType  = searchParams.get('type')       // 'single' or null (monthly)
  const resumeId     = searchParams.get('resumeId')   // only present for single unlock

  useEffect(() => {
    let cancelled = false

    const verifyPayment = async () => {
      if (!reference) {
        setStatus('error')
        setMessage('Missing payment reference. Please contact support if you were charged.')
        return
      }

      try {
        const response = await fetch(`/api/verify-payment?reference=${encodeURIComponent(reference)}`)
        const data = await response.json()

        if (cancelled) return

        if (!response.ok) {
          setStatus('error')
          setMessage(data.error || 'We could not verify your payment right now. Please contact support if you were charged.')
          return
        }

        if (data.status === 'success') {
          setStatus('success')
          setMessage('Your payment has been confirmed.')
          queryClient.invalidateQueries({ queryKey: ['profile'] })
          if (resumeId) {
            queryClient.invalidateQueries({ queryKey: ['resume', resumeId] })
          }
          return
        }

        if (data.status === 'pending' || data.status === 'ongoing' || data.status === 'processing') {
          setStatus('pending')
          setMessage('Your payment is still being confirmed. Please refresh this page in a moment.')
          return
        }

        setStatus('failed')
        setMessage(data.gatewayResponse || 'Payment was not completed successfully.')
      } catch (err) {
        if (cancelled) return
        setStatus('error')
        setMessage('We could not verify your payment right now. Please contact support if you were charged.')
      }
    }

    verifyPayment()

    return () => {
      cancelled = true
    }
  }, [queryClient, reference, resumeId])

  const isSingleUnlock = paymentType === 'single'
  const ctaHref = isSingleUnlock && resumeId ? `/builder?id=${resumeId}` : '/dashboard'
  const ctaLabel = isSingleUnlock ? 'Back to my resume →' : 'Go to my dashboard →'

  const statusContent = {
    verifying: {
      title: 'Confirming payment...',
      body: message,
    },
    pending: {
      title: 'Payment pending',
      body: message,
    },
    failed: {
      title: 'Payment not completed',
      body: message,
    },
    error: {
      title: 'Could not verify payment',
      body: message,
    },
  }

  const currentStatus = statusContent[status]

  if (status !== 'success') {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
        <div className="bg-white border border-[#E4E2EE] rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
          {status === 'verifying' ? (
            <div className="w-12 h-12 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}`}>
              <span className={`text-2xl ${status === 'pending' ? 'text-yellow-700' : 'text-red-600'}`}>
                {status === 'pending' ? '…' : '!'}
              </span>
            </div>
          )}

          <h1 className="text-xl font-bold text-[#1A1A22] mb-2">{currentStatus.title}</h1>
          <p className="text-sm text-[#7A7893] mb-6">{currentStatus.body}</p>

          {reference && (
            <p className="text-xs text-[#7A7893] mb-6">
              Reference: <span className="font-mono text-[#3D2B6B]">{reference}</span>
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-block w-full bg-[#3D2B6B] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#2e2053] transition-colors"
            >
              Retry verification
            </button>
            <Link
              to={ctaHref}
              className="inline-block w-full border border-[#E4E2EE] text-[#2C2C36] font-semibold text-sm px-6 py-3 rounded-md hover:border-[#3D2B6B] hover:text-[#3D2B6B] transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E4E2EE] rounded-2xl p-10 max-w-md w-full text-center shadow-sm">

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
          to={ctaHref}
          className="inline-block w-full bg-[#3D2B6B] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#2e2053] transition-colors"
        >
          {ctaLabel}
        </Link>


      </div>
    </div>
  )
}