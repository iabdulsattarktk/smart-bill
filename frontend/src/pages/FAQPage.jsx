import { useState, useMemo } from 'react'
import { useLang } from '../context/LanguageContext'
import PublicNavbar from '../components/PublicNavbar'
import Footer from '../components/Footer'
import styles from './FAQPage.module.css'

/* ══════════════════════════════════════
   CONTENT — English & Urdu translations
══════════════════════════════════════ */
const CATEGORIES = {
  EN: [
    { key: 'all', label: 'All Questions' },
    { key: 'general', label: 'General' },
    { key: 'bill', label: 'Bill & Prediction' },
    { key: 'appliances', label: 'Appliances' },
    { key: 'account', label: 'Account' },
    { key: 'technical', label: 'Technical' },
  ],
  UR: [
    { key: 'all', label: 'تمام سوالات' },
    { key: 'general', label: 'عمومی' },
    { key: 'bill', label: 'بل اور پیش گوئی' },
    { key: 'appliances', label: 'آلات' },
    { key: 'account', label: 'اکاؤنٹ' },
    { key: 'technical', label: 'ٹیکنیکل' },
  ],
}

const FAQ_SECTIONS = {
  EN: [
    {
      key: 'general',
      title: 'General',
      icon: 'fa-solid fa-circle-info',
      color: 'navy',
      items: [
        { q: 'Is Smart Bill completely free?', a: 'Yes, Smart Bill is 100% free. All features including bill prediction, appliance tracking, slab alerts, and AI insights are completely free. There is no subscription, no hidden charges, and no premium tier.' },
        { q: 'Which DISCOs does Smart Bill support?', a: 'Smart Bill supports all 12 electricity distribution companies in Pakistan: LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, K-Electric, and CPPA-G.' },
        { q: 'Is Smart Bill available in Urdu?', a: 'Yes! Smart Bill is fully available in both English and Urdu. You can switch languages anytime from the app settings or navbar.' },
        { q: 'Does Smart Bill work without internet?', a: 'Yes, basic features like viewing saved bills and appliance data work offline. However, AI predictions and bill fetching require an active internet connection.' },
      ],
    },
    {
      key: 'bill',
      title: 'Bill & Prediction',
      icon: 'fa-solid fa-chart-line',
      color: 'gold',
      items: [
        { q: 'How accurate is the bill prediction?', a: 'Smart Bill achieves up to 92% accuracy when sufficient data is provided. The more past bills and appliance details you enter, the more accurate your predictions become.' },
        { q: 'What data does AI use to predict my bill?', a: 'Our AI analyzes your past bills, registered appliances and their usage hours, weather patterns, seasonal trends, and current NEPRA slab rates to generate your prediction.' },
        { q: 'Can Smart Bill fetch my bill automatically?', a: 'Yes! Simply enter your meter number or consumer number, and Smart Bill can automatically fetch your latest bill from your DISCO.' },
      ],
    },
    {
      key: 'appliances',
      title: 'Appliances',
      icon: 'fa-solid fa-plug',
      color: 'green',
      items: [
        { q: 'Which appliances can I track?', a: 'You can track all common household appliances including AC, refrigerator, fans, geysers, washing machines, LED/tube lights, water pumps, iron, microwave, TV, computer, and more.' },
        { q: 'Does inverter vs non-inverter matter?', a: 'Yes, absolutely! Inverter appliances (especially ACs and refrigerators) consume significantly less electricity. Smart Bill accounts for this difference and shows you the savings comparison.' },
      ],
    },
    {
      key: 'account',
      title: 'Account',
      icon: 'fa-solid fa-user-shield',
      color: 'red',
      items: [
        { q: 'Is my data safe?', a: 'Your data is encrypted and stored securely. We never sell your information to third parties. You can view, export, or delete your data at any time from Settings.' },
        { q: 'Can I delete my account?', a: 'Yes, you can permanently delete your account and all associated data from the Settings page. This action is irreversible.' },
      ],
    },
  ],
  UR: [
    {
      key: 'general',
      title: 'عمومی',
      icon: 'fa-solid fa-circle-info',
      color: 'navy',
      items: [
        { q: 'کیا سمارٹ بل مکمل طور پر مفت ہے؟', a: 'جی ہاں، سمارٹ بل ۱۰۰٪ مفت ہے۔ بل کی پیش گوئی، آلات ٹریکنگ، سلیب الرٹس، اور AI بصیرتیں سمیت تمام خصوصیات مکمل طور پر مفت ہیں۔ کوئی سبسکرپشن نہیں، کوئی چھپے ہوئے چارجز نہیں۔' },
        { q: 'سمارٹ بل کون سے DISCOs سپورٹ کرتا ہے؟', a: 'سمارٹ بل پاکستان کی تمام ۱۲ بجلی تقسیم کار کمپنیوں کو سپورٹ کرتا ہے: LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, K-Electric, اور CPPA-G۔' },
        { q: 'کیا سمارٹ بل اردو میں دستیاب ہے؟', a: 'جی ہاں! سمارٹ بل مکمل طور پر انگریزی اور اردو دونوں میں دستیاب ہے۔ آپ کسی بھی وقت ایپ سیٹنگز یا نیو بار سے زبان تبدیل کر سکتے ہیں۔' },
        { q: 'کیا سمارٹ بل انٹرنیٹ کے بغیر کام کرتا ہے؟', a: 'جی ہاں، بنیادی خصوصیات جیسے محفوظ شدہ بل اور آلات کا ڈیٹا آف لائن کام کرتا ہے۔ تاہم، AI پیش گوئیوں اور بل حاصل کرنے کے لیے انٹرنیٹ کنکشن ضروری ہے۔' },
      ],
    },
    {
      key: 'bill',
      title: 'بل اور پیش گوئی',
      icon: 'fa-solid fa-chart-line',
      color: 'gold',
      items: [
        { q: 'بل کی پیش گوئی کتنی درست ہے؟', a: 'سمارٹ بل کافی ڈیٹا فراہم کرنے پر ۹۲٪ تک درستگی حاصل کرتا ہے۔ جتنے زیادہ پچھلے بل اور آلات کی تفصیلات آپ درج کریں گے، پیش گوئیاں اتنی ہی درست ہوں گی۔' },
        { q: 'AI بل کی پیش گوئی کے لیے کون سا ڈیٹا استعمال کرتا ہے؟', a: 'ہمارا AI آپ کے پچھلے بلز، رجسٹرڈ آلات اور ان کے استعمال کے اوقات، موسمی پیٹرن، موسمی رجحانات، اور موجودہ NEPRA سلیب ریٹس کا تجزیہ کرتا ہے۔' },
        { q: 'کیا سمارٹ بل خود بخود میرا بل لا سکتا ہے؟', a: 'جی ہاں! بس اپنا میٹر نمبر یا کنزیومر نمبر درج کریں، اور سمارٹ بل خود بخود آپ کے DISCO سے تازہ ترین بل حاصل کر لے گا۔' },
      ],
    },
    {
      key: 'appliances',
      title: 'آلات',
      icon: 'fa-solid fa-plug',
      color: 'green',
      items: [
        { q: 'میں کون سے آلات ٹریک کر سکتا ہوں؟', a: 'آپ گھریلو استعمال کے تمام عام آلات ٹریک کر سکتے ہیں بشمول AC، فریج، پنکھے، گیزر، واشنگ مشین، LED/ٹیوب لائٹس، واٹر پمپ، استری، مائیکروویو، ٹی وی، کمپیوٹر وغیرہ۔' },
        { q: 'کیا انورٹر بمقابلہ نان انورٹر سے فرق پڑتا ہے؟', a: 'جی ہاں، بالکل! انورٹر آلات (خاص طور پر ACs اور فریج) نمایاں طور پر کم بجلی خرچ کرتے ہیں۔ سمارٹ بل اس فرق کو مدنظر رکھتا ہے اور آپ کو بچت کا موازنہ دکھاتا ہے۔' },
      ],
    },
    {
      key: 'account',
      title: 'اکاؤنٹ',
      icon: 'fa-solid fa-user-shield',
      color: 'red',
      items: [
        { q: 'کیا میرا ڈیٹا محفوظ ہے؟', a: 'آپ کا ڈیٹا انکرپٹڈ اور محفوظ طریقے سے محفوظ ہے۔ ہم آپ کی معلومات کبھی تیسرے فریق کو نہیں بیچتے۔ آپ کسی بھی وقت سیٹنگز سے اپنا ڈیٹا دیکھ، ایکسپورٹ، یا حذف کر سکتے ہیں۔' },
        { q: 'کیا میں اپنا اکاؤنٹ حذف کر سکتا ہوں؟', a: 'جی ہاں، آپ سیٹنگز پیج سے اپنا اکاؤنٹ اور تمام متعلقہ ڈیٹا مستقل طور پر حذف کر سکتے ہیں۔ یہ عمل ناقابل واپسی ہے۔' },
      ],
    },
  ],
}

