import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LandingPage.module.css'

/* ══════════════════════════════════════
   CONTENT — English & Urdu translations
══════════════════════════════════════ */
const CONTENT = {
  EN: {
    badge:       "Pakistan's #1 Electricity Bill Predictor",
    heroTitle1:  'Predict Your',
    heroSpan:    'Electricity Bill',
    heroTitle2:  'Before It Arrives',
    heroUrdu:    'اپنا بجلی کا بل پہلے سے جانیں',
    heroDesc:    "Enter your appliances and past bills — our AI predicts your next bill, warns you before high slabs, and shows exactly where your money is going.",
    btnPrimary:  "Check My Bill — It's Free",
    btnSecondary:'See How It Works',
    heroNote:    ['No credit card', 'Works offline', 'All 12 DISCOs supported'],
    statsBar: [
      { number: '12',    label: 'DISCOs Supported' },
      { number: 'PKR 0', label: 'Cost to Use' },
      { number: '3 Taps',label: 'To See Your Bill' },
      { number: 'AI',    label: 'Powered Prediction' },
    ],
    previewTag:      'Live Preview',
    previewTitle:    'Your Dashboard Looks Like This',
    previewSubtitle: 'One big number. Everything you need. No confusion.',
    billLabel:       'Predicted Next Bill',
    billMonth:       'March 2026 Prediction',
    slabWarning:     'You are 42 units away from the next slab — save Rs. 800',
    featuresTag:     'Features',
    featuresTitle:   'Everything You Need',
    featuresSub:     'Built specifically for Pakistani households. Simple. Fast. Free.',
    howTag:          'How It Works',
    howTitle:        '3 Simple Steps',
    howSub:          'Get your bill prediction in under 2 minutes.',
    steps: [
      { title: 'Select Your DISCO',  desc: 'Choose your electricity company — LESCO, MEPCO, IESCO, KE or any other.' },
      { title: 'Add Your Info',      desc: 'Enter past bill or scan it. Add your appliances and how long you use them daily.' },
      { title: 'See Prediction',     desc: 'AI instantly shows your predicted next bill and tips to save money.' },
    ],
    discoTitle:  'All 12 Pakistan DISCOs Supported',
    ctaTitle1:   'Start Saving on Your',
    ctaSpan:     'Electricity Bill',
    ctaTitle2:   'Today',
    ctaDesc:     'Free forever. No credit card. Works on any phone.',
    ctaPlaceholder: 'Enter your email address',
    ctaBtn:      'Create Free Account',
    footerText:  'Pakistan Electricity Bill Predictor',
    footerBuilt: 'Built for Pakistan',
    footerFree:  'Free to use',
  },
  UR: {
    badge:       'پاکستان کا نمبر ۱ بجلی بل پریڈیکٹر',
    heroTitle1:  'اپنا',
    heroSpan:    'بجلی بل',
    heroTitle2:  'آنے سے پہلے جانیں',
    heroUrdu:    '',
    heroDesc:    'اپنے آلات اور پچھلے بل درج کریں — ہمارا AI آپ کا اگلا بل پیش گوئی کرتا ہے، اگلے سلیب کی وارننگ دیتا ہے، اور بتاتا ہے کہ آپ کا پیسہ کہاں جا رہا ہے۔',
    btnPrimary:  'میرا بل چیک کریں — مفت',
    btnSecondary:'دیکھیں کیسے کام کرتا ہے',
    heroNote:    ['کوئی کریڈٹ کارڈ نہیں', 'آف لائن کام کرتا ہے', 'تمام ۱۲ DISCOs سپورٹ'],
    statsBar: [
      { number: '۱۲',     label: 'DISCOs سپورٹ' },
      { number: 'مفت',    label: 'استعمال کی قیمت' },
      { number: '۳ کلک',  label: 'بل دیکھنے کے لیے' },
      { number: 'AI',     label: 'پاورڈ پریڈیکشن' },
    ],
    previewTag:      'لائیو پریویو',
    previewTitle:    'آپ کا ڈیش بورڈ ایسا دکھتا ہے',
    previewSubtitle: 'ایک بڑا نمبر۔ سب کچھ جو آپ کو چاہیے۔ کوئی الجھن نہیں۔',
    billLabel:       'اگلے ماہ کا متوقع بل',
    billMonth:       'مارچ ۲۰۲۶ پیش گوئی',
    slabWarning:     'آپ اگلے سلیب سے صرف ۴۲ یونٹ دور ہیں — Rs. 800 بچائیں',
    featuresTag:     'خصوصیات',
    featuresTitle:   'آپ کو جو کچھ چاہیے',
    featuresSub:     'خاص طور پر پاکستانی گھرانوں کے لیے بنایا گیا۔ سادہ۔ تیز۔ مفت۔',
    howTag:          'کیسے کام کرتا ہے',
    howTitle:        '۳ آسان مراحل',
    howSub:          '۲ منٹ سے کم میں اپنی بل پیش گوئی حاصل کریں۔',
    steps: [
      { title: 'اپنا DISCO منتخب کریں', desc: 'اپنی بجلی کمپنی چنیں — LESCO، MEPCO، IESCO، KE یا کوئی اور۔' },
      { title: 'اپنی معلومات شامل کریں', desc: 'پچھلا بل درج کریں یا اسکین کریں۔ اپنے آلات اور روزانہ استعمال کے گھنٹے شامل کریں۔' },
      { title: 'پیش گوئی دیکھیں',        desc: 'AI فوری طور پر آپ کا متوقع اگلا بل اور پیسے بچانے کے ٹپس دکھاتا ہے۔' },
    ],
    discoTitle:  'پاکستان کے تمام ۱۲ DISCOs سپورٹ',
    ctaTitle1:   'آج ہی اپنے',
    ctaSpan:     'بجلی بل',
    ctaTitle2:   'پر بچت شروع کریں',
    ctaDesc:     'ہمیشہ کے لیے مفت۔ کوئی کریڈٹ کارڈ نہیں۔ کسی بھی فون پر کام کرتا ہے۔',
    ctaPlaceholder: 'اپنا ای میل درج کریں',
    ctaBtn:      'مفت اکاؤنٹ بنائیں',
    footerText:  'پاکستان بجلی بل پریڈیکٹر',
    footerBuilt: 'پاکستان کے لیے بنایا گیا',
    footerFree:  'مفت استعمال',
  }
}

