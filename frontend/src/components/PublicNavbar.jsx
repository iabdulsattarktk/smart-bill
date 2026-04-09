import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import styles from './PublicNavbar.module.css'

const LINKS = [
  { to: '/',             en: 'Home',         ur: 'ہوم' },
  { to: '/how-it-works', en: 'How It Works', ur: 'کیسے کام کرتا ہے' },
  { to: '/faq',          en: 'FAQ',          ur: 'سوالات' },
  { to: '/about',        en: 'About',        ur: 'ہمارے بارے میں' },
  { to: '/contact',      en: 'Contact',      ur: 'رابطہ' },
]

export default function PublicNavbar() {
  const { lang, isUrdu, toggleLang } = useLang()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className={styles.navbar} dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <i className="fa-solid fa-bolt"></i>
          <span>Smart <span className={styles.logoGold}>Bill</span></span>
        </Link>

        {/* Nav Links */}
        <div className={`${styles.links} ${mobileOpen ? styles.linksOpen : ''}`}>
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname === l.to ? styles.active : ''}
              onClick={() => setMobileOpen(false)}
            >
              {isUrdu ? l.ur : l.en}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Language toggle */}
          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => toggleLang('en')}
            >EN</button>
            <button
              className={`${styles.langBtn} ${lang === 'ur' ? styles.langActive : ''}`}
              onClick={() => toggleLang('ur')}
            >اردو</button>
          </div>

          <Link to="/login" className={styles.loginBtn}>
            {isUrdu ? 'لاگ ان' : 'Login'}
          </Link>
          <Link to="/signup" className={styles.signupBtn}>
            <i className="fa-solid fa-bolt"></i>
            {isUrdu ? 'مفت اکاؤنٹ' : 'Sign Up Free'}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname === l.to ? styles.active : ''}
              onClick={() => setMobileOpen(false)}
            >
              {isUrdu ? l.ur : l.en}
            </Link>
          ))}
          <div className={styles.mobileLang}>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => toggleLang('en')}
            >EN</button>
            <button
              className={`${styles.langBtn} ${lang === 'ur' ? styles.langActive : ''}`}
              onClick={() => toggleLang('ur')}
            >اردو</button>
          </div>
          <Link to="/login" className={styles.mobileLogin} onClick={() => setMobileOpen(false)}>
            {isUrdu ? 'لاگ ان' : 'Login'}
          </Link>
          <Link to="/signup" className={styles.mobileSignup} onClick={() => setMobileOpen(false)}>
            <i className="fa-solid fa-bolt"></i> {isUrdu ? 'مفت اکاؤنٹ بنائیں' : 'Sign Up Free'}
          </Link>
        </div>
      )}
    </nav>
  )
}
