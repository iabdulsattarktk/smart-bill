import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LandingPage.module.css'

/* ── DATA ── */
const FEATURES = [
  {
    color: 'blue', icon: 'fa-brain',
    title: 'AI Bill Prediction',
    desc: 'Our AI learns from your past bills, your appliances, and their daily usage hours to predict your next bill with high accuracy.',
    tag: 'Core Feature',
  },
  {
    color: 'yellow', icon: 'fa-camera',
    title: 'Scan Your Bill',
    desc: 'Take a photo of your electricity bill. AI reads it automatically — no manual typing needed.',
    tag: 'OCR Technology',
  },
  {
    color: 'green', icon: 'fa-plug',
    title: 'Appliance Tracker',
    desc: 'Add your AC, fridge, fans, geyser. Set daily usage hours. See exactly how much each appliance costs you per month.',
    tag: 'Smart Feature',
  },
  {
    color: 'red', icon: 'fa-triangle-exclamation',
    title: 'Slab Warning',
    desc: 'Get warned before you cross into the next expensive slab. Save hundreds of rupees each month.',
    tag: 'Money Saver',
  },
  {
    color: 'yellow', icon: 'fa-gauge-high',
    title: 'Meter Number Sync',
    desc: 'Enter your consumer/reference number once — app automatically fetches your bill details from your DISCO\'s system.',
    tag: 'Auto Fetch',
  },
  {
    color: 'blue', icon: 'fa-magnifying-glass-chart',
    title: 'Overbilling Detector',
    desc: 'Compare the units on your bill vs what your appliances actually consumed. Catch overbilling by your DISCO.',
    tag: 'Protection',
  },
  {
    color: 'green', icon: 'fa-chart-line',
    title: 'Bill History & Graphs',
    desc: 'See your bill trends over months. Understand your usage patterns. Track if you\'re saving or spending more.',
    tag: 'Analytics',
  },
  {
    color: 'red', icon: 'fa-bell',
    title: 'Peak Hour Alerts',
    desc: 'Get notified at 7PM — peak hours start. Avoid running heavy appliances from 7PM–11PM and reduce your bill.',
    tag: 'Alert System',
  },
]