const CONTENT = {
  EN: {
    heroTitle1: 'Frequently Asked',
    heroSpan: 'Questions',
    heroSub: 'Find answers to the most common questions about Smart Bill.',
    searchPlaceholder: 'Search questions...',
    stillTitle: 'Still Need Help?',
    helpCards: [
      { icon: 'fa-solid fa-envelope', title: 'Email Us', desc: 'smartbillpk@gmail.com', link: 'mailto:smartbillpk@gmail.com' },
      { icon: 'fa-brands fa-whatsapp', title: 'WhatsApp', desc: 'Coming Soon', link: '#' },
      { icon: 'fa-solid fa-magnifying-glass', title: 'Search FAQs', desc: 'Use the search bar above', link: '#' },
    ],
  },
  UR: {
    heroTitle1: 'اکثر پوچھے جانے والے',
    heroSpan: 'سوالات',
    heroSub: 'سمارٹ بل کے بارے میں عام سوالات کے جوابات یہاں ملیں۔',
    searchPlaceholder: 'سوالات تلاش کریں...',
    stillTitle: 'ابھی بھی مدد چاہیے؟',
    helpCards: [
      { icon: 'fa-solid fa-envelope', title: 'ای میل کریں', desc: 'smartbillpk@gmail.com', link: 'mailto:smartbillpk@gmail.com' },
      { icon: 'fa-brands fa-whatsapp', title: 'واٹس ایپ', desc: 'جلد آ رہا ہے', link: '#' },
      { icon: 'fa-solid fa-magnifying-glass', title: 'FAQ تلاش کریں', desc: 'اوپر سرچ بار استعمال کریں', link: '#' },
    ],
  },
}

