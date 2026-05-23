// src/components/layout/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()

  // Still checking session — show nothing yet
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#7A7893]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/auth" replace />

  return children
}