const DISCOS = [
  { name: 'LESCO',   city: 'Lahore',           active: true  },
  { name: 'MEPCO',   city: 'Multan',           active: false },
  { name: 'FESCO',   city: 'Faisalabad',       active: false },
  { name: 'GEPCO',   city: 'Gujranwala',       active: false },
  { name: 'IESCO',   city: 'Islamabad',        active: false },
  { name: 'PESCO',   city: 'Peshawar',         active: false },
  { name: 'HESCO',   city: 'Hyderabad',        active: false },
  { name: 'SEPCO',   city: 'Sukkur',           active: false },
  { name: 'QESCO',   city: 'Quetta',           active: false },
  { name: 'KE',      city: 'Karachi',          active: false },
  { name: 'TESCO',   city: 'Tribal Districts', active: false },
  { name: 'AJKESC',  city: 'Azad Kashmir',     active: false },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [lang, setLang]   = useState('EN')
  const [email, setEmail] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCTA = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div className={styles.page}>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
          <div className={styles.logoText}>Smart<span>Bill</span></div>
        </div>

        <div className={styles.navRight}>
          {/* Language toggle */}
          <div className={styles.langToggle}>
            {['EN', 'اردو', 'Roman'].map(l => (
              <button
                key={l}
                className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`}
                onClick={() => setLang(l)}
              >{l}</button>
            ))}
          </div>

          <button className={styles.btnLogin} onClick={() => navigate('/login')}>Login</button>
          <button className={styles.btnSignup} onClick={() => navigate('/signup')}>
            Get Started — Free
          </button>

          {/* Hamburger */}
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <button onClick={() => { navigate('/login'); setMenuOpen(false) }}>Login</button>
            <button onClick={() => { navigate('/signup'); setMenuOpen(false) }}>Get Started — Free</button>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <i className="fa-solid fa-star"></i> &nbsp;Pakistan's #1 Electricity Bill Predictor
        </div>

        <h1 className={styles.heroTitle}>
          Predict Your <span>Electricity Bill</span><br />Before It Arrives
        </h1>

        <p className={styles.heroUrdu}>اپنا بجلی کا بل پہلے سے جانیں</p>

        <p className={styles.heroDesc}>
          Enter your appliances and past bills — our AI predicts your next bill,
          warns you before high slabs, and shows exactly where your money is going.
        </p>

        <div className={styles.heroButtons}>
          <button className={styles.btnHeroPrimary} onClick={() => navigate('/signup')}>
            <i className="fa-solid fa-bolt"></i>&nbsp; Check My Bill — It's Free
          </button>
          <button className={styles.btnHeroSecondary} onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            <i className="fa-solid fa-play"></i>&nbsp; See How It Works
          </button>
        </div>

        <p className={styles.heroNote}>
          <i className="fa-solid fa-check"></i> No credit card &nbsp;&nbsp;
          <i className="fa-solid fa-check"></i> Works offline &nbsp;&nbsp;
          <i className="fa-solid fa-check"></i> All 12 DISCOs supported
        </p>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR (yellow)
      ══════════════════════════════════════ */}
      <div className={styles.statsBar}>
        {[
          { number: '12',     label: 'DISCOs Supported' },
          { number: 'PKR 0',  label: 'Cost to Use' },
          { number: '3 Taps', label: 'To See Your Bill' },
          { number: 'AI',     label: 'Powered Prediction' },
        ].map(s => (
          <div key={s.label} className={styles.statItem}>
            <div className={styles.statNumber}>{s.number}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          BILL PREVIEW — "Your Dashboard Looks Like This"
      ══════════════════════════════════════ */}
      <section className={styles.previewSection}>
        <div className={styles.sectionTag}>Live Preview</div>
        <h2 className={styles.sectionTitle}>Your Dashboard Looks Like This</h2>
        <p className={styles.sectionSubtitle}>One big number. Everything you need. No confusion.</p>

        <div className={styles.billCard}>
          {/* Decorative circle */}
          <div className={styles.billCardCircle}></div>

          <div className={styles.billCardHeader}>
            <div className={styles.discoBadge}>IESCO</div>
            <div className={styles.billMonth}>March 2026 Prediction</div>
          </div>

          <div className={styles.billAmountLabel}>Predicted Next Bill</div>
          <div className={styles.billAmount}>Rs. 6,840</div>
          <div className={styles.billUnits}>~310 units estimated</div>

          <hr className={styles.billDivider} />

          <div className={styles.billDetails}>
            <div className={styles.billDetailItem}>
              <label>Last Bill</label>
              <span>Rs. 5,960</span>
            </div>
            <div className={styles.billDetailItem}>
              <label>Units Last Month</label>
              <span>280 units</span>
            </div>
            <div className={styles.billDetailItem}>
              <label>Current Slab</label>
              <span>301–700</span>
            </div>
            <div className={styles.billDetailItem}>
              <label>Due Date</label>
              <span>Mar 26</span>
            </div>
          </div>

          <div className={styles.slabWarning}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            You are 42 units away from the next slab — save Rs. 800
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES (8 cards)
      ══════════════════════════════════════ */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionTag}>Features</div>
        <h2 className={styles.sectionTitle}>Everything You Need</h2>
        <p className={styles.sectionSubtitle}>
          Built specifically for Pakistani households. Simple. Fast. Free.
        </p>

        <div className={styles.featuresGrid}>
          {FEATURES.map(f => (
            <div key={f.title} className={`${styles.featureCard} ${styles[f.color]}`}>
              <div className={styles.featureIcon}>
                <i className={`fa-solid ${f.icon}`}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className={styles.featureTag}>{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS (3 steps)
      ══════════════════════════════════════ */}
      <section className={styles.howSection} id="how-it-works">
        <div className={styles.sectionTag}>How It Works</div>
        <h2 className={styles.sectionTitle}>3 Simple Steps</h2>
        <p className={styles.sectionSubtitle}>Get your bill prediction in under 2 minutes.</p>

        <div className={styles.steps}>
          {[
            { n: '1', title: 'Select Your DISCO',  desc: 'Choose your electricity company — LESCO, MEPCO, IESCO, KE or any other.' },
            { n: '2', title: 'Add Your Info',       desc: 'Enter past bill or scan it. Add your appliances and how long you use them daily.' },
            { n: '3', title: 'See Prediction',      desc: 'AI instantly shows your predicted next bill and tips to save money.' },
          ].map((s, i) => (
            <div key={s.n} className={styles.step}>
              <div className={styles.stepNumber}>{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              {i < 2 && <div className={styles.stepArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          ALL 12 DISCOs
      ══════════════════════════════════════ */}
      <section className={styles.discoSection}>
        <h3>
          <i className="fa-solid fa-circle-check" style={{ color: 'var(--green)' }}></i>
          &nbsp; All 12 Pakistan DISCOs Supported
        </h3>
        <div className={styles.discoGrid}>
          {DISCOS.map(d => (
            <div key={d.name} className={`${styles.discoPill} ${d.active ? styles.discoPillActive : ''}`}>
              {d.name} — {d.city}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — email input
      ══════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <h2>Start Saving on Your <span>Electricity Bill</span> Today</h2>
        <p>Free forever. No credit card. Works on any phone.</p>
        <form className={styles.ctaRow} onSubmit={handleCTA}>
          <input
            className={styles.ctaInput}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.btnCta}>
            <i className="fa-solid fa-bolt"></i>&nbsp; Create Free Account
          </button>
        </form>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className={styles.footer}>
        <p>
          © 2026 <span>SmartBill</span> — Pakistan Electricity Bill Predictor
          &nbsp;|&nbsp;
          <i className="fa-solid fa-location-dot"></i> Built for Pakistan
          &nbsp;|&nbsp;
          Free to use
          &nbsp;|&nbsp;
          <a href="mailto:smartbillpk@gmail.com">smartbillpk@gmail.com</a>
        </p>
      </footer>

    </div>
  )
}
