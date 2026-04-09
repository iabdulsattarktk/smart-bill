import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import PublicNavbar from '../components/PublicNavbar'
import Footer from '../components/Footer'
import styles from './TermsOfServicePage.module.css'

const TOC = [
  { id: 'acceptance',          icon: 'fa-solid fa-handshake',       en: 'Acceptance',            ur: 'قبولیت' },
  { id: 'what-we-provide',     icon: 'fa-solid fa-bolt',            en: 'What Smart Bill Provides', ur: 'Smart Bill کیا فراہم کرتا ہے' },
  { id: 'your-account',        icon: 'fa-solid fa-user-gear',       en: 'Your Account',          ur: 'آپ کا اکاؤنٹ' },
  { id: 'acceptable-use',      icon: 'fa-solid fa-check-circle',    en: 'Acceptable Use',        ur: 'قابل قبول استعمال' },
  { id: 'prohibited-actions',  icon: 'fa-solid fa-ban',             en: 'Prohibited Actions',    ur: 'ممنوعہ اقدامات' },
  { id: 'prediction-accuracy', icon: 'fa-solid fa-chart-line',      en: 'Prediction Accuracy',   ur: 'پیشگوئی کی درستگی' },
  { id: 'intellectual-property', icon: 'fa-solid fa-copyright',     en: 'Intellectual Property',  ur: 'دانشورانہ ملکیت' },
  { id: 'termination',         icon: 'fa-solid fa-user-xmark',      en: 'Account Termination',   ur: 'اکاؤنٹ کی بندش' },
  { id: 'disclaimer',          icon: 'fa-solid fa-triangle-exclamation', en: 'Disclaimer',        ur: 'دستبرداری' },
  { id: 'contact',             icon: 'fa-solid fa-envelope',        en: 'Contact',               ur: 'رابطہ' },
]

export default function TermsOfServicePage() {
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
            <span>{isUrdu ? 'شرائط و ضوابط' : 'Terms of Service'}</span>
          </nav>
          <h1>{isUrdu ? '' : 'Terms of '}<span className={styles.gold}>{isUrdu ? 'شرائط و ضوابط' : 'Service'}</span></h1>
          <p className={styles.heroSub}>
            {isUrdu ? 'سادہ زبان میں لکھا گیا — کوئی قانونی الجھن نہیں' : 'Written in plain language — no legal jargon'}
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
                <p>Use Smart Bill fairly, do not misuse it, understand that predictions are estimates — not guaranteed exact amounts.</p>
              </div>

              {/* Section 1 */}
              <div className={styles.section} id="acceptance">
                <h2><i className={TOC[0].icon}></i> <span className={styles.secNum}>01</span> Acceptance</h2>
                <p>By accessing or using Smart Bill, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use the service.</p>
                <p>These terms apply to all users, whether you create an account or use the app as a guest.</p>
              </div>

              {/* Section 2 */}
              <div className={styles.section} id="what-we-provide">
                <h2><i className={TOC[1].icon}></i> <span className={styles.secNum}>02</span> What Smart Bill Provides</h2>
                <p>Smart Bill is a free web application that provides the following features for Pakistani households:</p>
                <ul>
                  <li>Predict your upcoming electricity bill using AI</li>
                  <li>Track your bill history over time</li>
                  <li>Slab calculator for all 12 DISCOs</li>
                  <li>Appliance tracker to see which devices cost the most</li>
                  <li>Savings goals to help you reduce electricity usage</li>
                  <li>Bill scanner to import bills automatically</li>
                  <li>Peak hour alerts to shift usage to cheaper times</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue any feature at any time without prior notice.</p>
              </div>

              {/* Section 3 */}
              <div className={styles.section} id="your-account">
                <h2><i className={TOC[2].icon}></i> <span className={styles.secNum}>03</span> Your Account</h2>
                <p>When you create an account, you are responsible for:</p>
                <ul>
                  <li>Keeping your login credentials safe and confidential.</li>
                  <li>Providing accurate and truthful information.</li>
                  <li>All activity that occurs under your account.</li>
                </ul>
                <p>If you suspect unauthorized access to your account, contact us immediately.</p>
              </div>

              {/* Section 4 */}
              <div className={styles.section} id="acceptable-use">
                <h2><i className={TOC[3].icon}></i> <span className={styles.secNum}>04</span> Acceptable Use</h2>
                <p>Smart Bill is designed for personal, household use. You agree to:</p>
                <ul>
                  <li>Use the service only for managing your own household electricity bills.</li>
                  <li>Not scrape, crawl, or overload the service with automated requests.</li>
                  <li>Not attempt to access other users' data or accounts.</li>
                  <li>Not use the service for any unlawful purpose.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className={styles.section} id="prohibited-actions">
                <h2><i className={TOC[4].icon}></i> <span className={styles.secNum}>05</span> Prohibited Actions</h2>
                <p>The following actions are strictly prohibited:</p>
                <ul>
                  <li>Reverse engineering, decompiling, or disassembling Smart Bill's code.</li>
                  <li>Using the service for commercial scraping or data harvesting.</li>
                  <li>Impersonating another user or providing false identity information.</li>
                  <li>Attempting to bypass security measures or exploit vulnerabilities.</li>
                </ul>
                <div className={styles.redBox}>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <p>Violation of these terms may result in <strong>immediate account termination</strong> without prior notice.</p>
                </div>
              </div>

              {/* Section 6 */}
              <div className={styles.section} id="prediction-accuracy">
                <h2><i className={TOC[5].icon}></i> <span className={styles.secNum}>06</span> Prediction Accuracy</h2>
                <p>Smart Bill's predictions are <strong>estimates</strong> generated by AI models based on the data you provide and historical tariff rates. They are not guaranteed to match your actual electricity bill.</p>
                <p>Actual bills depend on your DISCO's meter readings, tariff changes, fuel adjustments, taxes, and other factors beyond our control. Smart Bill is a planning tool, not a replacement for your official bill.</p>
              </div>

              {/* Section 7 */}
              <div className={styles.section} id="intellectual-property">
                <h2><i className={TOC[6].icon}></i> <span className={styles.secNum}>07</span> Intellectual Property</h2>
                <p>Smart Bill, including its name, logo, code, design, and all content, is the intellectual property of Smart Bill. You may not copy, reproduce, distribute, or create derivative works from any part of the service without explicit written permission.</p>
              </div>

              {/* Section 8 */}
              <div className={styles.section} id="termination">
                <h2><i className={TOC[7].icon}></i> <span className={styles.secNum}>08</span> Account Termination</h2>
                <p>We may suspend or terminate your account at any time if you violate these terms or engage in behavior that harms the service or other users.</p>
                <p>You may also delete your account at any time from the Settings page. Upon deletion, all your personal data will be permanently removed from our servers.</p>
              </div>

              {/* Section 9 */}
              <div className={styles.section} id="disclaimer">
                <h2><i className={TOC[8].icon}></i> <span className={styles.secNum}>09</span> Disclaimer</h2>
                <p>Smart Bill is provided <strong>"as is"</strong> and <strong>"as available"</strong> without any warranties of any kind, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that predictions will be accurate.</p>
                <p>To the maximum extent permitted by law, Smart Bill shall not be liable for any damages arising from the use or inability to use the service.</p>
              </div>

              {/* Section 10 */}
              <div className={styles.section} id="contact">
                <h2><i className={TOC[9].icon}></i> <span className={styles.secNum}>10</span> Contact</h2>
                <p>If you have any questions about these Terms of Service, please reach out:</p>
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
