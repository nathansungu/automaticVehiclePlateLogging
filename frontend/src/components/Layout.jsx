import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useAppStore } from '@store'

export default function Layout() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="flex min-h-screen relative">
      <Sidebar />
      
      <main 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        <div className="p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
