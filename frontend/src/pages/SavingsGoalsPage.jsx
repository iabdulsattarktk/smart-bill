import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useLang } from '../context/LanguageContext'
import styles from './SavingsGoalsPage.module.css'

const TIPS = [
  { icon: 'fa-snowflake', title: 'AC Smart Usage',       tip: 'Set AC to 26°C instead of 18°C. Every 1°C increase saves ~6% energy.', save: 'Save Rs. 400-800/month' },
  { icon: 'fa-clock',     title: 'Avoid Peak Hours',     tip: 'Avoid heavy appliances during 7PM-11PM. Use washing machine in morning.', save: 'Save Rs. 200-500/month' },
  { icon: 'fa-lightbulb', title: 'Switch to LED',        tip: 'Replace tube lights and old bulbs with LED. 80% less electricity for same light.', save: 'Save Rs. 300-600/month' },
  { icon: 'fa-fire',      title: 'Geyser Timer',         tip: 'Only run geyser 30 minutes before bathing. Never keep it on all day.', save: 'Save Rs. 500-1000/month' },
]

export default function SavingsGoalsPage() {
  const { isUrdu } = useLang()
  const [goals, setGoals] = useState([])

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1><i className="fa-solid fa-piggy-bank"></i> {isUrdu ? 'بچت کے اہداف' : 'Savings Goals'}</h1>
            <p>{isUrdu ? 'بجلی کا بجٹ مقرر کریں اور ہر ماہ اپنا بل کم کرنے کی پیشرفت دیکھیں۔' : 'Set electricity budgets and track your progress to reduce your bill every month.'}</p>
          </div>
          <button className="btn-primary">
            <i className="fa-solid fa-plus"></i> {isUrdu ? 'نیا ہدف' : 'New Goal'}
          </button>
        </div>

        {/* Goals */}
        <div className={styles.goalsGrid}>
          {goals.map(g => {
            const pct = Math.min(Math.round((g.current / g.target) * 100), 100)
            const onTrack = pct <= 85
            return (
              <div key={g.id} className={`${styles.goalCard} card`}>
                <div className={styles.goalTop}>
                  <div className={styles.goalIcon} style={{background: g.bg, color: g.color}}>
                    <i className={`fa-solid ${g.icon}`}></i>
                  </div>
                  <div className={styles.goalTitle}>{g.title}</div>
                  <span className={`badge ${onTrack ? 'badge-green' : 'badge-red'}`}>
                    {onTrack ? 'On Track' : 'Over Budget'}
                  </span>
                </div>

                <div className={styles.goalAmounts}>
                  <div>
                    <div className={styles.goalCurrentLabel}>Current</div>
                    <div className={styles.goalCurrentValue}>{g.unit} {g.current.toLocaleString()}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className={styles.goalCurrentLabel}>Target</div>
                    <div className={styles.goalCurrentValue}>{g.unit} {g.target.toLocaleString()}</div>
                  </div>
                </div>

                <div className={styles.progressWrap}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${pct}%`,
                        background: pct > 85 ? 'var(--red)' : 'var(--green)'
                      }}
                    ></div>
                  </div>
                  <div className={styles.pctLabel}>{pct}%</div>
                </div>

                <div className={styles.goalFooter}>
                  {onTrack
                    ? <span className={styles.goodMsg}><i className="fa-solid fa-circle-check"></i> Great! You are under your target.</span>
                    : <span className={styles.warnMsg}><i className="fa-solid fa-triangle-exclamation"></i> Reduce usage to stay on target.</span>
                  }
                </div>
              </div>
            )
          })}

          {/* Add goal card */}
          <div className={styles.addGoalCard}>
            <i className="fa-solid fa-plus"></i>
            <span>{isUrdu ? 'نیا ہدف مقرر کریں' : 'Set New Goal'}</span>
          </div>
        </div>

        {/* Empty state for goals */}
        {goals.length === 0 && (
          <div style={{textAlign:'center', padding:'48px 20px', color:'#888'}}>
            <i className="fa-solid fa-piggy-bank" style={{fontSize:56, marginBottom:16, display:'block', opacity:0.25}}></i>
            <p style={{fontSize:17, fontWeight:600, margin:'0 0 8px', color:'#555'}}>
              {isUrdu ? 'ابھی تک کوئی بچت کا ہدف مقرر نہیں کیا گیا۔' : 'No savings goals set yet.'}
            </p>
            <p style={{fontSize:14, margin:0, maxWidth:420, marginInline:'auto', lineHeight:1.6}}>
              {isUrdu
                ? 'اپنے بجلی کے خرچ کو ٹریک کرنے کے لیے ماہانہ بجٹ یا یونٹ کا ہدف مقرر کریں۔'
                : 'Set a monthly budget or unit target to track your electricity spending.'}
            </p>
          </div>
        )}

        {/* Savings tips */}
        <div className="card">
          <h2 className={styles.sectionTitle}><i className="fa-solid fa-lightbulb"></i> {isUrdu ? 'بل کم کرنے کے طریقے' : 'How to Save on Your Bill'}</h2>
          <div className={styles.tipsGrid}>
            {TIPS.map(t => (
              <div key={t.title} className={styles.tipCard}>
                <div className={styles.tipIcon}><i className={`fa-solid ${t.icon}`}></i></div>
                <h3>{t.title}</h3>
                <p>{t.tip}</p>
                <div className={styles.saveAmount}><i className="fa-solid fa-piggy-bank"></i> {t.save}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
