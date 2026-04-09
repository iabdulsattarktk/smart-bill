import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import styles from './LoginPage.module.css'

const DISCOS = ['LESCO','MEPCO','FESCO','GEPCO','IESCO','PESCO','HESCO','SEPCO','QESCO','KE','TESCO','AJKESC']

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignup = location.pathname === '/signup'

  const [mode, setMode] = useState(isSignup ? 'signup' : 'login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Form fields
  const [form, setForm] = useState({
    name: '', email: '', password: '', disco: 'IESCO', city: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })
      if (error) throw error
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (!form.email.trim()) { setError('Please enter your email.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
            disco: form.disco,
            city: form.city,
          }
        }
      })
      if (error) throw error
      setSuccess('Account created! Please check your email to confirm, then login.')
      setMode('login')
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      {/* Left panel */}
      <div className={styles.leftPanel}>
        {/* Logo */}
        <div className={styles.leftLogo}>
          <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
          <span className={styles.logoText}>Smart<span>Bill</span></span>
        </div>

        {/* Main content */}
        <div className={styles.leftMain}>
          <div className={styles.leftBadge}>
            <i className="fa-solid fa-brain"></i>
            AI-Powered Prediction
          </div>
          <h1>Know Your Bill<br /><span>Before It Arrives</span></h1>
          <p className={styles.leftUrdu}>بجلی کا بل آنے سے پہلے جانیں</p>
          <p className={styles.leftDesc}>
            Smart Bill predicts your next electricity bill using AI — before the bill even arrives.
            Free for every Pakistani household.
          </p>

          {/* Feature list */}
          <div className={styles.featureList}>
            {[
              { icon: 'fa-brain',    color: 'y', title: 'AI Bill Prediction',   sub: 'Up to 92% accurate' },
              { icon: 'fa-calculator', color: 'g', title: 'Slab Calculator',   sub: 'Full NEPRA breakdown' },
              { icon: 'fa-plug',     color: 'b', title: 'Appliance Tracker',    sub: 'Know what costs what' },
              { icon: 'fa-piggy-bank', color: 'y', title: 'Savings Goals',      sub: 'Control your spending' },
            ].map(f => (
              <div key={f.title} className={styles.featureRow}>
                <div className={`${styles.featureDot} ${styles[f.color]}`}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureSub}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className={styles.testimonial}>
          <p className={styles.testText}>
            "Smart Bill warned me in mid-month that I was heading for a high bill.
            I reduced my AC usage and saved Rs. 2,100 that month."
          </p>
          <div className={styles.testAuthor}>
            <div className={styles.testAvatar}>AK</div>
            <div>
              <div className={styles.testName}>Ahmad Khan</div>
              <div className={styles.testLoc}>LESCO — Lahore</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className={styles.rightPanel}>
        {/* Back to home */}
        <Link to="/" className={styles.backLink}>
          <i className="fa-solid fa-arrow-left"></i> Back to home
        </Link>

        <div className={styles.formCard}>
          {/* Tab switcher */}
          <div className={styles.tabSwitch}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.activeTab : ''}`}
              onClick={() => { setMode('login'); setError(''); setSuccess('') }}
            >Login</button>
            <button
              className={`${styles.tab} ${mode === 'signup' ? styles.activeTab : ''}`}
              onClick={() => { setMode('signup'); setError(''); setSuccess('') }}
            >Create Account</button>
          </div>

          {/* Title */}
          <h2 className={styles.formTitle}>
            {mode === 'login' ? 'Welcome Back!' : 'Start Free Today'}
          </h2>
          <p className={styles.formSubtitle}>
            {mode === 'login'
              ? 'Login to see your predicted bill and savings.'
              : 'Join thousands of Pakistanis predicting their bill with AI.'}
          </p>

          {/* Error / Success */}
          {error && (
            <div className={styles.alertError}>
              <i className="fa-solid fa-circle-xmark"></i> {error}
            </div>
          )}
          {success && (
            <div className={styles.alertSuccess}>
              <i className="fa-solid fa-circle-check"></i> {success}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className={styles.form}>
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="yourname@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className={styles.passwordWrap}>
                  <i className="fa-solid fa-lock" style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'var(--gray)',zIndex:1}}></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{paddingLeft:42,paddingRight:42,width:'100%',padding:'12px 42px',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',fontSize:15,fontFamily:'inherit'}}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Logging in...</> : <><i className="fa-solid fa-right-to-bracket"></i> Login</>}
              </button>

              <p className={styles.switchText}>
                Don't have an account?{' '}
                <span onClick={() => { setMode('signup'); setError('') }}>Create one free</span>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className={styles.form}>
              <div className="input-group">
                <label>Full Name</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="yourname@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className={styles.passwordWrap}>
                  <i className="fa-solid fa-lock" style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'var(--gray)',zIndex:1}}></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{paddingLeft:42,paddingRight:42,width:'100%',padding:'12px 42px',border:'1.5px solid var(--border)',borderRadius:'var(--radius-sm)',fontSize:15,fontFamily:'inherit'}}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="input-group">
                  <label>Your DISCO</label>
                  <select name="disco" value={form.disco} onChange={handleChange}>
                    {DISCOS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Islamabad"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Creating Account...</> : <><i className="fa-solid fa-rocket"></i> Create Free Account</>}
              </button>

              <p className={styles.termsText}>
                By signing up you agree to our Terms of Service and Privacy Policy.
              </p>

              <p className={styles.switchText}>
                Already have an account?{' '}
                <span onClick={() => { setMode('login'); setError('') }}>Login</span>
              </p>
            </form>
          )}

          {/* Free badge */}
          <div className={styles.freeBadge}>
            <i className="fa-solid fa-shield-halved"></i>
            100% Free · No credit card · No hidden charges
          </div>
        </div>
      </div>
    </div>
  )
}
