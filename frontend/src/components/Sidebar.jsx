import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  CheckCircle, 
  DollarSign, 
  Settings 
} from 'lucide-react'
import { useAuthStore, useAppStore } from '@store'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Attendance Logs', href: '/attendance', icon: ClipboardList },
  { name: 'Staff Registry', href: '/staff', icon: Users },
  { name: 'Check-In Review', href: '/review', icon: CheckCircle },
  { name: 'Allowance Reports', href: '/allowance', icon: DollarSign },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const { user } = useAuthStore()
  const { sidebarOpen } = useAppStore()

  if (!sidebarOpen) return null

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 glass border-r border-white/10 z-50 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <h1 className="font-display text-2xl font-bold gradient-text mb-2">
          MUT Check-In
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-wider">
          AI Vehicle System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">
              {user?.name || 'Admin User'}
            </h3>
            <p className="text-xs text-slate-400 truncate">
              {user?.department || 'HR Department'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
