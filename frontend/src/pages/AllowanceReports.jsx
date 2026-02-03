export default function AllowanceReports() {
  const pageInfo = {
    StaffRegistry: { icon: '👥', title: 'Staff Registry', desc: 'Manage staff members and their registered vehicles' },
    CheckInReview: { icon: '✓', title: 'Check-In Review', desc: 'Review and approve flagged check-in entries' },
    AllowanceReports: { icon: '💰', title: 'Allowance Reports', desc: 'Generate payroll reports based on attendance' },
    Settings: { icon: '⚙️', title: 'Settings', desc: 'Configure system settings and preferences' }
  }['AllowanceReports']

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold gradient-text mb-2">
          {pageInfo.title}
        </h1>
        <p className="text-slate-400">{pageInfo.desc}</p>
      </header>

      <div className="card">
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-float">{pageInfo.icon}</div>
          <h3 className="text-2xl font-bold mb-2">{pageInfo.title}</h3>
          <p className="text-slate-400 mb-6">{pageInfo.desc}</p>
          <div className="inline-block px-6 py-3 rounded-xl bg-primary/10 text-primary font-semibold">
            Under Development
          </div>
        </div>
      </div>
    </div>
  )
}
