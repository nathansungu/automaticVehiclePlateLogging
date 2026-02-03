import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from '@components/Layout'
import Dashboard from '@pages/Dashboard'
import AttendanceLogs from '@pages/AttendanceLogs'
import StaffRegistry from '@pages/StaffRegistry'
import CheckInReview from '@pages/CheckInReview'
import AllowanceReports from '@pages/AllowanceReports'
import Settings from '@pages/Settings'
import Login from '@pages/Login'
import PrivateRoute from '@components/PrivateRoute'

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(30, 41, 59, 0.9)',
            color: '#F1F5F9',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F1F5F9',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F1F5F9',
            },
          },
        }}
      />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<AttendanceLogs />} />
          <Route path="staff" element={<StaffRegistry />} />
          <Route path="review" element={<CheckInReview />} />
          <Route path="allowance" element={<AllowanceReports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App
