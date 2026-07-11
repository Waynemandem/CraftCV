// src/components/layout/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function ProtectedRoute({ children }) {
  const user = useAuthStore(s => s.user)
  const loading = useAuthStore(s => s.loading)

  // Show loading state while checking auth
  if (loading) {
    return(
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FC]">
        <div className="w-8 h-8 border-2 border-[#3D2B6B] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // If no user, redirect to login (not 404)
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // If user exists, show the component
  return children
}