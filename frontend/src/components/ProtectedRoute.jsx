import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingScreen from './LoadingScreen'

/**
 * ProtectedRoute — wraps private pages (Dashboard, Bill History, etc.)
 *
 * - If still checking auth  → show loading spinner
 * - If NOT logged in        → redirect to /login
 * - If logged in            → show the page normally
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user)   return <Navigate to="/login" replace />

  return children
}
