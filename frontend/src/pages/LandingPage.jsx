import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from './LandingPage.module.css'

const FEATURES = [
  { icon: 'fa-brain',         color: '#1a2a6c', bg: '#E8EAF6', title: 'AI Bill Prediction',    desc: 'Predicts your next electricity bill using 3 months history + your appliances + seasonal patterns.' },
  { icon: 'fa-camera',        color: '#2E7D32', bg: '#E8F5E9', title: 'Bill Photo Scanner',     desc: 'Take a photo of your electricity bill. AI reads it automatically — no manual typing needed.' },
  { icon: 'fa-calculator',    color: '#b8860b', bg: '#FFFDE7', title: 'Slab Calculator',        desc: 'See your exact NEPRA slab breakdown. Know how much each unit is costing you.' },
  { icon: 'fa-plug',          color: '#6A1B9A', bg: '#F3E5F5', title: 'Appliance Tracker',      desc: 'Add your AC, fridge, fan, geyser. See which one is eating the most electricity.' },
  { icon: 'fa-triangle-exclamation', color: '#E53935', bg: '#FFEBEE', title: 'Mid-Month Warning', desc: 'Get alerted when you are on track for a high bill — before it is too late to do anything.' },
  { icon: 'fa-piggy-bank',    color: '#00695C', bg: '#E0F2F1', title: 'Savings Goals',         desc: 'Set a monthly electricity budget. Track daily if you are on target to save money.' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: 'fa-user-plus',       title: 'Create Free Account',    desc: 'Sign up in 30 seconds. Select your city and electricity company (DISCO).' },
  { step: '02', icon: 'fa-file-invoice',    title: 'Enter Your Bills',       desc: 'Scan your bill photo or enter manually. Add 2-3 past bills for best predictions.' },
  { step: '03', icon: 'fa-plug',            title: 'Add Your Appliances',    desc: 'Tell us your AC, fridge, fan details. Inverter or non-inverter — it matters.' },
  { step: '04', icon: 'fa-brain',           title: 'Get AI Prediction',      desc: 'See your predicted next bill with confidence level. Plan and save before the bill arrives.' },
]

const DISCOS = ['LESCO', 'MEPCO', 'FESCO', 'GEPCO', 'IESCO', 'PESCO', 'HESCO', 'SEPCO', 'QESCO', 'KE', 'TESCO', 'AJKESC']

