import { useNavigate } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
      <div className={styles.code}>404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <div className={styles.buttons}>
        <button className="btn-primary" onClick={() => navigate('/')}>
          <i className="fa-solid fa-house"></i> Go Home
        </button>
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
          <i className="fa-solid fa-chart-bar"></i> Dashboard
        </button>
      </div>
    </div>
  )
}
