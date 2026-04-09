import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import styles from './SavingsGoalsPage.module.css'

const DEMO_GOALS = [
  { id: 1, title: 'Monthly Bill Budget', target: 6000, current: 4957, unit: 'Rs.', icon: 'fa-piggy-bank', color: '#2E7D32', bg: '#E8F5E9' },
  { id: 2, title: 'Reduce Units by 10%', target: 350, current: 310, unit: 'kWh', icon: 'fa-bolt', color: '#1a2a6c', bg: '#E8EAF6' },
  { id: 3, title: 'Summer Savings Goal', target: 5000, current: 2100, unit: 'Rs.', icon: 'fa-sun', color: '#b8860b', bg: '#FFFDE7' },
]

const TIPS = [
  { icon: 'fa-snowflake', title: 'AC Smart Usage',       tip: 'Set AC to 26°C instead of 18°C. Every 1°C increase saves ~6% energy.', save: 'Save Rs. 400–800/month' },
  { icon: 'fa-clock',     title: 'Avoid Peak Hours',     tip: 'Avoid heavy appliances during 7PM–11PM. Use washing machine in morning.', save: 'Save Rs. 200–500/month' },
  { icon: 'fa-lightbulb', title: 'Switch to LED',        tip: 'Replace tube lights and old bulbs with LED. 80% less electricity for same light.', save: 'Save Rs. 300–600/month' },
  { icon: 'fa-fire',      title: 'Geyser Timer',         tip: 'Only run geyser 30 minutes before bathing. Never keep it on all day.', save: 'Save Rs. 500–1000/month' },
]

export default function SavingsGoalsPage() {
  const [goals] = useState(DEMO_GOALS)

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1><i className="fa-solid fa-piggy-bank"></i> Savings Goals</h1>
            <p>Set electricity budgets and track your progress to reduce your bill every month.</p>
          </div>
          <button className="btn-primary">
            <i className="fa-solid fa-plus"></i> New Goal
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
            <span>Set New Goal</span>
          </div>
        </div>

        {/* Savings tips */}
        <div className="card">
          <h2 className={styles.sectionTitle}><i className="fa-solid fa-lightbulb"></i> How to Save on Your Bill</h2>
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
