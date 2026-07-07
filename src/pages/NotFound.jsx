// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-black text-[#3D2B6B] mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#1A1A22] mb-2">Page Not Found</h1>
        <p className="text-[#7A7893] mb-8">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            to="/dashboard"
            className="bg-[#3D2B6B] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#2e2053] transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="border border-[#E4E2EE] text-[#2C2C36] font-semibold px-6 py-3 rounded-md hover:border-[#3D2B6B] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}