const FEATURES = {
  EN: [
    { color: 'blue',   icon: 'fa-brain',                title: 'AI Bill Prediction',    desc: "Our AI learns from your past bills, your appliances, and their daily usage hours to predict your next bill with high accuracy.", tag: 'Core Feature' },
    { color: 'yellow', icon: 'fa-camera',               title: 'Scan Your Bill',        desc: 'Take a photo of your electricity bill. AI reads it automatically — no manual typing needed.', tag: 'OCR Technology' },
    { color: 'green',  icon: 'fa-plug',                 title: 'Appliance Tracker',     desc: 'Add your AC, fridge, fans, geyser. Set daily usage hours. See exactly how much each appliance costs you per month.', tag: 'Smart Feature' },
    { color: 'red',    icon: 'fa-triangle-exclamation', title: 'Slab Warning',          desc: 'Get warned before you cross into the next expensive slab. Save hundreds of rupees each month.', tag: 'Money Saver' },
    { color: 'yellow', icon: 'fa-gauge-high',           title: 'Meter Number Sync',     desc: "Enter your consumer/reference number once — app automatically fetches your bill details from your DISCO's system.", tag: 'Auto Fetch' },
    { color: 'blue',   icon: 'fa-magnifying-glass-chart',title: 'Overbilling Detector', desc: 'Compare the units on your bill vs what your appliances actually consumed. Catch overbilling by your DISCO.', tag: 'Protection' },
    { color: 'green',  icon: 'fa-chart-line',           title: 'Bill History & Graphs', desc: "See your bill trends over months. Understand your usage patterns. Track if you're saving or spending more.", tag: 'Analytics' },
    { color: 'red',    icon: 'fa-bell',                 title: 'Peak Hour Alerts',      desc: 'Get notified at 7PM — peak hours start. Avoid running heavy appliances from 7PM–11PM and reduce your bill.', tag: 'Alert System' },
  ],
  UR: [
    { color: 'blue',   icon: 'fa-brain',                title: 'AI بل پیش گوئی',       desc: 'ہمارا AI آپ کے پچھلے بل، آلات اور روزانہ استعمال سے سیکھ کر اگلے بل کی درست پیش گوئی کرتا ہے۔', tag: 'بنیادی خصوصیت' },
    { color: 'yellow', icon: 'fa-camera',               title: 'بل اسکین کریں',        desc: 'اپنے بجلی بل کی تصویر لیں۔ AI خود بخود پڑھ لیتا ہے — کوئی ٹائپنگ نہیں۔', tag: 'OCR ٹیکنالوجی' },
    { color: 'green',  icon: 'fa-plug',                 title: 'آلات ٹریکر',           desc: 'AC، فریج، پنکھے، گیزر شامل کریں۔ روزانہ استعمال سیٹ کریں۔ دیکھیں کون سا آلات سب سے زیادہ بجلی کھاتا ہے۔', tag: 'سمارٹ فیچر' },
    { color: 'red',    icon: 'fa-triangle-exclamation', title: 'سلیب وارننگ',          desc: 'اگلے مہنگے سلیب میں جانے سے پہلے خبردار ہوں۔ ہر ماہ سینکڑوں روپے بچائیں۔', tag: 'پیسہ بچانے والا' },
    { color: 'yellow', icon: 'fa-gauge-high',           title: 'میٹر نمبر سنک',        desc: 'اپنا کنزیومر نمبر ایک بار درج کریں — ایپ خود آپ کے DISCO سے بل کی تفصیلات لے آتی ہے۔', tag: 'آٹو فیچ' },
    { color: 'blue',   icon: 'fa-magnifying-glass-chart',title: 'اوور بلنگ ڈیٹیکٹر',  desc: 'اپنے بل کے یونٹس بمقابلہ آلات کا موازنہ کریں۔ اپنے DISCO کی اوور بلنگ پکڑیں۔', tag: 'تحفظ' },
    { color: 'green',  icon: 'fa-chart-line',           title: 'بل ہسٹری و گراف',     desc: 'مہینوں کے بل کا رجحان دیکھیں۔ اپنے استعمال کی عادات سمجھیں۔ بچت یا خرچ ٹریک کریں۔', tag: 'اینالٹکس' },
    { color: 'red',    icon: 'fa-bell',                 title: 'پیک آور الرٹ',         desc: 'شام ۷ بجے نوٹیفکیشن ملے — پیک آور شروع۔ ۷ سے ۱۱ بجے بھاری آلات نہ چلائیں۔', tag: 'الرٹ سسٹم' },
  ]
}

