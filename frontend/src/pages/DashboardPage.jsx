import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isUrdu } = useLang()
  const [loading, setLoading] = useState(true)

  // Real user info from auth
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const disco = user?.user_metadata?.disco || 'IESCO'
  const city = user?.user_metadata?.city || (isUrdu ? 'اسلام آباد' : 'Islamabad')

  // Static general tips
  const tips = [
    {
      icon: 'fa-snowflake',
      color: '#1a2a6c',
      bg: '#E8EAF6',
      text: isUrdu
        ? 'اپنا AC 26°C پر رکھیں — ہر ڈگری پر 6% توانائی بچتی ہے'
        : 'Set your AC to 26°C — saves 6% energy per degree'
    },
    {
      icon: 'fa-clock',
      color: '#b8860b',
      bg: '#FFFDE7',
      text: isUrdu
        ? 'پیک اوقات (شام 7 تا رات 11) میں بھاری آلات چلانے سے گریز کریں'
        : 'Avoid running heavy appliances during peak hours (7PM-11PM)'
    },
    {
      icon: 'fa-lightbulb',
      color: '#2E7D32',
      bg: '#E8F5E9',
      text: isUrdu
        ? 'LED بلب لگائیں — ماہانہ Rs. 400 تک بچائیں'
        : 'Switch to LED bulbs — save up to Rs. 400/month'
    },
  ]

  // Simulate brief loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Sidebar>
      <div className={styles.page}>
        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div>
            {loading
              ? <div className={`skeleton ${styles.skH}`}></div>
              : <>
                  <h1 className={styles.greeting}>
                    {isUrdu ? `خوش آمدید، ${userName}! 👋` : `Welcome, ${userName}! 👋`}
                  </h1>
                  <p className={styles.subGreeting}>{disco} · {city}</p>
                </>
            }
          </div>
          {!loading && (
            <div className={styles.headerRight}>
              <button className="btn-primary" onClick={() => navigate('/bill-history')}>
                <i className="fa-solid fa-plus"></i> {isUrdu ? 'بل شامل کریں' : 'Add Bill'}
              </button>
            </div>
          )}
        </div>

        {/* ── TOP CARDS ── */}
        <div className={styles.topCards}>
          {/* Predicted Bill — BIG CARD (Empty State) */}
          <div className={styles.predictCard}>
            {loading
              ? <><div className={`skeleton ${styles.skPredTitle}`}></div><div className={`skeleton ${styles.skPredAmt}`}></div></>
              : <>
                  <div className={styles.predictTop}>
                    <div>
                      <div className={styles.predictLabel}>
                        <i className="fa-solid fa-brain"></i>
                        {isUrdu ? 'AI پیشگوئی' : 'AI Prediction'}
                      </div>
                      <div className={styles.predictDisco}>{disco}</div>
                    </div>
                    <span className={`badge badge-green`}>
                      <i className="fa-solid fa-hourglass-half"></i> {isUrdu ? 'زیر التوا' : 'Pending'}
                    </span>
                  </div>
                  <div className={styles.predictAmount} style={{color: '#999', fontSize: '1.5rem'}}>
                    {isUrdu ? 'ابھی کوئی پیشگوئی نہیں' : 'No Prediction Yet'}
                  </div>
                  <div className={styles.predictUnits} style={{color: '#888', marginTop: 8}}>
                    {isUrdu
                      ? 'اپنی پہلی AI پیشگوئی حاصل کرنے کے لیے کم از کم 2-3 بل شامل کریں'
                      : 'Add at least 2-3 bills to get your first AI prediction'}
                  </div>
                  <button
                    className="btn-primary"
                    style={{marginTop: 16, width: '100%'}}
                    onClick={() => navigate('/bill-history')}
                  >
                    <i className="fa-solid fa-plus"></i>{' '}
                    {isUrdu ? 'اپنا پہلا بل شامل کریں →' : 'Add Your First Bill →'}
                  </button>
                </>
            }
          </div>

          {/* Right side mini cards */}
          <div className={styles.miniCards}>
            {/* Last Bill — Empty */}
            <div className={`${styles.miniCard} card`}>
              {loading
                ? <div className={`skeleton ${styles.skMini}`}></div>
                : <>
                    <div className={styles.miniIcon} style={{background:'#E8EAF6',color:'var(--navy)'}}>
                      <i className="fa-solid fa-file-invoice"></i>
                    </div>
                    <div className={styles.miniLabel}>{isUrdu ? 'پچھلے مہینے کا بل' : 'Last Month Bill'}</div>
                    <div className={styles.miniValue} style={{color: '#999'}}>--</div>
                    <div className={styles.miniSub}>{isUrdu ? 'ابھی کوئی ڈیٹا نہیں' : 'No data yet'}</div>
                  </>
              }
            </div>

            {/* Budget — Empty */}
            <div className={`${styles.miniCard} card`}>
              {loading
                ? <div className={`skeleton ${styles.skMini}`}></div>
                : <>
                    <div className={styles.miniIcon} style={{background:'#E8F5E9',color:'var(--green)'}}>
                      <i className="fa-solid fa-piggy-bank"></i>
                    </div>
                    <div className={styles.miniLabel}>{isUrdu ? 'ماہانہ بجٹ' : 'Monthly Budget'}</div>
                    <div className={styles.miniValue} style={{color: '#999'}}>--</div>
                    <div className={styles.miniSub}>
                      <button
                        onClick={() => navigate('/savings-goals')}
                        style={{background:'none',border:'none',color:'var(--navy)',cursor:'pointer',padding:0,fontSize:'inherit',textDecoration:'underline'}}
                      >
                        {isUrdu ? 'بجٹ مقرر کریں →' : 'Set Budget →'}
                      </button>
                    </div>
                  </>
              }
            </div>

            {/* Total Saved — Empty */}
            <div className={`${styles.miniCard} card`}>
              {loading
                ? <div className={`skeleton ${styles.skMini}`}></div>
                : <>
                    <div className={styles.miniIcon} style={{background:'#FFFDE7',color:'#b8860b'}}>
                      <i className="fa-solid fa-trophy"></i>
                    </div>
                    <div className={styles.miniLabel}>{isUrdu ? 'اس ماہ کی بچت' : 'Saved This Month'}</div>
                    <div className={styles.miniValue} style={{color: '#999'}}>--</div>
                    <div className={styles.miniSub}>{isUrdu ? 'ابھی کوئی ڈیٹا نہیں' : 'No data yet'}</div>
                  </>
              }
            </div>
          </div>
        </div>

        {/* ── CHART + APPLIANCES ── */}
        <div className={styles.midRow}>
          {/* Bill History — Empty State */}
          <div className={`${styles.chartCard} card`}>
            <div className={styles.cardHeader}>
              <h2><i className="fa-solid fa-chart-bar"></i> {isUrdu ? 'بل کی تاریخ' : 'Bill History'}</h2>
              <button className={styles.viewAll} onClick={() => navigate('/bill-history')}>
                {isUrdu ? 'سب دیکھیں' : 'View All'} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            {loading
              ? <div className={`skeleton ${styles.skChart}`}></div>
              : <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>
                  <i className="fa-solid fa-chart-bar" style={{fontSize:'2.5rem',marginBottom:12,display:'block',color:'#ccc'}}></i>
                  <p style={{marginBottom:16}}>
                    {isUrdu
                      ? 'ابھی تک کوئی بل نہیں۔ رجحانات دیکھنے کے لیے اپنا پہلا بل شامل کریں۔'
                      : 'No bill history yet. Add your first bill to see trends.'}
                  </p>
                  <button className="btn-primary" onClick={() => navigate('/bill-history')}>
                    <i className="fa-solid fa-plus"></i> {isUrdu ? 'بل شامل کریں' : 'Add Bill'}
                  </button>
                </div>
            }
          </div>

          {/* Appliance Breakdown — Empty State */}
          <div className={`${styles.appCard} card`}>
            <div className={styles.cardHeader}>
              <h2><i className="fa-solid fa-plug"></i> {isUrdu ? 'آلات کی لاگت' : 'Appliance Cost'}</h2>
              <button className={styles.viewAll} onClick={() => navigate('/appliances')}>
                {isUrdu ? 'انتظام' : 'Manage'} <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            {loading
              ? <div className={`skeleton ${styles.skChart}`}></div>
              : <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>
                  <i className="fa-solid fa-plug" style={{fontSize:'2.5rem',marginBottom:12,display:'block',color:'#ccc'}}></i>
                  <p style={{marginBottom:16}}>
                    {isUrdu
                      ? 'ابھی تک کوئی آلات ٹریک نہیں ہوئے۔'
                      : 'No appliances tracked yet.'}
                  </p>
                  <button className="btn-primary" onClick={() => navigate('/appliances')}>
                    <i className="fa-solid fa-plus"></i> {isUrdu ? 'آلات شامل کریں →' : 'Add Appliances →'}
                  </button>
                </div>
            }
          </div>
        </div>

        {/* ── TIPS ── */}
        <div className={`${styles.tipsSection} card`}>
          <div className={styles.cardHeader}>
            <h2><i className="fa-solid fa-lightbulb"></i> {isUrdu ? 'بجلی بچانے کی تجاویز' : 'Energy Saving Tips'}</h2>
          </div>
          {loading
            ? <div className={`skeleton ${styles.skChart}`}></div>
            : <div className={styles.tipsGrid}>
                {tips.map((tip, i) => (
                  <div key={i} className={styles.tipCard}>
                    <div className={styles.tipIcon} style={{background: tip.bg, color: tip.color}}>
                      <i className={`fa-solid ${tip.icon}`}></i>
                    </div>
                    <p>{tip.text}</p>
                  </div>
                ))}
              </div>
          }
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className={styles.quickActions}>
          {[
            { icon: 'fa-camera',       label: isUrdu ? 'بل اسکین کریں' : 'Scan Bill',        path: '/bill-history',    color: '#1a2a6c', bg: '#E8EAF6' },
            { icon: 'fa-calculator',   label: isUrdu ? 'سلیب کیلکولیٹر' : 'Slab Calculator',  path: '/slab-calculator', color: '#b8860b', bg: '#FFFDE7' },
            { icon: 'fa-plug',         label: isUrdu ? 'میرے آلات' : 'My Appliances',    path: '/appliances',      color: '#2E7D32', bg: '#E8F5E9' },
            { icon: 'fa-piggy-bank',   label: isUrdu ? 'بچت کے اہداف' : 'Savings Goals',    path: '/savings-goals',   color: '#6A1B9A', bg: '#F3E5F5' },
          ].map(a => (
            <button key={a.label} className={styles.quickBtn} onClick={() => navigate(a.path)}>
              <div className={styles.quickIcon} style={{background: a.bg, color: a.color}}>
                <i className={`fa-solid ${a.icon}`}></i>
              </div>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
