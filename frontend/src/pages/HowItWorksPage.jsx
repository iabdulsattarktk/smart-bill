import { useLang } from '../context/LanguageContext'
import PublicNavbar from '../components/PublicNavbar'
import Footer from '../components/Footer'
import styles from './HowItWorksPage.module.css'

/* ══════════════════════════════════════
   CONTENT — English & Urdu translations
══════════════════════════════════════ */
const CONTENT = {
  EN: {
    heroTitle1: 'How ',
    heroSpan: 'Smart Bill',
    heroTitle2: ' Works',
    heroSub: 'Predict your electricity bill in 3 simple steps. Free, fast, and built for Pakistan.',
    breadcrumb: ['Home', 'How It Works'],
    badges: ['100% Free', 'Works Offline', 'All 12 DISCOs', 'English & Urdu'],
    stepsTag: 'Simple Process',
    stepsTitle: '3 Easy Steps to Predict Your Bill',
    stepsSub: 'No sign-up needed. Get your prediction in under 2 minutes.',
    steps: [
      { num: '1', title: 'Scan or Enter Your Bill', desc: 'Take a photo of your electricity bill or manually enter your last bill amount and units consumed.', tag: 'Step 1 — Input' },
      { num: '2', title: 'Add Your Appliances', desc: 'Select your home appliances — AC, fridge, fans, geyser — and set daily usage hours for each one.', tag: 'Step 2 — Track' },
      { num: '3', title: 'Get Your Prediction', desc: 'Our AI instantly calculates your predicted next bill, shows slab warnings, and gives saving tips.', tag: 'Step 3 — Result' },
    ],
    deepDiveTag: 'Feature Deep Dive',
    deepDiveTitle: 'Powerful Features, Simple Interface',
    deepDiveSub: 'Every feature is designed for Pakistani households.',
    features: [
      {
        icon: 'fa-camera',
        title: 'Bill Scanner (OCR)',
        desc: 'Simply point your camera at your electricity bill. Our OCR technology reads every detail automatically.',
        bullets: [
          'Reads all DISCO bill formats',
          'Extracts units, amount, meter number',
          'Works in low light conditions',
          'No manual typing needed',
        ],
      },
      {
        icon: 'fa-plug',
        title: 'Appliance Tracker',
        desc: 'Add every electrical appliance in your home and see exactly how much each one costs you per month.',
        bullets: [
          'Pre-loaded wattage database',
          'Set daily usage hours per appliance',
          'See cost breakdown per appliance',
          'Identify your biggest power consumers',
        ],
      },
      {
        icon: 'fa-brain',
        title: 'AI Bill Prediction',
        desc: 'Our AI model combines your past bills, appliance usage, and seasonal data to predict your next bill.',
        bullets: [
          'Learns from your bill history',
          'Factors in NEPRA slab rates',
          'Adjusts for weather and season',
          'Warns before slab jumps',
        ],
      },
    ],
    aiTag: 'Artificial Intelligence',
    aiTitle: 'How Our AI Predicts Your Bill',
    aiSub: 'Three data inputs, one accurate prediction.',
    aiInputs: [
      { icon: 'fa-receipt', title: 'Past Bills', desc: 'Historical consumption patterns and amounts from your previous electricity bills.' },
      { icon: 'fa-plug', title: 'Appliances', desc: 'Your home appliances, their wattage, and how many hours you use them daily.' },
      { icon: 'fa-cloud-sun', title: 'Weather & Season', desc: 'Current weather data and seasonal trends that affect electricity consumption.' },
    ],
    discoTag: 'Coverage',
    discoTitle: 'All 12 Pakistan DISCOs Supported',
    discoSub: 'Smart Bill works with every electricity distribution company in Pakistan.',
    discos: ['LESCO', 'MEPCO', 'GEPCO', 'FESCO', 'IESCO', 'PESCO', 'HESCO', 'SEPCO', 'QESCO', 'TESCO', 'K-Electric', 'MWAPDA'],
    ctaTitle1: 'Ready to Predict',
    ctaSpan: ' Your Bill',
    ctaTitle2: '?',
    ctaSub: 'Join thousands of Pakistani households saving money on electricity.',
    ctaBtn1: 'Start Free — No Sign Up',
    ctaBtn2: 'Learn About Us',
  },
  UR: {
    heroTitle1: '',
    heroSpan: 'سمارٹ بل',
    heroTitle2: ' کیسے کام کرتا ہے',
    heroSub: '۳ آسان مراحل میں اپنا بجلی بل پیش گوئی کریں۔ مفت، تیز، اور پاکستان کے لیے بنایا گیا۔',
    breadcrumb: ['ہوم', 'کیسے کام کرتا ہے'],
    badges: ['۱۰۰٪ مفت', 'آف لائن کام کرتا ہے', 'تمام ۱۲ DISCOs', 'انگریزی اور اردو'],
    stepsTag: 'آسان عمل',
    stepsTitle: 'بل پیش گوئی کے ۳ آسان مراحل',
    stepsSub: 'سائن اپ کی ضرورت نہیں۔ ۲ منٹ سے کم میں پیش گوئی حاصل کریں۔',
    steps: [
      { num: '۱', title: 'بل اسکین یا درج کریں', desc: 'اپنے بجلی بل کی تصویر لیں یا دستی طور پر اپنی آخری بل رقم اور یونٹس درج کریں۔', tag: 'مرحلہ ۱ — ان پٹ' },
      { num: '۲', title: 'اپنے آلات شامل کریں', desc: 'اپنے گھر کے آلات منتخب کریں — AC، فریج، پنکھے، گیزر — اور ہر ایک کے لیے روزانہ استعمال کے گھنٹے سیٹ کریں۔', tag: 'مرحلہ ۲ — ٹریک' },
      { num: '۳', title: 'اپنی پیش گوئی حاصل کریں', desc: 'ہمارا AI فوری طور پر آپ کا متوقع اگلا بل بتاتا ہے، سلیب وارننگ دکھاتا ہے، اور بچت کے ٹپس دیتا ہے۔', tag: 'مرحلہ ۳ — نتیجہ' },
    ],
    deepDiveTag: 'خصوصیات کی تفصیل',
    deepDiveTitle: 'طاقتور خصوصیات، سادہ انٹرفیس',
    deepDiveSub: 'ہر خصوصیت پاکستانی گھرانوں کے لیے ڈیزائن کی گئی ہے۔',
    features: [
      {
        icon: 'fa-camera',
        title: 'بل اسکینر (OCR)',
        desc: 'بس اپنا کیمرہ بجلی بل پر پوائنٹ کریں۔ ہماری OCR ٹیکنالوجی ہر تفصیل خود بخود پڑھتی ہے۔',
        bullets: [
          'تمام DISCO بل فارمیٹس پڑھتا ہے',
          'یونٹس، رقم، میٹر نمبر نکالتا ہے',
          'کم روشنی میں بھی کام کرتا ہے',
          'دستی ٹائپنگ کی ضرورت نہیں',
        ],
      },
      {
        icon: 'fa-plug',
        title: 'آلات ٹریکر',
        desc: 'اپنے گھر کا ہر بجلی کا آلہ شامل کریں اور دیکھیں کہ ہر ایک آپ کو ماہانہ کتنا خرچ کرتا ہے۔',
        bullets: [
          'پہلے سے لوڈ واٹیج ڈیٹابیس',
          'ہر آلے کے لیے روزانہ استعمال گھنٹے سیٹ کریں',
          'ہر آلے کی لاگت بریک ڈاؤن دیکھیں',
          'اپنے سب سے بڑے بجلی صارفین پہچانیں',
        ],
      },
      {
        icon: 'fa-brain',
        title: 'AI بل پیش گوئی',
        desc: 'ہمارا AI ماڈل آپ کے پچھلے بلوں، آلات کے استعمال، اور موسمی ڈیٹا کو ملا کر آپ کا اگلا بل پیش گوئی کرتا ہے۔',
        bullets: [
          'آپ کی بل تاریخ سے سیکھتا ہے',
          'NEPRA سلیب ریٹس شامل کرتا ہے',
          'موسم اور سیزن کے لیے ایڈجسٹ ہوتا ہے',
          'سلیب جمپ سے پہلے وارننگ دیتا ہے',
        ],
      },
    ],
    aiTag: 'مصنوعی ذہانت',
    aiTitle: 'ہمارا AI آپ کا بل کیسے پیش گوئی کرتا ہے',
    aiSub: 'تین ڈیٹا ان پٹس، ایک درست پیش گوئی۔',
    aiInputs: [
      { icon: 'fa-receipt', title: 'پچھلے بل', desc: 'آپ کے پچھلے بجلی بلوں سے تاریخی استعمال کے نمونے اور رقم۔' },
      { icon: 'fa-plug', title: 'آلات', desc: 'آپ کے گھر کے آلات، ان کی واٹیج، اور آپ انہیں روزانہ کتنے گھنٹے استعمال کرتے ہیں۔' },
      { icon: 'fa-cloud-sun', title: 'موسم اور سیزن', desc: 'موجودہ موسم کا ڈیٹا اور موسمی رجحانات جو بجلی کی کھپت کو متاثر کرتے ہیں۔' },
    ],
    discoTag: 'کوریج',
    discoTitle: 'پاکستان کے تمام ۱۲ DISCOs سپورٹ',
    discoSub: 'سمارٹ بل پاکستان کی ہر بجلی ڈسٹری بیوشن کمپنی کے ساتھ کام کرتا ہے۔',
    discos: ['LESCO', 'MEPCO', 'GEPCO', 'FESCO', 'IESCO', 'PESCO', 'HESCO', 'SEPCO', 'QESCO', 'TESCO', 'K-Electric', 'MWAPDA'],
    ctaTitle1: 'اپنا بل پیش گوئی',
    ctaSpan: ' کرنے',
    ctaTitle2: ' کے لیے تیار ہیں؟',
    ctaSub: 'ہزاروں پاکستانی گھرانوں میں شامل ہوں جو بجلی پر پیسے بچا رہے ہیں۔',
    ctaBtn1: 'مفت شروع کریں — سائن اپ نہیں',
    ctaBtn2: 'ہمارے بارے میں جانیں',
  },
}

