import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js'
import Sidebar from '../components/Sidebar'
import styles from './DashboardPage.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Demo data (will be replaced with real API data)
const DEMO = {
  userName: 'Abdul Sattar',
  disco: 'IESCO',
  city: 'Islamabad',
  predictedBill: 5423,
  predictedUnits: 374,
  confidence: 'HIGH',
  lastBill: 4957,
  lastUnits: 350,
  currentMonth: 'May 2025',
  nextMonth: 'June 2025',
  savings: 2100,
  monthlyBudget: 6000,
  budgetUsed: 68,
  peakAlert: true,
  history: [
    { month: 'Jan', units: 180, amount: 2640 },
    { month: 'Feb', units: 160, amount: 2310 },
    { month: 'Mar', units: 210, amount: 3120 },
    { month: 'Apr', units: 280, amount: 4100 },
    { month: 'May', units: 350, amount: 4957 },
  ],
  tips: [
    { icon: 'fa-snowflake', color: '#1a2a6c', bg: '#E8EAF6', text: 'Reduce AC by 1 hour/day in peak hours (7PM–11PM) → Save Rs. 800/month' },
    { icon: 'fa-sun',       color: '#b8860b', bg: '#FFFDE7', text: 'June is a high-bill month. Your bill may be 15% higher than May.' },
    { icon: 'fa-lightbulb', color: '#2E7D32', bg: '#E8F5E9', text: 'Switch to LED bulbs → Save up to Rs. 400/month on lighting alone.' },
  ],
  appliances: [
    { name: 'AC (1.5 Ton)', icon: 'fa-snowflake', cost: 2800, pct: 52 },
    { name: 'Fridge',        icon: 'fa-box',       cost: 900,  pct: 17 },
    { name: 'Geyser',        icon: 'fa-fire',      cost: 600,  pct: 11 },
    { name: 'Fan (3x)',      icon: 'fa-fan',       cost: 420,  pct: 8  },
    { name: 'Others',        icon: 'fa-plug',      cost: 657,  pct: 12 },
  ]
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data] = useState(DEMO)

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const chartData = {
    labels: data.history.map(h => h.month),
    datasets: [
      {
        label: 'Units (kWh)',
        data: data.history.map(h => h.units),
        backgroundColor: 'rgba(26,42,108,0.85)',
        borderRadius: 6,
        yAxisID: 'y',
      },
      {
        label: 'Amount (Rs.)',
        data: data.history.map(h => h.amount),
        backgroundColor: 'rgba(245,197,24,0.85)',
        borderRadius: 6,
        yAxisID: 'y1',
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12 }, padding: 16 } },
      title: { display: false },
    },
    scales: {
      y:  { type: 'linear', display: true, position: 'left',  title: { display: true, text: 'Units (kWh)' } },
      y1: { type: 'linear', display: true, position: 'right', title: { display: true, text: 'Amount (Rs.)' }, grid: { drawOnChartArea: false } },
    },
  }

  return (
    <Sidebar>
      <div className={styles.page}>
        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div>
            {loading
              ? <div className={`skeleton ${styles.skH}`}></div>
              : <>
                  <h1 className={styles.greeting}>Good morning, {data.userName.split(' ')[0]} 👋</h1>
                  <p className={styles.subGreeting}>{data.disco} · {data.city} · {data.currentMonth}</p>
                </>
            }
          </div>
          {!loading && (
            <div className={styles.headerRight}>
              {data.peakAlert && (
                <div className={styles.peakAlert}>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Peak Hours Active: 7PM–11PM
                </div>
              )}
              <button className="btn-primary" onClick={() => navigate('/bill-history')}>
                <i className="fa-solid fa-plus"></i> Add Bill
              </button>
            </div>
          )}
        </div>

        {/* ── TOP CARDS ── */}
        <div className={styles.topCards}>
          {/* Predicted Bill — BIG CARD */}
          <div className={styles.predictCard}>
            {loading
              ? <><div className={`skeleton ${styles.skPredTitle}`}></div><div className={`skeleton ${styles.skPredAmt}`}></div></>
              : <>
                  <div className={styles.predictTop}>
                    <div>
                      <div className={styles.predictLabel}>
                        <i className="fa-solid fa-brain"></i>
                        AI Predicted Bill — {data.nextMonth}
                      </div>
                      <div className={styles.predictDisco}>{data.disco}</div>
                    </div>
                    <span className={`badge badge-green`}>
                      <i className="fa-solid fa-circle-check"></i> {data.confidence} Confidence
                    </span>
                  </div>
                  <div className={styles.predictAmount}>Rs. {data.predictedBill.toLocaleString()}</div>
                  <div className={styles.predictUnits}>{data.predictedUnits} units estimated</div>
                  <div className={styles.predictBreakdown}>
                    <div className={styles.predictRow}>
                      <span><i className="fa-solid fa-clock-rotate-left"></i> History weight</span>
                      <span>60%</span>
                    </div>
                    <div className={styles.predictRow}>
                      <span><i className="fa-solid fa-plug"></i> Appliance usage</span>
                      <span>40%</span>
                    </div>
                    <div className={styles.predictRow}>
                      <span><i className="fa-solid fa-sun"></i> Summer seasonal</span>
                      <span style={{color:'var(--red)'}}>+15%</span>
                    </div>
                  </div>
                  <div className={styles.predictCompare}>
                    vs last month: Rs. {data.lastBill.toLocaleString()}
                    <span style={{color:'var(--red)',marginLeft:8}}>
                      <i className="fa-solid fa-arrow-up"></i>
                      Rs. {(data.predictedBill - data.lastBill).toLocaleString()} more
                    </span>
                  </div>
                </>
            }
          </div>

          {/* Right side mini cards */}
          <div className={styles.miniCards}>
            {/* Last Bill */}
            <div className={`${styles.miniCard} card`}>
              {loading
                ? <div className={`skeleton ${styles.skMini}`}></div>
                : <>
                    <div className={styles.miniIcon} style={{background:'#E8EAF6',color:'var(--navy)'}}>
                      <i className="fa-solid fa-file-invoice"></i>
                    </div>
                    <div className={styles.miniLabel}>Last Month Bill</div>
                    <div className={styles.miniValue}>Rs. {data.lastBill.toLocaleString()}</div>
                    <div className={styles.miniSub}>{data.lastUnits} units · {data.currentMonth}</div>
                  </>
              }
            </div>

            {/* Budget */}
            <div className={`${styles.miniCard} card`}>
              {loading
                ? <div className={`skeleton ${styles.skMini}`}></div>
                : <>
                    <div className={styles.miniIcon} style={{background:'#E8F5E9',color:'var(--green)'}}>
                      <i className="fa-solid fa-piggy-bank"></i>
                    </div>
                    <div className={styles.miniLabel}>Monthly Budget</div>
                    <div className={styles.miniValue}>Rs. {data.monthlyBudget.toLocaleString()}</div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{width:`${data.budgetUsed}%`, background: data.budgetUsed > 85 ? 'var(--red)' : 'var(--green)'}}></div>
                    </div>
                    <div className={styles.miniSub}>{data.budgetUsed}% of budget predicted</div>
                  </>
              }
            </div>

            {/* Total Saved */}
            <div className={`${styles.miniCard} card`}>
              {loading
                ? <div className={`skeleton ${styles.skMini}`}></div>
                : <>
                    <div className={styles.miniIcon} style={{background:'#FFFDE7',color:'#b8860b'}}>
                      <i className="fa-solid fa-trophy"></i>
                    </div>
                    <div className={styles.miniLabel}>Saved This Month</div>
                    <div className={styles.miniValue} style={{color:'var(--green)'}}>Rs. {data.savings.toLocaleString()}</div>
                    <div className={styles.miniSub}>vs. last summer average</div>
                  </>
              }
            </div>
          </div>
        </div>

        {/* ── CHART + APPLIANCES ── */}
        <div className={styles.midRow}>
          {/* Bill History Chart */}
          <div className={`${styles.chartCard} card`}>
            <div className={styles.cardHeader}>
              <h2><i className="fa-solid fa-chart-bar"></i> Bill History</h2>
              <button className={styles.viewAll} onClick={() => navigate('/bill-history')}>
                View All <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            {loading
              ? <div className={`skeleton ${styles.skChart}`}></div>
              : <Bar data={chartData} options={chartOptions} />
            }
          </div>

          {/* Appliance Breakdown */}
          <div className={`${styles.appCard} card`}>
            <div className={styles.cardHeader}>
              <h2><i className="fa-solid fa-plug"></i> Appliance Cost</h2>
              <button className={styles.viewAll} onClick={() => navigate('/appliances')}>
                Manage <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            {loading
              ? <div className={`skeleton ${styles.skChart}`}></div>
              : <div className={styles.appList}>
                  {data.appliances.map(a => (
                    <div key={a.name} className={styles.appRow}>
                      <div className={styles.appIcon}>
                        <i className={`fa-solid ${a.icon}`}></i>
                      </div>
                      <div className={styles.appInfo}>
                        <div className={styles.appName}>{a.name}</div>
                        <div className={styles.appBar}>
                          <div className={styles.appBarFill} style={{width:`${a.pct}%`}}></div>
                        </div>
                      </div>
                      <div className={styles.appCost}>
                        <div className={styles.appAmt}>Rs. {a.cost.toLocaleString()}</div>
                        <div className={styles.appPct}>{a.pct}%</div>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </div>
        </div>

        {/* ── TIPS ── */}
        <div className={`${styles.tipsSection} card`}>
          <div className={styles.cardHeader}>
            <h2><i className="fa-solid fa-lightbulb"></i> Smart Tips for This Month</h2>
          </div>
          {loading
            ? <div className={`skeleton ${styles.skChart}`}></div>
            : <div className={styles.tipsGrid}>
                {data.tips.map((tip, i) => (
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
            { icon: 'fa-camera',       label: 'Scan Bill',        path: '/bill-history',    color: '#1a2a6c', bg: '#E8EAF6' },
            { icon: 'fa-calculator',   label: 'Slab Calculator',  path: '/slab-calculator', color: '#b8860b', bg: '#FFFDE7' },
            { icon: 'fa-plug',         label: 'My Appliances',    path: '/appliances',      color: '#2E7D32', bg: '#E8F5E9' },
            { icon: 'fa-piggy-bank',   label: 'Savings Goals',    path: '/savings-goals',   color: '#6A1B9A', bg: '#F3E5F5' },
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
