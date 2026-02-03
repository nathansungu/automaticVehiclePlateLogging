# MUT AI Vehicle Check-In System - React Frontend

Modern, responsive React frontend for the AI Vehicle Check-In System with glassmorphic design and real-time updates.

## 🎨 Design Features

- **Glassmorphism UI** - Modern glass-like interface with backdrop blur
- **Vibrant Gradients** - Purple-to-pink gradients throughout
- **Dark Theme** - Professional dark mode with atmospheric effects
- **Smooth Animations** - CSS and Framer Motion animations
- **Responsive Design** - Works perfectly on all devices
- **Custom Typography** - Syne (display) + DM Sans (body)

## 🚀 Tech Stack

- **React 18** - Latest React with hooks
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API calls
- **Recharts** - Charts and data visualization
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications
- **Framer Motion** - Advanced animations

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── dashboard/      # Dashboard-specific components
│   ├── Layout.jsx      # Main layout with sidebar
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── PrivateRoute.jsx # Auth route wrapper
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── AttendanceLogs.jsx
│   ├── StaffRegistry.jsx
│   ├── CheckInReview.jsx
│   ├── AllowanceReports.jsx
│   ├── Settings.jsx
│   └── Login.jsx
├── services/           # API services
│   └── api.js         # Axios instance & API calls
├── store/             # Zustand state management
│   └── index.js       # Global state stores
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── assets/            # Static assets
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles & Tailwind

```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn or pnpm

### Setup Steps

1. **Clone or extract the project**
   ```bash
   cd react-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Update environment variables**
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔐 Authentication

The app includes a login page with two modes:

### Demo Mode (For Development)
Click "Continue with Demo Account" to login without backend API

### API Mode (Production)
Connects to backend API at `VITE_API_URL` for actual authentication

## 🗂️ Component Overview

### Core Components

**Layout.jsx**
- Main layout wrapper
- Includes sidebar and content area
- Handles responsive sidebar toggle

**Sidebar.jsx**
- Navigation menu
- User profile section
- Active route highlighting

**PrivateRoute.jsx**
- Protects authenticated routes
- Redirects to login if not authenticated

### Page Components

**Dashboard.jsx**
- Overview statistics cards
- Recent check-ins table
- Department attendance charts
- Filtering and export functionality

**Login.jsx**
- Authentication form
- Demo login option
- Form validation

**Other Pages**
- Template pages ready for development
- Consistent styling and layout
- Placeholder content

### Dashboard Components

**StatsCard.jsx**
- Animated stat cards
- Trend indicators
- Color-coded by type

**RecentCheckIns.jsx**
- Paginated data table
- Search functionality
- Confidence badges
- Status indicators

**DepartmentChart.jsx**
- Department attendance breakdown
- Circular progress indicators
- Hover effects

## 🎯 State Management

Using Zustand for lightweight state management:

### useAuthStore
```javascript
{
  user: null,
  token: null,
  isAuthenticated: false,
  login: (userData, token) => {},
  logout: () => {},
  updateUser: (userData) => {}
}
```

### useAppStore
```javascript
{
  sidebarOpen: true,
  toggleSidebar: () => {},
  dateFilter: 'today',
  setDateFilter: (filter) => {},
  departmentFilter: 'all',
  setDepartmentFilter: (dept) => {}
}
```

### useCheckInStore
```javascript
{
  checkIns: [],
  loading: false,
  error: null,
  setCheckIns: (checkIns) => {},
  addCheckIn: (checkIn) => {}
}
```

### useStaffStore
```javascript
{
  staff: [],
  loading: false,
  error: null,
  setStaff: (staff) => {},
  addStaff: (staffMember) => {},
  updateStaff: (id, updates) => {},
  deleteStaff: (id) => {}
}
```

## 🔌 API Integration

### Service Structure

All API calls are organized in `src/services/api.js`:

```javascript
// Authentication
authService.login(credentials)
authService.logout()

// Users/Staff
userService.getAll()
userService.create(data)
userService.update(id, data)

// Attendance
attendanceService.getToday()
attendanceService.logCheckIn(data)

// And more...
```

### API Configuration

The axios instance is configured with:
- Base URL from environment
- JWT token auto-injection
- Error handling interceptors
- Auto-redirect on 401 errors

## 🎨 Styling Guide

### Custom Tailwind Classes

```css
/* Glass effect */
.glass - Glassmorphic card background

/* Buttons */
.btn - Base button styles
.btn-primary - Primary gradient button
.btn-secondary - Secondary glass button

/* Cards */
.card - Base card with glass effect
.card-hover - Card with hover animation
.stat-card - Stat card with special effects

/* Badges */
.badge - Base badge styles
.badge-success - Green badge
.badge-warning - Yellow badge
.badge-danger - Red badge
.badge-primary - Blue badge

/* Inputs */
.input - Styled input field
.select - Styled select dropdown

/* Tables */
.table-container - Table wrapper
.data-table - Styled data table

/* Navigation */
.nav-item - Sidebar navigation item
```

### Color Palette

```javascript
primary: '#6366F1'      // Indigo
secondary: '#EC4899'    // Pink
success: '#10B981'      // Green
warning: '#F59E0B'      // Amber
danger: '#EF4444'       // Red
dark: '#0F172A'         // Slate 900
```

## 🔧 Customization

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation item in `Sidebar.jsx`

Example:
```jsx
// pages/NewPage.jsx
export default function NewPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-4xl font-bold gradient-text">
        New Page
      </h1>
    </div>
  )
}

// App.jsx
<Route path="new-page" element={<NewPage />} />

// Sidebar.jsx
{ name: 'New Page', href: '/new-page', icon: IconComponent }
```

### Adding API Endpoints

Add to `src/services/api.js`:

```javascript
export const newService = {
  getAll: () => api.get('/endpoint'),
  create: (data) => api.post('/endpoint', data),
}
```

### Adding State Store

Add to `src/store/index.js`:

```javascript
export const useNewStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}))
```

## 🚀 Production Build

```bash
# Build optimized production bundle
npm run build

# Output will be in dist/ folder
# Deploy dist/ folder to your hosting provider
```

### Build Optimization

Vite automatically:
- Minifies JavaScript
- Optimizes CSS
- Tree-shakes unused code
- Code-splits for better loading
- Generates source maps

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔒 Environment Variables

Create `.env` file (never commit this):

```env
# Required
VITE_API_URL=http://localhost:5000/api

# Optional
VITE_APP_NAME=MUT Vehicle Check-In
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001
}
```

### API Connection Errors
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check CORS configuration

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. **Complete Remaining Pages**
   - Staff Registry with CRUD operations
   - Check-In Review with approval workflow
   - Allowance Reports with export
   - Settings panel

2. **Add Charts**
   - Integrate Recharts for visualizations
   - Line charts for trends
   - Pie charts for distribution
   - Bar charts for comparisons

3. **Real-time Updates**
   - WebSocket integration
   - Live check-in notifications
   - Auto-refresh dashboard

4. **Advanced Features**
   - Dark/Light theme toggle
   - Advanced filtering
   - Export to Excel/PDF
   - Print functionality

5. **Testing**
   - Unit tests with Vitest
   - Component tests
   - E2E tests with Playwright

## 📄 License

This project is proprietary software for Murang'a University.

## 👥 Support

For questions or issues:
- Email: support@mut.ac.ke
- IT Department: +254 XXX XXX XXX

---

**Built with ❤️ for Murang'a University**
