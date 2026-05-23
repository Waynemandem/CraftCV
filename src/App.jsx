// src/App.jsx
import { useEffect }       from 'react'
import { Routes, Route }   from 'react-router-dom'
import Landing             from './pages/Landing'
import Auth                from './pages/Auth'
import Dashboard           from './pages/Dashboard'
import Builder             from './pages/Builder'
import ProtectedRoute      from './components/layout/ProtectedRoute'
import useAuthStore        from './store/authStore'

export default function App() {
  const init = useAuthStore(s => s.init)

  // Restore session on app load
  useEffect(() => { init() }, [])

  return (
    <Routes>
      <Route path="/"     element={<Landing />}  />
      <Route path="/auth" element={<Auth />}      />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      }/>
      <Route path="/builder" element={
        <ProtectedRoute><Builder /></ProtectedRoute>
      }/>
    </Routes>
  )
}