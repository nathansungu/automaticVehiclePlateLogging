import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ title, value, change, trend, icon: Icon, color, delay = '' }) {
  const colors = {
    primary: 'from-primary/20 to-primary/5',
    success: 'from-success/20 to-success/5',
    warning: 'from-warning/20 to-warning/5',
    danger: 'from-danger/20 to-danger/5',
  }

  return (
    <div className={`stat-card animate-scale-in ${delay}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-2xl`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
          trend === 'up' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
          {title}
        </h3>
        <div className="font-display text-4xl font-bold">
          {value.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
