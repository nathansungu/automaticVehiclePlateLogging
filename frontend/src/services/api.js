import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
}

// Users/Staff
export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}

// Vehicles
export const vehicleService = {
  getAll: () => api.get('/vehicles'),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
}

// Attendance
export const attendanceService = {
  getAll: (params) => api.get('/attendance', { params }),
  getByUser: (userId) => api.get(`/attendance/${userId}`),
  logCheckIn: (data) => api.post('/attendance/log', data),
  getToday: () => api.get('/attendance/today'),
}

// Gates
export const gateService = {
  getAll: () => api.get('/gates'),
  getById: (id) => api.get(`/gates/${id}`),
  create: (data) => api.post('/gates', data),
  update: (id, data) => api.put(`/gates/${id}`, data),
  delete: (id) => api.delete(`/gates/${id}`),
}

// Reports
export const reportService = {
  monthlyAttendance: (params) => api.get('/reports/monthlyattendance', { params }),
  unregisteredPlates: () => api.get('/reports/unregistered-plates'),
}

// Settings
export const settingsService = {
  getAll: () => api.get('/settings'),
  getByName: (name) => api.get(`/settings/${name}`),
  update: (name, value) => api.put(`/settings/${name}`, { value }),
  create: (data) => api.post('/settings', data),
}

// Payroll
export const payrollService = {
  getUserAllowance: (userId) => api.get(`/payroll/${userId}`),
  getMonthlyReport: () => api.get('/payroll/monthly'),
}

// Dashboard Stats
export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentCheckIns: (limit = 10) => api.get(`/dashboard/recent-checkins?limit=${limit}`),
  getDepartmentStats: () => api.get('/dashboard/departments'),
}

export default api
