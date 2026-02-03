export default function DepartmentChart() {
  const departments = [
    { name: 'Administration', present: 8, total: 12, percentage: 67 },
    { name: 'Academic Affairs', present: 15, total: 18, percentage: 83 },
    { name: 'Finance', present: 6, total: 10, percentage: 60 },
    { name: 'IT Services', present: 10, total: 14, percentage: 71 },
    { name: 'Human Resources', present: 5, total: 8, percentage: 63 },
  ]

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold mb-1">
          Department Attendance
        </h3>
        <p className="text-sm text-slate-400">
          Attendance breakdown by department
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept, index) => (
          <div key={index} className="glass rounded-xl p-4 flex justify-between items-center hover:border-primary transition-all">
            <div>
              <h4 className="font-semibold mb-1">{dept.name}</h4>
              <p className="text-sm text-slate-400">
                {dept.present} of {dept.total} present
              </p>
            </div>

            <div className="relative w-20 h-20">
              {/* SVG Progress Circle */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${dept.percentage * 2.26} 226.19`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                {dept.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
