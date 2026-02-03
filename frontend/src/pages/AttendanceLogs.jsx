export default function AttendanceLogs() {
  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold gradient-text mb-2">
          Attendance Logs
        </h1>
        <p className="text-slate-400">
          View and analyze attendance records across all periods
        </p>
      </header>

      <div className="card">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-2xl font-bold mb-2">Attendance Logs</h3>
          <p className="text-slate-400 mb-6">
            Calendar view with filtering and detailed records coming soon
          </p>
          <div className="inline-block px-6 py-3 rounded-xl bg-primary/10 text-primary font-semibold">
            Under Development
          </div>
        </div>
      </div>
    </div>
  )
}
