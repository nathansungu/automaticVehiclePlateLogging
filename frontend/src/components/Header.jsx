import { Bell, Menu, LogOut } from 'lucide-react'
import { useAuthStore, useAppStore } from '@store'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { user, logout } = useAuthStore()
  const { toggleSidebar } = useAppStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="glass border-b border-white/10 px-8 py-4 mb-8 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-10 h-10 rounded-lg glass-hover flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-lg glass-hover flex items-center justify-center relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-hover transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