export default function HowItWorksPage() {
  const { lang, isUrdu } = useLang()
  const t = CONTENT[lang] || CONTENT.EN

  return (
    <div className={styles.page} dir={isUrdu ? 'rtl' : 'ltr'}>
      <PublicNavbar />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb}>
            <span>{t.breadcrumb[0]}</span>
            <i className="fa-solid fa-chevron-right" />
            <span className={styles.breadcrumbActive}>{t.breadcrumb[1]}</span>
          </nav>
          <h1 className={styles.heroTitle}>
            {t.heroTitle1}<span>{t.heroSpan}</span>{t.heroTitle2}
          </h1>
          <p className={styles.heroSub}>{t.heroSub}</p>
          <div className={styles.badges}>
            {t.badges.map((b, i) => (
              <span key={i} className={styles.badge}>
                <i className="fa-solid fa-check" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 STEPS ── */}
      <section className={styles.stepsSection}>
        <span className={styles.tag}>{t.stepsTag}</span>
        <h2 className={styles.sectionTitle}>{t.stepsTitle}</h2>
        <p className={styles.sectionSub}>{t.stepsSub}</p>
        <div className={styles.stepsGrid}>
          {t.steps.map((s, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNum}>{s.num}</div>
              {i < 2 && <div className={styles.stepLine} />}
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className={styles.stepTag}>{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE DEEP DIVE ── */}
      <section className={styles.deepDive}>
        <span className={styles.tag}>{t.deepDiveTag}</span>
        <h2 className={styles.sectionTitle}>{t.deepDiveTitle}</h2>
        <p className={styles.sectionSub}>{t.deepDiveSub}</p>
        <div className={styles.featureBlocks}>
          {t.features.map((f, i) => (
            <div key={i} className={`${styles.featureBlock} ${i % 2 === 1 ? styles.featureReverse : ''}`}>
              <div className={styles.featureVisual}>
                <i className={`fa-solid ${f.icon}`} />
              </div>
              <div className={styles.featureText}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul>
                  {f.bullets.map((b, j) => (
                    <li key={j}><i className="fa-solid fa-check-circle" /> {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI SECTION ── */}
      <section className={styles.aiSection}>
        <div className={styles.aiInner}>
          <span className={styles.tagLight}>{t.aiTag}</span>
          <div className={styles.aiBrain}>
            <i className="fa-solid fa-brain" />
          </div>
          <h2 className={styles.aiTitle}>{t.aiTitle}</h2>
          <p className={styles.aiSub}>{t.aiSub}</p>
          <div className={styles.aiGrid}>
            {t.aiInputs.map((inp, i) => (
              <div key={i} className={styles.aiCard}>
                <div className={styles.aiCardIcon}>
                  <i className={`fa-solid ${inp.icon}`} />
                </div>
                <h4>{inp.title}</h4>
                <p>{inp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCO SUPPORT ── */}
      <section className={styles.discoSection}>
        <span className={styles.tag}>{t.discoTag}</span>
        <h2 className={styles.sectionTitle}>{t.discoTitle}</h2>
        <p className={styles.sectionSub}>{t.discoSub}</p>
        <div className={styles.discoPills}>
          {t.discos.map((d, i) => (
            <span key={i} className={styles.discoPill}>
              <i className="fa-solid fa-bolt" /> {d}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>
          {t.ctaTitle1}<span>{t.ctaSpan}</span>{t.ctaTitle2}
        </h2>
        <p className={styles.ctaSub}>{t.ctaSub}</p>
        <div className={styles.ctaBtns}>
          <button className={styles.ctaBtn1}>{t.ctaBtn1}</button>
          <button className={styles.ctaBtn2}>{t.ctaBtn2}</button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
