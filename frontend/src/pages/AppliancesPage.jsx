import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useLang } from '../context/LanguageContext'
import styles from './AppliancesPage.module.css'

const APPLIANCE_TYPES = [
  'Air Conditioner (AC)', 'Refrigerator', 'Ceiling Fan', 'Geyser (Water Heater)',
  'Washing Machine', 'Iron', 'TV', 'LED Bulb', 'Tube Light', 'Microwave', 'Computer/Laptop', 'Other'
]

export default function AppliancesPage() {
  const { isUrdu } = useLang()
  const [appliances, setAppliances] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({
    name: '', type: 'Air Conditioner (AC)', tech: 'non-inverter', hours: '', capacity: '', age: 'old'
  })

  const totalCost = appliances.reduce((s, a) => s + a.costPerMonth, 0)

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1><i className="fa-solid fa-plug"></i> {isUrdu ? 'میرے آلات' : 'My Appliances'}</h1>
            <p>{isUrdu ? 'اپنے آلات کو ٹریک کریں تاکہ AI بل کی درست پیشگوئی کر سکے۔ انورٹر بمقابلہ نان انورٹر اہم ہے!' : 'Track your appliances to get accurate AI bill predictions. Inverter vs non-inverter matters!'}</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAdd(true)}>
            <i className="fa-solid fa-plus"></i> {isUrdu ? 'آلہ شامل کریں' : 'Add Appliance'}
          </button>
        </div>

        {/* Total cost card */}
        <div className={styles.totalCard}>
          <div className={styles.totalLeft}>
            <div className={styles.totalLabel}>{isUrdu ? 'کل تخمینی ماہانہ لاگت' : 'Total Estimated Monthly Cost'}</div>
            <div className={styles.totalAmount}>Rs. {totalCost.toLocaleString()}</div>
            <div className={styles.totalSub}>{isUrdu ? `${appliances.length} آلات سے` : `from ${appliances.length} appliances`}</div>
          </div>
          <div className={styles.totalRight}>
            <i className="fa-solid fa-plug"></i>
          </div>
        </div>

        {/* Tip box - only show when appliances exist */}
        {appliances.length > 0 && (
          <div className={styles.tipBox}>
            <i className="fa-solid fa-lightbulb"></i>
            <div>
              <strong>Inverter vs Non-Inverter:</strong> Inverter appliances (especially AC) use 30-50% less electricity.
              If your AC is non-inverter and old, upgrading it will dramatically reduce your bill.
            </div>
          </div>
        )}

        {/* Appliance grid */}
        <div className={styles.appGrid}>
          {appliances.map(a => (
            <div key={a.id} className={`${styles.appCard} card`}>
              <div className={styles.appCardTop}>
                <div className={styles.appIcon}>
                  <i className="fa-solid fa-plug"></i>
                </div>
                <div>
                  <div className={styles.appName}>{a.name}</div>
                  <div className={styles.appType}>{a.type}</div>
                </div>
              </div>

              <div className={styles.appDetails}>
                <div className={styles.detailRow}>
                  <span>Technology</span>
                  <span className={`badge ${a.tech === 'inverter' ? 'badge-green' : 'badge-red'}`}>
                    <i className={`fa-solid ${a.tech === 'inverter' ? 'fa-bolt' : 'fa-plug'}`}></i>
                    {a.tech === 'inverter' ? 'Inverter' : 'Non-Inverter'}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Daily Hours</span>
                  <span>{a.hours} hrs/day</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Power</span>
                  <span>{a.watts} Watts</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Age</span>
                  <span>{a.age === 'old' ? 'Old (5+ years)' : 'New'}</span>
                </div>
              </div>

              <div className={styles.costRow}>
                <div>
                  <div className={styles.costLabel}>Monthly Cost</div>
                  <div className={styles.costAmount}>Rs. {a.costPerMonth.toLocaleString()}</div>
                </div>
                <div className={styles.pctBadge}>{a.pct}% of bill</div>
              </div>

              <div className={styles.appBar}>
                <div className={styles.appBarFill} style={{width:`${a.pct}%`}}></div>
              </div>

              <div className={styles.appActions}>
                <button className={styles.editBtn}><i className="fa-solid fa-pen"></i> Edit</button>
                <button className={styles.deleteBtn}><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))}

          {/* Add appliance card */}
          <div className={styles.addCard} onClick={() => setShowAdd(true)}>
            <i className="fa-solid fa-plus"></i>
            <span>{isUrdu ? 'آلہ شامل کریں' : 'Add Appliance'}</span>
          </div>
        </div>

        {/* Empty state message */}
        {appliances.length === 0 && (
          <div style={{textAlign:'center', padding:'48px 20px', color:'#888'}}>
            <i className="fa-solid fa-plug" style={{fontSize:56, marginBottom:16, display:'block', opacity:0.25}}></i>
            <p style={{fontSize:17, fontWeight:600, margin:'0 0 8px', color:'#555'}}>
              {isUrdu ? 'ابھی تک کوئی آلہ شامل نہیں کیا گیا۔' : 'No appliances added yet.'}
            </p>
            <p style={{fontSize:14, margin:0, maxWidth:420, marginInline:'auto', lineHeight:1.6}}>
              {isUrdu
                ? 'درست AI بل کی پیشگوئی کے لیے اپنے گھر کے آلات شامل کریں۔ اپنے AC، فریج اور پنکھوں سے شروع کریں۔'
                : 'Add your home appliances to get accurate AI bill predictions. Start with your AC, fridge, and fans.'}
            </p>
          </div>
        )}

        {/* Add Modal */}
        {showAdd && (
          <div className={styles.modalOverlay} onClick={() => setShowAdd(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Add Appliance</h2>
                <button onClick={() => setShowAdd(false)}><i className="fa-solid fa-xmark"></i></button>
              </div>

              <div className="input-group">
                <label>Name (e.g. "My AC")</label>
                <input type="text" placeholder="Give it a name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>

              <div className="input-group">
                <label>Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  {APPLIANCE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="input-group">
                  <label>Technology</label>
                  <select value={form.tech} onChange={e => setForm({...form, tech: e.target.value})}>
                    <option value="inverter">Inverter ✅</option>
                    <option value="non-inverter">Non-Inverter ❌</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Age</label>
                  <select value={form.age} onChange={e => setForm({...form, age: e.target.value})}>
                    <option value="new">New (&lt; 5 years)</option>
                    <option value="old">Old (5+ years)</option>
                  </select>
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="input-group">
                  <label>Daily Hours Used</label>
                  <input type="number" placeholder="e.g. 8" min="0" max="24" value={form.hours} onChange={e => setForm({...form, hours: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Capacity / Size</label>
                  <input type="text" placeholder="e.g. 1.5 ton, 42 inch" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />
                </div>
              </div>

              <div className={styles.techNote}>
                <i className="fa-solid fa-circle-info"></i>
                <strong>Inverter</strong> appliances use 30-50% less power than Non-Inverter ones.
                This affects your AI bill prediction accuracy.
              </div>

              <button className="btn-primary" style={{width:'100%',justifyContent:'center',padding:13,marginTop:8}} onClick={() => setShowAdd(false)}>
                <i className="fa-solid fa-plus"></i> Add Appliance
              </button>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  )
}
