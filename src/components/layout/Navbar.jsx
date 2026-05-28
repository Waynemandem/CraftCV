// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const { user } = useAuthStore(s => s.user)

   // If logged in → go to dashboard. If not → go to landing
  const logoHref = user ? '/dashboard' : '/'


  return (
    <header className="w-full border-b border-[#E4E2EE] bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to={logoHref} className="flex items-center gap-1 no-underline">
          <span className="text-[#2C2C36] font-bold text-lg tracking-tight">Orbit</span>
          <span className="text-[#3D2B6B] font-bold text-lg tracking-tight">CV</span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Templates', 'Pricing'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-[#7A7893] hover:text-[#2C2C36] transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          {user ? (
            // Already logged in — show dashboard link instead
            <Link to="/dashboard">
              <Button size="sm">My Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>


      </div>
    </header>
  )
}