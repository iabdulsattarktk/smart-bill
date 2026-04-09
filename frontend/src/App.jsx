import { Routes, Route } from 'react-router-dom'

// Route guards
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute    from './components/PublicRoute'

// Public pages (no login needed)
import LandingPage    from './pages/LandingPage'
import LoginPage      from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import NotFoundPage   from './pages/NotFoundPage'

// App pages (login required)
import DashboardPage      from './pages/DashboardPage'
import BillHistoryPage    from './pages/BillHistoryPage'
import AppliancesPage     from './pages/AppliancesPage'
import SlabCalculatorPage from './pages/SlabCalculatorPage'
import SavingsGoalsPage   from './pages/SavingsGoalsPage'
import SettingsPage       from './pages/SettingsPage'

function App() {
  return (
    <Routes>

      {/* ── PUBLIC PAGES — no login needed ── */}
      <Route path="/" element={<LandingPage />} />

      {/* Login & Signup — redirect to dashboard if already logged in */}
      <Route path="/login"  element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><LoginPage /></PublicRoute>} />

      {/* Onboarding — protected (must be logged in to set up account) */}
      <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />

      {/* ── APP PAGES — login required ── */}
      <Route path="/dashboard"       element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/bill-history"    element={<ProtectedRoute><BillHistoryPage /></ProtectedRoute>} />
      <Route path="/appliances"      element={<ProtectedRoute><AppliancesPage /></ProtectedRoute>} />
      <Route path="/slab-calculator" element={<ProtectedRoute><SlabCalculatorPage /></ProtectedRoute>} />
      <Route path="/savings-goals"   element={<ProtectedRoute><SavingsGoalsPage /></ProtectedRoute>} />
      <Route path="/settings"        element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* ── 404 ── */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*"    element={<NotFoundPage />} />

    </Routes>
  )
}

export default App