export default function FAQPage() {
  const { lang, isUrdu } = useLang()
  const t = CONTENT[lang] || CONTENT.EN
  const cats = CATEGORIES[lang] || CATEGORIES.EN
  const sections = FAQ_SECTIONS[lang] || FAQ_SECTIONS.EN

  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [openItems, setOpenItems] = useState({}) // key: "sectionIdx-itemIdx"

  function toggleItem(key) {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredSections = useMemo(() => {
    const q = search.toLowerCase().trim()
    return sections
      .filter(sec => activeCategory === 'all' || sec.key === activeCategory)
      .map(sec => ({
        ...sec,
        items: q
          ? sec.items.filter(item =>
              item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
            )
          : sec.items,
      }))
      .filter(sec => sec.items.length > 0)
  }, [sections, activeCategory, search])

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
        </div>
      </section>

      {/* ══ SEARCH ══ */}
      <section className={styles.searchSection}>
        <div className={styles.searchBox}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ══ CATEGORY TABS ══ */}
      <section className={styles.tabsSection}>
        <div className={styles.tabs}>
          {cats.map(cat => (
            <button
              key={cat.key}
              className={`${styles.tab} ${activeCategory === cat.key ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ══ FAQ ACCORDION ══ */}
      <section className={styles.faqSection}>
        {filteredSections.map((sec, si) => (
          <div key={sec.key} className={styles.faqBlock}>
            <div className={styles.sectionHeader}>
              <span className={`${styles.sectionIcon} ${styles[sec.color]}`}>
                <i className={sec.icon}></i>
              </span>
              <h2 className={styles.sectionTitle}>{sec.title}</h2>
            </div>

            <div className={styles.accordion}>
              {sec.items.map((item, ii) => {
                const key = `${si}-${ii}`
                const isOpen = !!openItems[key]
                return (
                  <div key={ii} className={`${styles.accItem} ${isOpen ? styles.accOpen : ''}`}>
                    <button
                      className={styles.accQuestion}
                      onClick={() => toggleItem(key)}
                      type="button"
                    >
                      <span>{item.q}</span>
                      <i className={`fa-solid fa-chevron-down ${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}></i>
                    </button>
                    {isOpen && (
                      <div className={styles.accAnswer}>
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ══ STILL NEED HELP ══ */}
      <section className={styles.helpSection}>
        <h2 className={styles.helpTitle}>{t.stillTitle}</h2>
        <div className={styles.helpGrid}>
          {t.helpCards.map((card, i) => (
            <a key={i} href={card.link} className={styles.helpCard}>
              <div className={styles.helpIcon}>
                <i className={card.icon}></i>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
