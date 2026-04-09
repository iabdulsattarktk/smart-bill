import styles from './LoadingScreen.module.css'

/**
 * LoadingScreen — shown while Supabase checks if user is logged in
 * Prevents the page from flashing to /login for a split second
 */
export default function LoadingScreen() {
  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <i className="fa-solid fa-bolt"></i>
        </div>
        <span className={styles.logoText}>Smart<span>Bill</span></span>
      </div>
      <div className={styles.spinner}></div>
      <p className={styles.msg}>Loading your account...</p>
    </div>
  )
}
