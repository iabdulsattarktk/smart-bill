import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useLang } from '../context/LanguageContext'
import styles from './BillHistoryPage.module.css'

export default function BillHistoryPage() {
  const { isUrdu } = useLang()
  const [bills, setBills] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ month: '', units: '', amount: '', disco: 'IESCO' })

  const totalPaid = bills.filter(b => b.status === 'paid').reduce((s, b) => s + b.amount, 0)
  const avgUnits  = bills.length > 0 ? Math.round(bills.reduce((s, b) => s + b.units, 0) / bills.length) : null
  const avgAmount = bills.length > 0 ? Math.round(bills.reduce((s, b) => s + b.amount, 0) / bills.length) : null

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1><i className="fa-solid fa-clock-rotate-left"></i> {isUrdu ? 'بل کی تاریخ' : 'Bill History'}</h1>
            <p>{isUrdu ? 'اپنے پچھلے بجلی کے بلوں کو ٹریک کریں اور رجحانات دیکھیں۔' : 'Track all your past electricity bills and spot trends.'}</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            <i className="fa-solid fa-plus"></i> {isUrdu ? 'بل شامل کریں' : 'Add Bill'}
          </button>
        </div>

        {/* Summary cards */}
        <div className={styles.summaryCards}>
          {[
            { label: isUrdu ? 'کل بل ریکارڈ' : 'Total Bills Recorded', value: bills.length, icon: 'fa-file-invoice', color: '#1a2a6c', bg: '#E8EAF6' },
            { label: isUrdu ? 'کل ادا شدہ' : 'Total Paid', value: `Rs. ${totalPaid.toLocaleString()}`, icon: 'fa-check-circle', color: '#2E7D32', bg: '#E8F5E9' },
            { label: isUrdu ? 'اوسط ماہانہ یونٹس' : 'Avg Monthly Units', value: avgUnits !== null ? `${avgUnits} kWh` : '--', icon: 'fa-bolt', color: '#b8860b', bg: '#FFFDE7' },
            { label: isUrdu ? 'اوسط ماہانہ بل' : 'Avg Monthly Bill', value: avgAmount !== null ? `Rs. ${avgAmount.toLocaleString()}` : '--', icon: 'fa-chart-line', color: '#6A1B9A', bg: '#F3E5F5' },
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

        {/* Chart section */}
        <div className={`${styles.chartCard} card`}>
          <h2 className={styles.cardTitle}><i className="fa-solid fa-chart-line"></i> {isUrdu ? 'بل کا رجحان' : 'Bill Trend'}</h2>
          <div style={{textAlign:'center', padding:'40px 20px', color:'#888'}}>
            <i className="fa-solid fa-chart-line" style={{fontSize:48, marginBottom:16, display:'block', opacity:0.3}}></i>
            <p style={{fontSize:16, margin:0}}>
              {isUrdu
                ? 'ابھی تک کوئی بل ڈیٹا نہیں۔ رجحانات دیکھنے کے لیے اپنا پہلا بل شامل کریں۔'
                : 'No bill data yet. Add your first bill to see trends.'}
            </p>
          </div>
        </div>

        {/* Bill list */}
        <div className="card">
          <h2 className={styles.cardTitle}><i className="fa-solid fa-list"></i> {isUrdu ? 'تمام بل' : 'All Bills'}</h2>
          {bills.length > 0 ? (
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
          ) : (
            <div style={{textAlign:'center', padding:'48px 20px', color:'#888'}}>
              <i className="fa-solid fa-file-invoice" style={{fontSize:56, marginBottom:16, display:'block', opacity:0.25}}></i>
              <p style={{fontSize:17, fontWeight:600, margin:'0 0 8px', color:'#555'}}>
                {isUrdu ? 'آپ نے ابھی تک کوئی بل ریکارڈ نہیں کیا۔' : "You haven't recorded any bills yet."}
              </p>
              <p style={{fontSize:14, margin:0, maxWidth:400, marginInline:'auto', lineHeight:1.6}}>
                {isUrdu
                  ? 'اپنا تازہ ترین بجلی کا بل شامل کر کے شروع کریں۔ جتنے زیادہ بل آپ شامل کریں گے، AI کی پیشگوئیاں اتنی بہتر ہوں گی۔'
                  : 'Start by adding your most recent electricity bill. The more bills you add, the better AI predictions become.'}
              </p>
            </div>
          )}
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
