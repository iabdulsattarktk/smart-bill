import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingScreen from './LoadingScreen'

/**
 * PublicRoute — wraps public-only pages (Login, Signup)
 *
 * - If still checking auth  → show loading spinner
 * - If already logged in    → redirect to /dashboard (no need to login again)
 * - If NOT logged in        → show the page normally
 */
export default function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (user)    return <Navigate to="/dashboard" replace />

  return children
}
