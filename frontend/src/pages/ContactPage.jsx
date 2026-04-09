import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import PublicNavbar from '../components/PublicNavbar'
import Footer from '../components/Footer'
import styles from './ContactPage.module.css'

/* ══════════════════════════════════════
   CONTENT — English & Urdu translations
══════════════════════════════════════ */
const DISCOS = [
  'LESCO', 'MEPCO', 'IESCO', 'FESCO', 'GEPCO',
  'PESCO', 'HESCO', 'SEPCO', 'QESCO', 'TESCO',
  'K-Electric', 'CPPA-G',
]

const CONTENT = {
  EN: {
    heroTitle1: 'Get in',
    heroSpan: 'Touch',
    heroSub: 'Have questions, feedback, or need help? We reply within 24 hours.',
    breadHome: 'Home',
    breadContact: 'Contact',
    // Contact cards
    cardEmail: { title: 'Email', desc: 'smartbillpk@gmail.com', link: 'mailto:smartbillpk@gmail.com' },
    cardWhatsApp: { title: 'WhatsApp', desc: 'Coming Soon', link: '#' },
    cardInstagram: { title: 'Instagram', desc: '@smartbill.pk — Coming Soon', link: '#' },
    cardLocation: { title: 'Location', desc: 'Islamabad, Pakistan', link: '#' },
    // Info panel
    infoHeading: 'We Are Here to Help You',
    infoSupportHours: 'Support Hours',
    infoSupportVal: 'Mon–Sat, 9 AM – 9 PM PKT',
    infoEmail: 'Email',
    infoEmailVal: 'smartbillpk@gmail.com',
    infoWhatsApp: 'WhatsApp',
    infoWhatsAppVal: 'Coming Soon',
    infoBug: 'Report a Bug',
    infoBugVal: 'Use the form or email us directly',
    responseBadge: 'Average response time: under 24 hours',
    // Form
    formTitle: 'Send Us a Message',
    subjects: ['General Question', 'App Issue/Bug', 'Bill Calculation Help', 'Feature Request', 'Partnership', 'Other'],
    labelName: 'Full Name',
    labelPhone: 'Phone (optional)',
    labelEmail: 'Email Address',
    labelDisco: 'Select Your DISCO',
    discoPlaceholder: '— Choose DISCO —',
    labelMessage: 'Message',
    btnSend: 'Send Message',
    successMsg: 'Your message has been sent successfully! We will get back to you within 24 hours.',
    // FAQ Quick
    faqTitle: 'Quick Answers',
    faqItems: [
      { q: 'How long does it take to get a reply?', a: 'We reply within 24 hours during support hours (Mon–Sat, 9 AM – 9 PM PKT).' },
      { q: 'Can I report a bug through this form?', a: 'Yes! Select "App Issue/Bug" as the subject and describe the problem in detail.' },
      { q: 'Is there a phone number I can call?', a: 'Not yet. Currently, email is the fastest way to reach us. WhatsApp support is coming soon.' },
    ],
  },
  UR: {
    heroTitle1: 'ہم سے',
    heroSpan: 'رابطہ کریں',
    heroSub: 'سوالات، رائے، یا مدد چاہیے؟ ہم ۲۴ گھنٹوں میں جواب دیتے ہیں۔',
    breadHome: 'ہوم',
    breadContact: 'رابطہ',
    cardEmail: { title: 'ای میل', desc: 'smartbillpk@gmail.com', link: 'mailto:smartbillpk@gmail.com' },
    cardWhatsApp: { title: 'واٹس ایپ', desc: 'جلد آ رہا ہے', link: '#' },
    cardInstagram: { title: 'انسٹاگرام', desc: '@smartbill.pk — جلد آ رہا ہے', link: '#' },
    cardLocation: { title: 'مقام', desc: 'اسلام آباد، پاکستان', link: '#' },
    infoHeading: 'ہم آپ کی مدد کے لیے حاضر ہیں',
    infoSupportHours: 'سپورٹ اوقات',
    infoSupportVal: 'پیر–ہفتہ، صبح ۹ – رات ۹ PKT',
    infoEmail: 'ای میل',
    infoEmailVal: 'smartbillpk@gmail.com',
    infoWhatsApp: 'واٹس ایپ',
    infoWhatsAppVal: 'جلد آ رہا ہے',
    infoBug: 'بگ رپورٹ کریں',
    infoBugVal: 'فارم استعمال کریں یا براہ راست ای میل کریں',
    responseBadge: 'اوسط جوابی وقت: ۲۴ گھنٹے سے کم',
    formTitle: 'ہمیں پیغام بھیجیں',
    subjects: ['عام سوال', 'ایپ مسئلہ/بگ', 'بل کیلکولیشن مدد', 'فیچر کی درخواست', 'پارٹنرشپ', 'دیگر'],
    labelName: 'پورا نام',
    labelPhone: 'فون (اختیاری)',
    labelEmail: 'ای میل ایڈریس',
    labelDisco: 'اپنا DISCO منتخب کریں',
    discoPlaceholder: '— DISCO منتخب کریں —',
    labelMessage: 'پیغام',
    btnSend: 'پیغام بھیجیں',
    successMsg: 'آپ کا پیغام کامیابی سے بھیج دیا گیا! ہم ۲۴ گھنٹوں میں جواب دیں گے۔',
    faqTitle: 'فوری جوابات',
    faqItems: [
      { q: 'جواب ملنے میں کتنا وقت لگتا ہے؟', a: 'ہم سپورٹ اوقات (پیر–ہفتہ، صبح ۹ – رات ۹ PKT) میں ۲۴ گھنٹوں میں جواب دیتے ہیں۔' },
      { q: 'کیا میں اس فارم سے بگ رپورٹ کر سکتا ہوں؟', a: 'جی ہاں! سبجیکٹ میں "ایپ مسئلہ/بگ" منتخب کریں اور مسئلے کی تفصیل لکھیں۔' },
      { q: 'کیا کوئی فون نمبر ہے جس پر کال کر سکتا ہوں؟', a: 'ابھی نہیں۔ فی الحال ای میل سب سے تیز طریقہ ہے۔ واٹس ایپ سپورٹ جلد آ رہی ہے۔' },
    ],
  },
}