const DISCOS = [
  { name: 'LESCO',  city: 'Lahore',           active: true  },
  { name: 'MEPCO',  city: 'Multan',           active: false },
  { name: 'FESCO',  city: 'Faisalabad',       active: false },
  { name: 'GEPCO',  city: 'Gujranwala',       active: false },
  { name: 'IESCO',  city: 'Islamabad',        active: false },
  { name: 'PESCO',  city: 'Peshawar',         active: false },
  { name: 'HESCO',  city: 'Hyderabad',        active: false },
  { name: 'SEPCO',  city: 'Sukkur',           active: false },
  { name: 'QESCO',  city: 'Quetta',           active: false },
  { name: 'KE',     city: 'Karachi',          active: false },
  { name: 'TESCO',  city: 'Tribal Districts', active: false },
  { name: 'AJKESC', city: 'Azad Kashmir',     active: false },
]

export default function LandingPage() {
  const navigate      = useNavigate()
  const [lang, setLang]   = useState('EN')
  const [email, setEmail] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Pick content based on language
  const c = CONTENT[lang]
  const features = FEATURES[lang]
  const isUrdu = lang === 'UR'

  const handleCTA = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div className={styles.page} dir={isUrdu ? 'rtl' : 'ltr'}>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
          <div className={styles.logoText}>Smart<span>Bill</span></div>
        </div>

        <div className={styles.navRight}>
          {/* Language toggle — EN and Urdu only */}
          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${lang === 'EN' ? styles.langActive : ''}`}
              onClick={() => setLang('EN')}
            >EN</button>
            <button
              className={`${styles.langBtn} ${styles.urduBtn} ${lang === 'UR' ? styles.langActive : ''}`}
              onClick={() => setLang('UR')}
            >اردو</button>
          </div>

          <button className={styles.btnLogin} onClick={() => navigate('/login')}>
            {isUrdu ? 'لاگ ان' : 'Login'}
          </button>
          <button className={styles.btnSignup} onClick={() => navigate('/signup')}>
            {isUrdu ? 'مفت شروع کریں' : 'Get Started — Free'}
          </button>

          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <button onClick={() => { navigate('/login'); setMenuOpen(false) }}>
              {isUrdu ? 'لاگ ان' : 'Login'}
            </button>
            <button onClick={() => { navigate('/signup'); setMenuOpen(false) }}>
              {isUrdu ? 'مفت شروع کریں' : 'Get Started — Free'}
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={`${styles.heroBadge} ${isUrdu ? 'urdu' : ''}`}>
          <i className="fa-solid fa-star"></i>&nbsp; {c.badge}
        </div>

        <h1 className={`${styles.heroTitle} ${isUrdu ? 'urdu' : ''}`}>
          {c.heroTitle1} <span>{c.heroSpan}</span><br />{c.heroTitle2}
        </h1>

        {/* Show Urdu translation line only in EN mode */}
        {!isUrdu && (
          <p className={`${styles.heroUrdu} urdu`}>{c.heroUrdu}</p>
        )}

        <p className={`${styles.heroDesc} ${isUrdu ? 'urdu' : ''}`}>{c.heroDesc}</p>

        <div className={styles.heroButtons}>
          <button className={styles.btnHeroPrimary} onClick={() => navigate('/signup')}>
            <i className="fa-solid fa-bolt"></i>&nbsp; {c.btnPrimary}
          </button>
          <button className={styles.btnHeroSecondary} onClick={() => {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            <i className="fa-solid fa-play"></i>&nbsp; {c.btnSecondary}
          </button>
        </div>

        <p className={`${styles.heroNote} ${isUrdu ? 'urdu' : ''}`}>
          {c.heroNote.map((n, i) => (
            <span key={i}><i className="fa-solid fa-check"></i> {n} &nbsp;&nbsp;</span>
          ))}
        </p>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <div className={styles.statsBar}>
        {c.statsBar.map(s => (
          <div key={s.label} className={styles.statItem}>
            <div className={styles.statNumber}>{s.number}</div>
            <div className={`${styles.statLabel} ${isUrdu ? 'urdu' : ''}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          BILL PREVIEW
      ══════════════════════════════════════ */}
      <section className={styles.previewSection}>
        <div className={`${styles.sectionTag} ${isUrdu ? 'urdu' : ''}`}>{c.previewTag}</div>
        <h2 className={`${styles.sectionTitle} ${isUrdu ? 'urdu' : ''}`}>{c.previewTitle}</h2>
        <p className={`${styles.sectionSubtitle} ${isUrdu ? 'urdu' : ''}`}>{c.previewSubtitle}</p>

        <div className={styles.billCard}>
          <div className={styles.billCardCircle}></div>
          <div className={styles.billCardHeader}>
            <div className={styles.discoBadge}>IESCO</div>
            <div className={`${styles.billMonth} ${isUrdu ? 'urdu' : ''}`}>{c.billMonth}</div>
          </div>
          <div className={`${styles.billAmountLabel} ${isUrdu ? 'urdu' : ''}`}>{c.billLabel}</div>
          <div className={styles.billAmount}>Rs. 6,840</div>
          <div className={styles.billUnits}>~310 units estimated</div>
          <hr className={styles.billDivider} />
          <div className={styles.billDetails}>
            <div className={styles.billDetailItem}><label>Last Bill</label><span>Rs. 5,960</span></div>
            <div className={styles.billDetailItem}><label>Units Last Month</label><span>280 units</span></div>
            <div className={styles.billDetailItem}><label>Current Slab</label><span>301–700</span></div>
            <div className={styles.billDetailItem}><label>Due Date</label><span>Mar 26</span></div>
          </div>
          <div className={`${styles.slabWarning} ${isUrdu ? 'urdu' : ''}`}>
            <i className="fa-solid fa-triangle-exclamation"></i> {c.slabWarning}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className={styles.featuresSection} id="features">
        <div className={`${styles.sectionTag} ${isUrdu ? 'urdu' : ''}`}>{c.featuresTag}</div>
        <h2 className={`${styles.sectionTitle} ${isUrdu ? 'urdu' : ''}`}>{c.featuresTitle}</h2>
        <p className={`${styles.sectionSubtitle} ${isUrdu ? 'urdu' : ''}`}>{c.featuresSub}</p>

        <div className={styles.featuresGrid}>
          {features.map(f => (
            <div key={f.title} className={`${styles.featureCard} ${styles[f.color]}`}>
              <div className={styles.featureIcon}>
                <i className={`fa-solid ${f.icon}`}></i>
              </div>
              <h3 className={isUrdu ? 'urdu' : ''}>{f.title}</h3>
              <p className={isUrdu ? 'urdu' : ''}>{f.desc}</p>
              <span className={`${styles.featureTag} ${isUrdu ? 'urdu' : ''}`}>{f.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className={styles.howSection} id="how-it-works">
        <div className={`${styles.sectionTag} ${isUrdu ? 'urdu' : ''}`}>{c.howTag}</div>
        <h2 className={`${styles.sectionTitle} ${isUrdu ? 'urdu' : ''}`}>{c.howTitle}</h2>
        <p className={`${styles.sectionSubtitle} ${isUrdu ? 'urdu' : ''}`}>{c.howSub}</p>

        <div className={styles.steps}>
          {c.steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNumber}>{i + 1}</div>
              <h4 className={isUrdu ? 'urdu' : ''}>{s.title}</h4>
              <p className={isUrdu ? 'urdu' : ''}>{s.desc}</p>
              {i < 2 && <div className={styles.stepArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          ALL 12 DISCOs
      ══════════════════════════════════════ */}
      <section className={styles.discoSection}>
        <h3 className={isUrdu ? 'urdu' : ''}>
          <i className="fa-solid fa-circle-check" style={{ color: 'var(--green)' }}></i>
          &nbsp; {c.discoTitle}
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
          CTA
      ══════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <h2 className={isUrdu ? 'urdu' : ''}>
          {c.ctaTitle1} <span>{c.ctaSpan}</span> {c.ctaTitle2}
        </h2>
        <p className={isUrdu ? 'urdu' : ''}>{c.ctaDesc}</p>
        <form className={styles.ctaRow} onSubmit={handleCTA}>
          <input
            className={`${styles.ctaInput} ${isUrdu ? 'urdu' : ''}`}
            type="email"
            placeholder={c.ctaPlaceholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            dir="ltr"
          />
          <button type="submit" className={`${styles.btnCta} ${isUrdu ? 'urdu' : ''}`}>
            <i className="fa-solid fa-bolt"></i>&nbsp; {c.ctaBtn}
          </button>
        </form>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className={styles.footer}>
        <p className={isUrdu ? 'urdu' : ''}>
          © 2026 <span>SmartBill</span> — {c.footerText}
          &nbsp;|&nbsp;
          <i className="fa-solid fa-location-dot"></i> {c.footerBuilt}
          &nbsp;|&nbsp;
          {c.footerFree}
          &nbsp;|&nbsp;
          <a href="mailto:smartbillpk@gmail.com">smartbillpk@gmail.com</a>
        </p>
      </footer>

    </div>
  )
}