const STATS = [
  { value: '12',    label: 'DISCOs Supported',    icon: 'fa-building' },
  { value: '85%+',  label: 'Prediction Accuracy',  icon: 'fa-bullseye' },
  { value: '100%',  label: 'Free to Use',          icon: 'fa-shield-halved' },
  { value: '3G',    label: 'Works on Slow Internet', icon: 'fa-wifi' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <i className="fa-solid fa-bolt"></i>
            Pakistan's First AI Electricity Bill Predictor
          </div>
          <h1 className={styles.heroTitle}>
            Know Your Bill<br />
            <span>Before It Arrives</span>
          </h1>
          <p className={styles.heroUrdu}>بجلی کا بل آنے سے پہلے جانیں</p>
          <p className={styles.heroDesc}>
            Smart Bill uses AI to predict your next electricity bill using your past bills,
            appliances, and seasonal patterns. Never be shocked by your bijli bill again.
          </p>
          <div className={styles.heroButtons}>
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              <i className="fa-solid fa-rocket"></i>
              Start Free — No Credit Card
            </button>
            <button className="btn-white" onClick={() => navigate('/slab-calculator')}>
              <i className="fa-solid fa-calculator"></i>
              Try Slab Calculator
            </button>
          </div>
          <p className={styles.heroNote}>
            <i className="fa-solid fa-check"></i> Free forever &nbsp;
            <i className="fa-solid fa-check"></i> No ads &nbsp;
            <i className="fa-solid fa-check"></i> Works offline
          </p>
        </div>

        {/* Hero bill card */}
        <div className={styles.heroCard}>
          <div className={styles.billCard}>
            <div className={styles.billCardHeader}>
              <div>
                <div className={styles.billCardLabel}>Next Month Prediction</div>
                <div className={styles.billCardDisco}>IESCO — Islamabad</div>
              </div>
              <span className="badge badge-green">
                <i className="fa-solid fa-circle-check"></i> HIGH Confidence
              </span>
            </div>
            <div className={styles.billAmount}>Rs. 5,423</div>
            <div className={styles.billUnits}>Estimated 374 units</div>
            <div className={styles.billDivider}></div>
            <div className={styles.billBreakdown}>
              <div className={styles.billRow}>
                <span><i className="fa-solid fa-clock-rotate-left"></i> Based on history</span>
                <span>60%</span>
              </div>
              <div className={styles.billRow}>
                <span><i className="fa-solid fa-plug"></i> Appliance usage</span>
                <span>40%</span>
              </div>
              <div className={styles.billRow}>
                <span><i className="fa-solid fa-sun"></i> Summer seasonal +</span>
                <span>+15%</span>
              </div>
            </div>
            <div className={styles.billTip}>
              <i className="fa-solid fa-lightbulb"></i>
              Tip: Reduce AC by 1 hour/day → Save ~Rs. 800
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsSection}>
        {STATS.map(s => (
          <div key={s.label} className={styles.statCard}>
            <i className={`fa-solid ${s.icon}`}></i>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Features</div>
          <h2>Everything You Need to<br /><span>Control Your Electricity Bill</span></h2>
          <p>Smart Bill gives Pakistani households the tools that big companies already have — for free.</p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon} style={{ background: f.bg, color: f.color }}>
                <i className={`fa-solid ${f.icon}`}></i>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howSection} id="how-it-works">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>How It Works</div>
          <h2>Start Predicting Your Bill<br /><span>in 4 Simple Steps</span></h2>
        </div>
        <div className={styles.stepsGrid}>
          {HOW_IT_WORKS.map((s, i) => (
            <div key={s.step} className={styles.stepCard}>
              <div className={styles.stepNum}>{s.step}</div>
              <div className={styles.stepIcon}>
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < HOW_IT_WORKS.length - 1 && <div className={styles.stepArrow}><i className="fa-solid fa-arrow-right"></i></div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCOs ── */}
      <section className={styles.discosSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>Coverage</div>
          <h2>Works for <span>All 12 Pakistani DISCOs</span></h2>
          <p>Every electricity company in Pakistan. One app for all.</p>
        </div>
        <div className={styles.discosGrid}>
          {DISCOS.map(d => (
            <div key={d} className={styles.discoChip}>
              <i className="fa-solid fa-bolt"></i>
              {d}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER STORY ── */}
      <section className={styles.storySection}>
        <div className={styles.storyCard}>
          <div className={styles.storyIcon}>
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className={styles.storySectionBadge}>Why Smart Bill Was Built</div>
          <h2>A Rs. 35,000 Bill Changed Everything</h2>
          <p>
            One summer, my family received an electricity bill of over <strong>Rs. 35,000</strong> —
            more than half my father's monthly salary. We had no warning. No way to predict it.
            No way to prepare. We just had to pay and struggle.
          </p>
          <p>
            That moment is why I built Smart Bill — so no Pakistani family ever goes through
            that shock again. You deserve to know your bill before it arrives.
          </p>
          <div className={styles.founderInfo}>
            <div className={styles.founderAvatar}>AS</div>
            <div>
              <div className={styles.founderName}>Abdul Sattar</div>
              <div className={styles.founderTitle}>Founder — BSIT Student, AIR University Islamabad</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <h2>Ready to Take Control of Your Electricity Bill?</h2>
        <p>Join thousands of Pakistani families predicting their bill with AI. Free, forever.</p>
        <button className="btn-primary" onClick={() => navigate('/signup')}>
          <i className="fa-solid fa-rocket"></i>
          Create Free Account
        </button>
        <p className={styles.ctaNote}>No credit card · No ads · Works on 3G</p>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}><i className="fa-solid fa-bolt"></i></div>
              <span>Smart<span>Bill</span></span>
            </div>
            <p>Pakistan's first AI electricity bill predictor. Built for every Pakistani household.</p>
          </div>
          <div className={styles.footerLinks}>
            <div>
              <h4>App</h4>
              <a onClick={() => navigate('/dashboard')}>Dashboard</a>
              <a onClick={() => navigate('/slab-calculator')}>Slab Calculator</a>
              <a onClick={() => navigate('/bill-history')}>Bill History</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="mailto:smartbillpk@gmail.com">Contact Us</a>
              <a>About Us</a>
              <a>Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2025 Smart Bill. Built with ❤️ in Islamabad, Pakistan</p>
          <p>Contact: smartbillpk@gmail.com</p>
        </div>
      </footer>
    </div>
  )
}
