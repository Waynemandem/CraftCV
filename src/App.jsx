// src/App.jsx
import { useEffect }       from 'react'
import { Routes, Route }   from 'react-router-dom'
import Landing             from './pages/Landing'
import Auth                from './pages/Auth'
import Dashboard           from './pages/Dashboard'
import Builder             from './pages/Builder'
import ProtectedRoute      from './components/layout/ProtectedRoute'
import useAuthStore        from './store/authStore'
import Pricing from './pages/Pricing'
import Features from "./pages/Features"
import Templates from "./pages/Templates"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import PaymentSuccess from "./pages/PaymentSuccess"
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'
import Support from './pages/Support'
import PublicResume from './pages/PublicResume'

export default function App() {
  const init = useAuthStore(s => s.init)

  // Restore session on app load and clean up auth listener on unmount
  useEffect(() => {
    init()
    return () => 
      useAuthStore.getState().cleanup()
  }, [])

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
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/payment-success" element={<PaymentSuccess />}  />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm onBack={() => window.location.href = '/auth'} />} />
      <Route path="/support" element={<Support />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/r/:slug" element={<PublicResume />} />
    </Routes>
  )
}