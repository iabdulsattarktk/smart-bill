import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [lang, setLang] = useState('EN')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <Link to="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <i className="fa-solid fa-bolt"></i>
        </div>
        <span className={styles.logoText}>Smart<span>Bill</span></span>
      </Link>

      {/* Desktop nav links */}
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/slab-calculator" className={styles.navLink}>Slab Calculator</Link>
        <a href="#features" className={styles.navLink}>Features</a>
        <a href="#how-it-works" className={styles.navLink}>How It Works</a>
      </div>

      {/* Right side */}
      <div className={styles.navRight}>
        {/* Language toggle */}
        <div className={styles.langToggle}>
          {['EN', 'اردو'].map(l => (
            <button
              key={l}
              className={`${styles.langBtn} ${lang === l ? styles.active : ''}`}
              onClick={() => setLang(l)}
            >{l}</button>
          ))}
        </div>

        <button className={styles.btnLogin} onClick={() => navigate('/login')}>
          Login
        </button>
        <button className={styles.btnSignup} onClick={() => navigate('/signup')}>
          Get Started Free
        </button>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/slab-calculator" onClick={() => setMenuOpen(false)}>Slab Calculator</Link>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <button className={styles.btnSignup} onClick={() => { navigate('/signup'); setMenuOpen(false) }}>
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  )
}