const CARD_ICONS = [
  { icon: 'fa-solid fa-envelope', color: 'navy' },
  { icon: 'fa-brands fa-whatsapp', color: 'whatsapp' },
  { icon: 'fa-brands fa-instagram', color: 'gold' },
  { icon: 'fa-solid fa-location-dot', color: 'red' },
]

export default function ContactPage() {
  const { lang, isUrdu } = useLang()
  const t = CONTENT[lang] || CONTENT.EN

  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', email: '', disco: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const cards = [t.cardEmail, t.cardWhatsApp, t.cardInstagram, t.cardLocation]

  function toggleSubject(idx) {
    setSelectedSubjects(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', phone: '', email: '', disco: '', message: '' })
    setSelectedSubjects([])
  }

  return (
    <div className={styles.page} dir={isUrdu ? 'rtl' : 'ltr'}>
      <PublicNavbar />

      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            {t.heroTitle1} <span className={styles.gold}>{t.heroSpan}</span>
          </h1>
          <p className={styles.heroSub}>{t.heroSub}</p>
          <div className={styles.breadcrumb}>
            <span>{t.breadHome}</span>
            <i className="fa-solid fa-chevron-right"></i>
            <span className={styles.breadActive}>{t.breadContact}</span>
          </div>
        </div>
      </section>

      {/* ══ CONTACT CARDS ══ */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {cards.map((card, i) => (
            <a key={i} href={card.link} className={styles.contactCard}>
              <div className={`${styles.cardIcon} ${styles[CARD_ICONS[i].color]}`}>
                <i className={CARD_ICONS[i].icon}></i>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ══ CONTACT MAIN ══ */}
      <section className={styles.mainSection}>
        <div className={styles.mainGrid}>
          {/* Left info panel */}
          <div className={styles.infoPanel}>
            <div className={styles.goldLine}></div>
            <h2 className={styles.infoHeading}>{t.infoHeading}</h2>

            <div className={styles.infoItem}>
              <i className="fa-solid fa-clock"></i>
              <div>
                <strong>{t.infoSupportHours}</strong>
                <p>{t.infoSupportVal}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <i className="fa-solid fa-envelope"></i>
              <div>
                <strong>{t.infoEmail}</strong>
                <p>{t.infoEmailVal}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <i className="fa-brands fa-whatsapp"></i>
              <div>
                <strong>{t.infoWhatsApp}</strong>
                <p>{t.infoWhatsAppVal}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <i className="fa-solid fa-bug"></i>
              <div>
                <strong>{t.infoBug}</strong>
                <p>{t.infoBugVal}</p>
              </div>
            </div>

            <div className={styles.responseBadge}>
              <i className="fa-solid fa-bolt"></i>
              {t.responseBadge}
            </div>
          </div>

          {/* Right form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>{t.formTitle}</h2>

            {/* Subject chips */}
            <div className={styles.chips}>
              {t.subjects.map((subj, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.chip} ${selectedSubjects.includes(i) ? styles.chipActive : ''}`}
                  onClick={() => toggleSubject(i)}
                >
                  {subj}
                </button>
              ))}
            </div>

            {submitted && (
              <div className={styles.successMsg}>
                <i className="fa-solid fa-circle-check"></i> {t.successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>{t.labelName}</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>{t.labelPhone}</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>{t.labelEmail}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>{t.labelDisco}</label>
                <select name="disco" value={form.disco} onChange={handleChange}>
                  <option value="">{t.discoPlaceholder}</option>
                  {DISCOS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>{t.labelMessage}</label>
                <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className={styles.sendBtn}>
                <i className="fa-solid fa-paper-plane"></i> {t.btnSend}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ FAQ QUICK ══ */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>{t.faqTitle}</h2>
        <div className={styles.faqGrid}>
          {t.faqItems.map((item, i) => (
            <div key={i} className={styles.faqCard}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
