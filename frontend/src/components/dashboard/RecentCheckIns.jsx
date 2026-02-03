import { useState, useEffect } from 'react'
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { attendanceService } from '@services/api'
import toast from 'react-hot-toast'

export default function RecentCheckIns() {
  const [checkIns, setCheckIns] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    fetchCheckIns()
  }, [])

  const fetchCheckIns = async () => {
    try {
      setLoading(true)
      const response = await attendanceService.getToday()
      setCheckIns(response.data.checkIns || sampleData)
    } catch (error) {
      console.error(error)
      setCheckIns(sampleData)
    } finally {
      setLoading(false)
    }
  }

  const filteredCheckIns = checkIns.filter(
    (item) =>
      item.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCheckIns.length / itemsPerPage)
  const paginatedData = filteredCheckIns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getConfidenceColor = (score) => {
    if (score >= 85) return 'badge-success'
    if (score >= 65) return 'badge-warning'
    return 'badge-danger'
  }

  const getStatusBadge = (status) => {
    return status === 'confirmed' ? 'badge-success' : 'badge-danger'
  }

  return (
    <div className="table-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="font-display text-2xl font-bold">Recent Check-Ins</h3>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by staff name or plate number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-11"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Plate Number</th>
                  <th>Staff Name</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>Confidence</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td className="font-display font-bold">{item.plateNumber}</td>
                    <td>
                      <div>
                        <div className="font-semibold">{item.staffName}</div>
                        <div className="text-xs text-slate-400">{item.staffId}</div>
                      </div>
                    </td>
                    <td>{item.department}</td>
                    <td>{item.location}</td>
                    <td>{item.time}</td>
                    <td>
                      <span className={`badge ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="w-9 h-9 rounded-lg border border-white/10 bg-black/20 hover:bg-primary hover:border-primary transition-all flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-slate-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredCheckIns.length)} of {filteredCheckIns.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:border-primary transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-primary to-secondary border-transparent text-white'
                      : 'border-white/10 bg-black/20 hover:bg-primary hover:border-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-white/10 bg-black/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:border-primary transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Sample data for development
const sampleData = [
  { plateNumber: 'KDA 104E', staffName: 'John Ochieng', staffId: 'STF-1004', department: 'Administration', location: 'Main Gate', time: '09:32 AM', confidence: 88, status: 'confirmed' },
  { plateNumber: 'KCA 100A', staffName: 'Dr. James Mwangi', staffId: 'STF-1000', department: 'Academic Affairs', location: 'Main Gate', time: '08:00 AM', confidence: 86, status: 'confirmed' },
  { plateNumber: 'KCB 101B', staffName: 'Mary Wanjiku', staffId: 'STF-1001', department: 'Finance', location: 'East Gate', time: '08:10 AM', confidence: 86, status: 'confirmed' },
  { plateNumber: 'KDA 102C', staffName: 'Peter Kamau', staffId: 'STF-1002', department: 'IT Services', location: 'Admin Block', time: '08:20 AM', confidence: 94, status: 'confirmed' },
  { plateNumber: 'KDA 103D', staffName: 'Sarah Njeri', staffId: 'STF-1003', department: 'Human Resources', location: 'Main Gate', time: '08:30 AM', confidence: 64, status: 'flagged' },
]
