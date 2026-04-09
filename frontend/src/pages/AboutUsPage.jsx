import { useLang } from '../context/LanguageContext'
import PublicNavbar from '../components/PublicNavbar'
import Footer from '../components/Footer'
import styles from './AboutUsPage.module.css'

/* ══════════════════════════════════════
   CONTENT — English & Urdu translations
══════════════════════════════════════ */
const CONTENT = {
  EN: {
    heroTitle1: 'About ',
    heroSpan: 'Smart Bill',
    heroSub: 'Our mission to end electricity bill shock in Pakistan.',
    breadcrumb: ['Home', 'About Us'],

    missionTag: 'Our Story',
    missionTitle: 'Why We Built Smart Bill',
    missionText1: 'It started with a Rs. 35,000 electricity bill.',
    missionText2: 'Our founder Abdul Sattar received an electricity bill of Rs. 35,000 in summer 2024. He had no idea his AC and geyser alone were consuming that much power. There was no tool, no app, no website in Pakistan that could tell him in advance what his bill would be.',
    missionText3: 'That moment of shock became the spark for Smart Bill. A free app that helps every Pakistani household predict their electricity bill before it arrives — so nobody has to face that surprise again.',
    missionVisualTitle: 'Our Mission',
    missionVisualText: 'To make every Pakistani household aware of their electricity consumption and protect them from bill shock.',

    problemTag: 'The Problem',
    problemTitle: 'The Problem We Are Solving',
    problemSub: 'Millions of Pakistanis face these issues every month.',
    problems: [
      { title: 'Unpredictable Bills', desc: 'Families have no idea what their bill will be until it arrives. One extra appliance can push them into a higher slab, adding thousands to the bill.' },
      { title: 'No DISCO Tools', desc: 'No DISCO in Pakistan provides a tool for consumers to predict or estimate their upcoming bill. People are left in the dark.' },
      { title: 'Overbilling', desc: 'Many consumers suspect they are being overbilled but have no way to verify. Without tracking actual appliance usage, there is no way to compare.' },
    ],

    valuesTag: 'Our Values',
    valuesTitle: 'What We Stand For',
    values: [
      { icon: 'fa-gift', color: 'green', title: 'Free Forever', desc: 'Smart Bill will always be free. No premium plans. No hidden charges. Every feature available to everyone.' },
      { icon: 'fa-flag', color: 'navy', title: 'Pakistan First', desc: 'Built exclusively for Pakistan. All 12 DISCOs, NEPRA slab rates, and Urdu language support built in.' },
      { icon: 'fa-shield-halved', color: 'red', title: 'Privacy First', desc: 'Your data stays on your device. We do not sell your information. No tracking. No ads. Ever.' },
      { icon: 'fa-bolt', color: 'yellow', title: 'Simple & Fast', desc: 'Designed for everyone — from tech-savvy students to grandparents. Get your prediction in under 2 minutes.' },
    ],

    teamTag: 'Our Team',
    teamTitle: 'The People Behind Smart Bill',
    teamSub: 'A small team with a big mission.',
    team: [
      { name: 'Abdul Sattar', role: 'Founder & Developer', bio: 'BSIT student at AIR University Islamabad. Building Smart Bill to solve Pakistan\'s electricity bill problem.', isFounder: true },
      { name: 'Join Our Team', role: 'Frontend Developer', bio: 'We are looking for a passionate frontend developer to help build the future of Smart Bill.', isOpen: true },
      { name: 'Join Our Team', role: 'UI/UX Designer', bio: 'We need a creative designer who understands Pakistani users and wants to make a real impact.', isOpen: true },
    ],
    positionOpen: 'Position Open',

    statsTitle: 'Smart Bill in Numbers',
    stats: [
      { number: '12', label: 'DISCOs Supported' },
      { number: '100%', label: 'Free Forever' },
      { number: '2', label: 'Languages' },
      { number: '7', label: 'NEPRA Slabs' },
    ],

    ctaTitle1: 'Want to Be Part of',
    ctaSpan: ' the Mission',
    ctaTitle2: '?',
    ctaSub: 'Help us make electricity bills predictable for every Pakistani household.',
    ctaBtn1: 'Try Smart Bill Free',
    ctaBtn2: 'Contact Us',
  },
  UR: {
    heroTitle1: '',
    heroSpan: 'سمارٹ بل',
    heroSub: 'پاکستان میں بجلی بل کے جھٹکے ختم کرنے کا ہمارا مشن۔',
    breadcrumb: ['ہوم', 'ہمارے بارے میں'],

    missionTag: 'ہماری کہانی',
    missionTitle: 'ہم نے سمارٹ بل کیوں بنایا',
    missionText1: 'یہ Rs. 35,000 کے بجلی بل سے شروع ہوا۔',
    missionText2: 'ہمارے بانی عبدالستار کو ۲۰۲۴ کے موسم گرما میں Rs. 35,000 کا بجلی بل ملا۔ انہیں اندازہ نہیں تھا کہ صرف ان کا AC اور گیزر اتنی بجلی خرچ کر رہے ہیں۔ پاکستان میں کوئی ٹول، کوئی ایپ، کوئی ویب سائٹ نہیں تھی جو انہیں پہلے سے بتا سکے کہ ان کا بل کتنا آئے گا۔',
    missionText3: 'جھٹکے کا وہ لمحہ سمارٹ بل کی چنگاری بن گیا۔ ایک مفت ایپ جو ہر پاکستانی گھرانے کو ان کا بجلی بل آنے سے پہلے بتاتی ہے — تاکہ کسی کو دوبارہ یہ حیرانی نہ ہو۔',
    missionVisualTitle: 'ہمارا مشن',
    missionVisualText: 'ہر پاکستانی گھرانے کو ان کی بجلی کی کھپت سے آگاہ کرنا اور بل کے جھٹکے سے بچانا۔',

    problemTag: 'مسئلہ',
    problemTitle: 'ہم کون سا مسئلہ حل کر رہے ہیں',
    problemSub: 'لاکھوں پاکستانی ہر مہینے ان مسائل کا سامنا کرتے ہیں۔',
    problems: [
      { title: 'غیر متوقع بل', desc: 'خاندانوں کو اندازہ نہیں ہوتا کہ ان کا بل کتنا آئے گا جب تک وہ آ نہیں جاتا۔ ایک اضافی آلہ انہیں اونچے سلیب میں دھکیل سکتا ہے، جس سے بل میں ہزاروں کا اضافہ ہو جاتا ہے۔' },
      { title: 'DISCO ٹولز نہیں', desc: 'پاکستان کا کوئی DISCO صارفین کو اپنے آنے والے بل کا اندازہ لگانے کے لیے کوئی ٹول فراہم نہیں کرتا۔ لوگ اندھیرے میں رہتے ہیں۔' },
      { title: 'زیادہ بلنگ', desc: 'بہت سے صارفین کو شبہ ہے کہ ان سے زیادہ وصول کیا جا رہا ہے لیکن تصدیق کا کوئی طریقہ نہیں۔ آلات کے اصل استعمال کو ٹریک کیے بغیر موازنہ ممکن نہیں۔' },
    ],

    valuesTag: 'ہماری اقدار',
    valuesTitle: 'ہم کس چیز کے لیے کھڑے ہیں',
    values: [
      { icon: 'fa-gift', color: 'green', title: 'ہمیشہ مفت', desc: 'سمارٹ بل ہمیشہ مفت رہے گا۔ کوئی پریمیم پلان نہیں۔ کوئی چھپے ہوئے چارجز نہیں۔ ہر خصوصیت سب کے لیے دستیاب۔' },
      { icon: 'fa-flag', color: 'navy', title: 'پاکستان فرسٹ', desc: 'خاص طور پر پاکستان کے لیے بنایا گیا۔ تمام ۱۲ DISCOs، NEPRA سلیب ریٹس، اور اردو زبان سپورٹ شامل۔' },
      { icon: 'fa-shield-halved', color: 'red', title: 'پرائیویسی فرسٹ', desc: 'آپ کا ڈیٹا آپ کے ڈیوائس پر رہتا ہے۔ ہم آپ کی معلومات فروخت نہیں کرتے۔ کوئی ٹریکنگ نہیں۔ کوئی اشتہارات نہیں۔' },
      { icon: 'fa-bolt', color: 'yellow', title: 'سادہ اور تیز', desc: 'سب کے لیے ڈیزائن کیا گیا — ٹیک سیوی طلباء سے لے کر دادا دادی تک۔ ۲ منٹ سے کم میں اپنی پیش گوئی حاصل کریں۔' },
    ],

    teamTag: 'ہماری ٹیم',
    teamTitle: 'سمارٹ بل کے پیچھے لوگ',
    teamSub: 'ایک چھوٹی ٹیم بڑے مشن کے ساتھ۔',
    team: [
      { name: 'عبدالستار', role: 'بانی اور ڈیولپر', bio: 'AIR یونیورسٹی اسلام آباد میں BSIT طالب علم۔ پاکستان کے بجلی بل کے مسئلے کو حل کرنے کے لیے سمارٹ بل بنا رہے ہیں۔', isFounder: true },
      { name: 'ہماری ٹیم میں شامل ہوں', role: 'فرنٹ اینڈ ڈیولپر', bio: 'ہم ایک پرجوش فرنٹ اینڈ ڈیولپر کی تلاش میں ہیں جو سمارٹ بل کا مستقبل بنانے میں مدد کرے۔', isOpen: true },
      { name: 'ہماری ٹیم میں شامل ہوں', role: 'UI/UX ڈیزائنر', bio: 'ہمیں ایک تخلیقی ڈیزائنر کی ضرورت ہے جو پاکستانی صارفین کو سمجھے اور حقیقی اثر ڈالنا چاہے۔', isOpen: true },
    ],
    positionOpen: 'عہدہ خالی',

    statsTitle: 'سمارٹ بل اعداد میں',
    stats: [
      { number: '۱۲', label: 'DISCOs سپورٹ' },
      { number: '۱۰۰٪', label: 'ہمیشہ مفت' },
      { number: '۲', label: 'زبانیں' },
      { number: '۷', label: 'NEPRA سلیبز' },
    ],

    ctaTitle1: 'اس مشن کا حصہ',
    ctaSpan: ' بننا',
    ctaTitle2: ' چاہتے ہیں؟',
    ctaSub: 'ہر پاکستانی گھرانے کے لیے بجلی بل قابل پیش گوئی بنانے میں ہماری مدد کریں۔',
    ctaBtn1: 'سمارٹ بل مفت آزمائیں',
    ctaBtn2: 'ہم سے رابطہ کریں',
  },
}

