import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { path: '/dashboard',       icon: 'fa-house',          label: 'Dashboard' },
  { path: '/bill-history',    icon: 'fa-clock-rotate-left', label: 'Bill History' },
  { path: '/appliances',      icon: 'fa-plug',           label: 'Appliances' },
  { path: '/slab-calculator', icon: 'fa-calculator',     label: 'Slab Calculator' },
  { path: '/savings-goals',   icon: 'fa-piggy-bank',     label: 'Savings Goals' },
  { path: '/settings',        icon: 'fa-gear',           label: 'Settings' },
]

export default function Sidebar({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={styles.layout}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
          {!collapsed && <span className={styles.logoText}>Smart<span>Bill</span></span>}
        </div>

        {/* Collapse button (desktop) */}
        <button className={styles.collapseBtn} onClick={() => setCollapsed(!collapsed)}>
          <i className={`fa-solid ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>

        {/* Nav items */}
        <nav className={styles.sideNav}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : ''}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom: logout */}
        <div className={styles.sidebarBottom}>
          <button className={styles.logoutBtn} onClick={() => navigate('/')}>
            <i className="fa-solid fa-right-from-bracket"></i>
            {!collapsed && <span>Logout</span>}
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
