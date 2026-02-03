import { useState, useEffect } from 'react'
import { Car, CheckCircle, XCircle, AlertTriangle, Download, Search } from 'lucide-react'
import { dashboardService } from '@services/api'
import toast from 'react-hot-toast'
import StatsCard from '@components/dashboard/StatsCard'
import RecentCheckIns from '@components/dashboard/RecentCheckIns'
import DepartmentChart from '@components/dashboard/DepartmentChart'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState('today')

  useEffect(() => {
    fetchDashboardData()
  }, [dateFilter])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await dashboardService.getStats()
      setStats(response.data)
    } catch (error) {
      toast.error('Failed to load dashboard data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    toast.success('Exporting report...')
    // Implement export functionality
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="animate-slide-down">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold gradient-text mb-2">
              Dashboard Overview
            </h1>
            <p className="text-slate-400">
              Monitor staff attendance and vehicle check-ins in real-time
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Date Filter */}
            <div className="glass rounded-xl p-2 flex gap-1">
              {['today', 'week', 'month', 'custom'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    dateFilter === filter
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Export Button */}
            <button onClick={handleExport} className="btn btn-primary">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Check-Ins Today"
          value={stats?.totalCheckIns || 0}
          change={12}
          trend="up"
          icon={Car}
          color="primary"
          delay="animation-delay-100"
        />
        <StatsCard
          title="Staff Present"
          value={stats?.staffPresent || 0}
          change={8}
          trend="up"
          icon={CheckCircle}
          color="success"
          delay="animation-delay-200"
        />
        <StatsCard
          title="Staff Absent"
          value={stats?.staffAbsent || 0}
          change={-5}
          trend="down"
          icon={XCircle}
          color="warning"
          delay="animation-delay-300"
        />
        <StatsCard
          title="Flagged Entries"
          value={stats?.flaggedEntries || 0}
          change={1}
          trend="up"
          icon={AlertTriangle}
          color="danger"
          delay="animation-delay-400"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-ins Over Time */}
        <div className="lg:col-span-2 card">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold mb-1">
              Check-Ins Over Time
            </h3>
            <p className="text-sm text-slate-400">
              Daily check-in trends for the past week
            </p>
          </div>
          <div className="h-80 bg-black/20 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-slate-400">
            Chart Placeholder - Integrate Recharts
          </div>
        </div>

        {/* Attendance Status */}
        <div className="card">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold mb-1">
              Attendance Status
            </h3>
            <p className="text-sm text-slate-400">
              Today's attendance breakdown
            </p>
          </div>
          <div className="h-80 bg-black/20 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-slate-400 text-center px-4">
            Pie Chart Placeholder
          </div>
        </div>
      </div>

      {/* Department Attendance */}
      <DepartmentChart />

      {/* Recent Check-Ins Table */}
      <RecentCheckIns />
    </div>
  )
}
