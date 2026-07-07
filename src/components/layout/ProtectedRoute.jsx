// src/components/layout/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function ProtectedRoute({ children }) {
  const user = useAuthStore(s => s.user)

  // If no user, redirect to login (not 404)
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // If user exists, show the component
  return children
}