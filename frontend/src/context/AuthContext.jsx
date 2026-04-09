import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Create the context
const AuthContext = createContext(null)

// Provider — wraps the whole app
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // logged-in user object (or null)
  const [loading, setLoading] = useState(true)   // true while checking auth

  useEffect(() => {
    // 1. Get current session when app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 2. Listen for login / logout events in real time
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // Cleanup listener when component unmounts
    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — use this in any component to get user info
export function useAuth() {
  return useContext(AuthContext)
}
