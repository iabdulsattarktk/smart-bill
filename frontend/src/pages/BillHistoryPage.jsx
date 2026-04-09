import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import Sidebar from '../components/Sidebar'
import styles from './BillHistoryPage.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const DEMO_BILLS = [
  { id: 1, month: 'January 2025', units: 180, amount: 2640,  status: 'paid',   disco: 'IESCO', dueDate: '2025-02-10' },
  { id: 2, month: 'February 2025',units: 160, amount: 2310,  status: 'paid',   disco: 'IESCO', dueDate: '2025-03-10' },
  { id: 3, month: 'March 2025',   units: 210, amount: 3120,  status: 'paid',   disco: 'IESCO', dueDate: '2025-04-10' },
  { id: 4, month: 'April 2025',   units: 280, amount: 4100,  status: 'paid',   disco: 'IESCO', dueDate: '2025-05-10' },
  { id: 5, month: 'May 2025',     units: 350, amount: 4957,  status: 'unpaid', disco: 'IESCO', dueDate: '2025-06-10' },
]

export default function BillHistoryPage() {
  const [bills] = useState(DEMO_BILLS)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ month: '', units: '', amount: '', disco: 'IESCO' })

  const chartData = {
    labels: bills.map(b => b.month.split(' ')[0]),
    datasets: [{
      label: 'Bill Amount (Rs.)',
      data: bills.map(b => b.amount),
      borderColor: '#1a2a6c',
      backgroundColor: 'rgba(26,42,108,0.08)',
      pointBackgroundColor: '#F5C518',
      pointRadius: 6,
      tension: 0.4,
      fill: true,
    }]
  }

  const totalPaid = bills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0)
  const avgUnits  = Math.round(bills.reduce((s, b) => s + b.units, 0) / bills.length)
  const avgAmount = Math.round(bills.reduce((s, b) => s + b.amount, 0) / bills.length)

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1><i className="fa-solid fa-clock-rotate-left"></i> Bill History</h1>
            <p>Track all your past electricity bills and spot trends.</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            <i className="fa-solid fa-plus"></i> Add Bill
          </button>
        </div>

        {/* Summary cards */}
        <div className={styles.summaryCards}>
          {[
            { label: 'Total Bills Recorded', value: bills.length, icon: 'fa-file-invoice', color: '#1a2a6c', bg: '#E8EAF6' },
            { label: 'Total Paid',            value: `Rs. ${totalPaid.toLocaleString()}`, icon: 'fa-check-circle', color: '#2E7D32', bg: '#E8F5E9' },
            { label: 'Avg Monthly Units',     value: `${avgUnits} kWh`, icon: 'fa-bolt', color: '#b8860b', bg: '#FFFDE7' },
            { label: 'Avg Monthly Bill',      value: `Rs. ${avgAmount.toLocaleString()}`, icon: 'fa-chart-line', color: '#6A1B9A', bg: '#F3E5F5' },
          ].map(s => (
            <div key={s.label} className={`${styles.sumCard} card`}>
              <div className={styles.sumIcon} style={{background: s.bg, color: s.color}}>
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <div className={styles.sumValue}>{s.value}</div>
              <div className={styles.sumLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className={`${styles.chartCard} card`}>
          <h2 className={styles.cardTitle}><i className="fa-solid fa-chart-line"></i> Bill Trend</h2>
          <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }} />
        </div>

        {/* Bill list */}
        <div className="card">
          <h2 className={styles.cardTitle}><i className="fa-solid fa-list"></i> All Bills</h2>
          <div className={styles.billList}>
            {bills.map(bill => (
              <div key={bill.id} className={styles.billRow}>
                <div className={styles.billMonth}>
                  <div className={styles.billMonthIcon}><i className="fa-solid fa-calendar"></i></div>
                  <div>
                    <div className={styles.billMonthName}>{bill.month}</div>
                    <div className={styles.billDisco}>{bill.disco}</div>
                  </div>
                </div>
                <div className={styles.billUnits}><span>{bill.units}</span><small>units</small></div>
                <div className={styles.billAmount}>Rs. {bill.amount.toLocaleString()}</div>
                <div className={styles.billDue}>Due: {bill.dueDate}</div>
                <span className={`badge ${bill.status === 'paid' ? 'badge-green' : 'badge-red'}`}>
                  <i className={`fa-solid ${bill.status === 'paid' ? 'fa-check' : 'fa-clock'}`}></i>
                  {bill.status === 'paid' ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Bill Modal */}
        {showAdd && (
          <div className={styles.modalOverlay} onClick={() => setShowAdd(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Add New Bill</h2>
                <button onClick={() => setShowAdd(false)}><i className="fa-solid fa-xmark"></i></button>
              </div>
              <div className="input-group">
                <label>Month</label>
                <input type="month" value={form.month} onChange={e => setForm({...form, month: e.target.value})} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="input-group">
                  <label>Units (kWh)</label>
                  <input type="number" placeholder="e.g. 350" value={form.units} onChange={e => setForm({...form, units: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Amount (Rs.)</label>
                  <input type="number" placeholder="e.g. 4957" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                </div>
              </div>
              <div className="input-group">
                <label>DISCO</label>
                <select value={form.disco} onChange={e => setForm({...form, disco: e.target.value})}>
                  {['LESCO','MEPCO','FESCO','GEPCO','IESCO','PESCO','HESCO','SEPCO','QESCO','KE','TESCO','AJKESC'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <button className="btn-primary" style={{width:'100%',justifyContent:'center',padding:13}} onClick={() => setShowAdd(false)}>
                <i className="fa-solid fa-plus"></i> Add Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  )
}
