import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import PublicNavbar from '../components/PublicNavbar'
import Footer from '../components/Footer'
import styles from './PrivacyPolicyPage.module.css'

const TOC = [
  { id: 'introduction',       icon: 'fa-solid fa-book-open',       en: 'Introduction',         ur: 'تعارف' },
  { id: 'what-we-collect',    icon: 'fa-solid fa-database',        en: 'What We Collect',      ur: 'ہم کیا جمع کرتے ہیں' },
  { id: 'how-we-use',         icon: 'fa-solid fa-gears',           en: 'How We Use Your Data', ur: 'ہم آپ کا ڈیٹا کیسے استعمال کرتے ہیں' },
  { id: 'who-we-share',       icon: 'fa-solid fa-user-shield',     en: 'Who We Share With',    ur: 'ہم کس کے ساتھ شیئر کرتے ہیں' },
  { id: 'data-security',      icon: 'fa-solid fa-lock',            en: 'Data Security',        ur: 'ڈیٹا سیکیورٹی' },
  { id: 'your-rights',        icon: 'fa-solid fa-scale-balanced',  en: 'Your Rights',          ur: 'آپ کے حقوق' },
  { id: 'cookies',            icon: 'fa-solid fa-cookie-bite',     en: 'Cookies',              ur: 'کوکیز' },
  { id: 'childrens-privacy',  icon: 'fa-solid fa-child',           en: "Children's Privacy",   ur: 'بچوں کی رازداری' },
  { id: 'policy-changes',     icon: 'fa-solid fa-bell',            en: 'Policy Changes',       ur: 'پالیسی میں تبدیلیاں' },
  { id: 'contact',            icon: 'fa-solid fa-envelope',        en: 'Contact Us',           ur: 'ہم سے رابطہ' },
]

