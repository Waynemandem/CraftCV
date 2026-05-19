import { Routes, Route } from 'react-router-dom'
import Landing   from './pages/Landing.jsx'
import Auth      from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Builder   from './pages/Builder.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing />}   />
      <Route path="/auth"      element={<Auth />}      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder"   element={<Builder />}   />
    </Routes>
  )
}