import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import BillHistoryPage from './pages/BillHistoryPage'
import AppliancesPage from './pages/AppliancesPage'
import SlabCalculatorPage from './pages/SlabCalculatorPage'
import SavingsGoalsPage from './pages/SavingsGoalsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"           element={<LandingPage />} />
      <Route path="/login"      element={<LoginPage />} />
      <Route path="/signup"     element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* App pages (logged in) */}
      <Route path="/dashboard"       element={<DashboardPage />} />
      <Route path="/bill-history"    element={<BillHistoryPage />} />
      <Route path="/appliances"      element={<AppliancesPage />} />
      <Route path="/slab-calculator" element={<SlabCalculatorPage />} />
      <Route path="/savings-goals"   element={<SavingsGoalsPage />} />
      <Route path="/settings"        element={<SettingsPage />} />

      {/* 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*"    element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