export default function PrivacyPolicyPage() {
  const { lang, isUrdu, toggleLang } = useLang()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page} dir={isUrdu ? 'rtl' : 'ltr'}>
      <PublicNavbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb}>
            <Link to="/">{isUrdu ? 'ہوم' : 'Home'}</Link>
            <span>/</span>
            <span>{isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy'}</span>
          </nav>
          <h1>{isUrdu ? '' : 'Privacy '}<span className={styles.gold}>{isUrdu ? 'رازداری کی پالیسی' : 'Policy'}</span></h1>
          <p className={styles.heroSub}>
            {isUrdu ? 'آپ کے بجلی کے بل کا ڈیٹا محفوظ ہے' : 'Your electricity bill data is private'}
          </p>
          <div className={styles.badge}>
            <i className="fa-solid fa-clock"></i>
            {isUrdu ? 'آخری اپ ڈیٹ: جنوری 1، 2025' : 'Last Updated: January 1, 2025'}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className={styles.content}>
        <div className={styles.grid}>

          {/* Sidebar TOC */}
          <aside className={styles.sidebar}>
            <div className={styles.tocCard}>
              <h3><i className="fa-solid fa-list"></i> {isUrdu ? 'فہرست' : 'Table of Contents'}</h3>
              <ul>
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <button onClick={() => scrollTo(item.id)}>
                      <span className={styles.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                      {isUrdu ? item.ur : item.en}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className={styles.main}>
            <div className={styles.card}>

              {/* Urdu note */}
              {isUrdu && (
                <div className={styles.urduNote}>
                  <i className="fa-solid fa-language"></i>
                  یہ صفحہ فی الحال صرف انگریزی میں دستیاب ہے
                </div>
              )}

              {/* Intro highlight */}
              <div className={styles.introBox}>
                <p>We collect only what is necessary. We never sell your data. You can delete everything at any time.</p>
              </div>

              {/* Section 1 */}
              <div className={styles.section} id="introduction">
                <h2><i className={TOC[0].icon}></i> <span className={styles.secNum}>01</span> Introduction</h2>
                <p>Smart Bill operates a web application designed to help Pakistani households predict and manage their electricity bills. This Privacy Policy explains what data we collect, how we use it, and the choices you have regarding your information.</p>
                <p>By using Smart Bill, you agree to the practices described in this policy. If you do not agree, please do not use the service.</p>
              </div>

              {/* Section 2 */}
              <div className={styles.section} id="what-we-collect">
                <h2><i className={TOC[1].icon}></i> <span className={styles.secNum}>02</span> What We Collect</h2>
                <p>We collect the minimum data required to provide our services:</p>
                <ul>
                  <li><strong>Account Information</strong> — Your name and email address when you sign up.</li>
                  <li><strong>Bill Data</strong> — Electricity units consumed and bill amounts you enter or scan.</li>
                  <li><strong>Appliance Data</strong> — Appliances you add, their wattage, and daily usage hours.</li>
                  <li><strong>Usage Analytics</strong> — Anonymous usage patterns to improve the app experience.</li>
                </ul>
                <div className={styles.greenBox}>
                  <i className="fa-solid fa-shield-halved"></i>
                  <p>We <strong>NEVER</strong> collect: bank details, CNIC numbers, or your exact home address.</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className={styles.section} id="how-we-use">
                <h2><i className={TOC[2].icon}></i> <span className={styles.secNum}>03</span> How We Use Your Data</h2>
                <p>Your data is used solely to provide and improve Smart Bill's features:</p>
                <ul>
                  <li><strong>Bill Prediction</strong> — Our AI uses your past bills and appliance data to predict your next bill.</li>
                  <li><strong>Slab Calculation</strong> — We calculate which DISCO tariff slab you fall into and warn you before you cross into a higher one.</li>
                  <li><strong>Personalized Tips</strong> — Based on your usage patterns, we provide savings suggestions tailored to your household.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className={styles.section} id="who-we-share">
                <h2><i className={TOC[3].icon}></i> <span className={styles.secNum}>04</span> Who We Share With</h2>
                <p><strong>Nobody.</strong></p>
                <p>We do <strong>NOT</strong> sell, rent, or share your personal data with any third party. Your data stays within Smart Bill's secure infrastructure and is used only to serve you.</p>
              </div>

              {/* Section 5 */}
              <div className={styles.section} id="data-security">
                <h2><i className={TOC[4].icon}></i> <span className={styles.secNum}>05</span> Data Security</h2>
                <p>We take the security of your data seriously:</p>
                <ul>
                  <li><strong>Encrypted in Transit</strong> — All data transferred between your device and our servers uses HTTPS encryption.</li>
                  <li><strong>Encrypted at Rest</strong> — Your stored data is encrypted on our servers.</li>
                  <li><strong>Hosted on Supabase</strong> — We use Supabase, a trusted platform with enterprise-grade security, for data storage and authentication.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className={styles.section} id="your-rights">
                <h2><i className={TOC[5].icon}></i> <span className={styles.secNum}>06</span> Your Rights</h2>
                <p>You have full control over your data at all times:</p>
                <ul>
                  <li><strong>View</strong> — See all the data we have about you from your Settings page.</li>
                  <li><strong>Export</strong> — Download your data in a standard format anytime.</li>
                  <li><strong>Delete</strong> — Permanently delete all your data from our servers with one click in Settings.</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className={styles.section} id="cookies">
                <h2><i className={TOC[6].icon}></i> <span className={styles.secNum}>07</span> Cookies</h2>
                <p>Smart Bill uses minimal cookies strictly for session management. We do not use tracking cookies, advertising cookies, or any third-party analytics cookies. The only cookies stored are those necessary to keep you logged in.</p>
              </div>

              {/* Section 8 */}
              <div className={styles.section} id="childrens-privacy">
                <h2><i className={TOC[7].icon}></i> <span className={styles.secNum}>08</span> Children's Privacy</h2>
                <p>Smart Bill is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.</p>
              </div>

              {/* Section 9 */}
              <div className={styles.section} id="policy-changes">
                <h2><i className={TOC[8].icon}></i> <span className={styles.secNum}>09</span> Policy Changes</h2>
                <p>We may update this Privacy Policy from time to time. If we make significant changes, we will notify you through the app or via email. We encourage you to review this page periodically for the latest information.</p>
              </div>

              {/* Section 10 */}
              <div className={styles.section} id="contact">
                <h2><i className={TOC[9].icon}></i> <span className={styles.secNum}>10</span> Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy or your data, please contact us:</p>
                <div className={styles.contactBox}>
                  <i className="fa-solid fa-envelope"></i>
                  <a href="mailto:smartbillpk@gmail.com">smartbillpk@gmail.com</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