export default function AboutUsPage() {
  const { lang, isUrdu } = useLang()
  const t = CONTENT[lang] || CONTENT.EN

  const colorMap = {
    green: 'var(--green)',
    navy: 'var(--navy)',
    red: 'var(--red)',
    yellow: 'var(--yellow)',
  }

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
            {t.heroTitle1}<span>{t.heroSpan}</span>
          </h1>
          <p className={styles.heroSub}>{t.heroSub}</p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className={styles.mission}>
        <span className={styles.tag}>{t.missionTag}</span>
        <h2 className={styles.sectionTitle}>{t.missionTitle}</h2>
        <div className={styles.missionGrid}>
          <div className={styles.missionText}>
            <p className={styles.missionHighlight}>{t.missionText1}</p>
            <p>{t.missionText2}</p>
            <p>{t.missionText3}</p>
          </div>
          <div className={styles.missionVisual}>
            <div className={styles.missionIcon}>
              <i className="fa-solid fa-bolt" />
            </div>
            <h3>{t.missionVisualTitle}</h3>
            <p>{t.missionVisualText}</p>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className={styles.problem}>
        <span className={styles.tag}>{t.problemTag}</span>
        <h2 className={styles.sectionTitle}>{t.problemTitle}</h2>
        <p className={styles.sectionSub}>{t.problemSub}</p>
        <div className={styles.problemGrid}>
          {t.problems.map((p, i) => (
            <div key={i} className={styles.problemCard}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className={styles.values}>
        <span className={styles.tag}>{t.valuesTag}</span>
        <h2 className={styles.sectionTitle}>{t.valuesTitle}</h2>
        <div className={styles.valuesGrid}>
          {t.values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: colorMap[v.color] }}>
                <i className={`fa-solid ${v.icon}`} />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className={styles.team}>
        <span className={styles.tag}>{t.teamTag}</span>
        <h2 className={styles.sectionTitle}>{t.teamTitle}</h2>
        <p className={styles.sectionSub}>{t.teamSub}</p>
        <div className={styles.teamGrid}>
          {t.team.map((m, i) => (
            <div key={i} className={`${styles.teamCard} ${m.isFounder ? styles.founderCard : ''}`}>
              <div className={`${styles.avatar} ${m.isOpen ? styles.avatarOpen : ''}`}>
                {m.isFounder
                  ? <span>AS</span>
                  : <i className="fa-solid fa-user-plus" />
                }
              </div>
              {m.isOpen && <span className={styles.openBadge}>{t.positionOpen}</span>}
              <h3>{m.name}</h3>
              <span className={styles.teamRole}>{m.role}</span>
              <p>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className={styles.statsBanner}>
        <h2 className={styles.statsTitle}>{t.statsTitle}</h2>
        <div className={styles.statsGrid}>
          {t.stats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statNum}>{s.number}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
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
