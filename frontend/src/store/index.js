import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: (userData, token) => {
    localStorage.setItem('token', token)
    set({ user: userData, token, isAuthenticated: true })
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },
  
  updateUser: (userData) => set({ user: userData }),
}))

export const useAppStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  dateFilter: 'today',
  setDateFilter: (filter) => set({ dateFilter: filter }),
  
  departmentFilter: 'all',
  setDepartmentFilter: (dept) => set({ departmentFilter: dept }),
}))

export const useCheckInStore = create((set) => ({
  checkIns: [],
  loading: false,
  error: null,
  
  setCheckIns: (checkIns) => set({ checkIns }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addCheckIn: (checkIn) => set((state) => ({
    checkIns: [checkIn, ...state.checkIns]
  })),
}))

export const useStaffStore = create((set) => ({
  staff: [],
  loading: false,
  error: null,
  
  setStaff: (staff) => set({ staff }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  addStaff: (staffMember) => set((state) => ({
    staff: [...state.staff, staffMember]
  })),
  
  updateStaff: (id, updates) => set((state) => ({
    staff: state.staff.map(s => s.id === id ? { ...s, ...updates } : s)
  })),
  
  deleteStaff: (id) => set((state) => ({
    staff: state.staff.filter(s => s.id !== id)
  })),
}))
