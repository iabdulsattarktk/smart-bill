import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Sidebar.module.css'

const MAIN_NAV = [
  { path: '/dashboard',       icon: 'fa-house',              label: 'Dashboard' },
  { path: '/bill-history',    icon: 'fa-clock-rotate-left',  label: 'Bill History' },
  { path: '/appliances',      icon: 'fa-plug',               label: 'Appliances' },
]

const TOOLS_NAV = [
  { path: '/slab-calculator', icon: 'fa-calculator',         label: 'Slab Calculator' },
  { path: '/savings-goals',   icon: 'fa-piggy-bank',         label: 'Savings Goals' },
  { path: '/settings',        icon: 'fa-gear',               label: 'Settings' },
]

export default function Sidebar({ children }) {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const displayName = user?.user_metadata?.full_name?.split(' ')[0]
    || user?.email?.split('@')[0]
    || 'User'

  const disco = user?.user_metadata?.disco || 'IESCO'
  const city  = user?.user_metadata?.city  || ''

  const renderNavItem = (item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
      onClick={() => setMobileOpen(false)}
    >
      <i className={`fa-solid ${item.icon}`}></i>
      <span>{item.label}</span>
    </Link>
  )

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar — always expanded on desktop */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
          <span className={styles.logoText}>Smart<span>Bill</span></span>
        </div>

        {/* DISCO info box */}
        <div className={styles.discoBox}>
          <div className={styles.discoDot}></div>
          <div>
            <div className={styles.discoName}>{disco}</div>
            {city && <div className={styles.discoSub}>{city}</div>}
          </div>
        </div>

        {/* Nav items */}
        <nav className={styles.sideNav}>
          <div className={styles.sectionLabel}>Main</div>
          {MAIN_NAV.map(renderNavItem)}

          <div className={styles.sectionLabel}>Tools</div>
          {TOOLS_NAV.map(renderNavItem)}
        </nav>

        {/* Bottom: user info + logout */}
        <div className={styles.sidebarBottom}>
          <div className={styles.userRow}>
            <div className={styles.userAvatar}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={styles.main}>
        {/* Mobile topbar */}
        <div className={styles.mobileTopbar}>
          <button className={styles.menuBtn} onClick={() => setMobileOpen(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
            <span className={styles.logoText}>Smart<span>Bill</span></span>
          </div>
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
