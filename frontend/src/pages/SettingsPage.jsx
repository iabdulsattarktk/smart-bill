import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import styles from './SettingsPage.module.css'

const DISCOS = ['LESCO','MEPCO','FESCO','GEPCO','IESCO','PESCO','HESCO','SEPCO','QESCO','KE','TESCO','AJKESC']

export default function SettingsPage() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Abdul Sattar', email: 'abdulsattar@gmail.com',
    disco: 'IESCO', city: 'Islamabad', consumer: '14 1411 3820500 U',
    budget: '6000', lang: 'EN'
  })
  const [notifs, setNotifs] = useState({
    peakHour: true, midMonth: true, highBill: true, savingTip: true
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1><i className="fa-solid fa-gear"></i> Settings</h1>
          <p>Manage your profile, DISCO, notifications, and account preferences.</p>
        </div>

        <div className={styles.layout}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Profile */}
            <div className="card">
              <h2 className={styles.cardTitle}><i className="fa-solid fa-user"></i> Profile</h2>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>AS</div>
                <div>
                  <div className={styles.avatarName}>{profile.name}</div>
                  <div className={styles.avatarEmail}>{profile.email}</div>
                </div>
              </div>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
              </div>
            </div>

            {/* Electricity settings */}
            <div className="card">
              <h2 className={styles.cardTitle}><i className="fa-solid fa-bolt"></i> Electricity Settings</h2>
              <div className="input-group">
                <label>Your DISCO (Electricity Company)</label>
                <select value={profile.disco} onChange={e => setProfile({...profile, disco: e.target.value})}>
                  {DISCOS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label>City</label>
                <input type="text" value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} />
              </div>
              <div className="input-group">
                <label>Consumer / Reference Number</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-id-card"></i>
                  <input type="text" value={profile.consumer} onChange={e => setProfile({...profile, consumer: e.target.value})} placeholder="e.g. 14 1411 3820500 U" />
                </div>
              </div>
              <div className="input-group">
                <label>Monthly Bill Budget (Rs.)</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-piggy-bank"></i>
                  <input type="number" value={profile.budget} onChange={e => setProfile({...profile, budget: e.target.value})} placeholder="e.g. 6000" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            {/* Notifications */}
            <div className="card">
              <h2 className={styles.cardTitle}><i className="fa-solid fa-bell"></i> Notifications</h2>
              <div className={styles.notifList}>
                {[
                  { key: 'peakHour', label: 'Peak Hour Alerts (7PM–11PM)', sub: 'Get notified during peak electricity hours' },
                  { key: 'midMonth', label: 'Mid-Month Warning', sub: 'Alert if you are on track for a high bill' },
                  { key: 'highBill', label: 'High Bill Prediction Alert', sub: 'When predicted bill is 20%+ higher than last month' },
                  { key: 'savingTip', label: 'Daily Saving Tips', sub: 'Smart tips to reduce your electricity usage' },
                ].map(n => (
                  <div key={n.key} className={styles.notifRow}>
                    <div>
                      <div className={styles.notifLabel}>{n.label}</div>
                      <div className={styles.notifSub}>{n.sub}</div>
                    </div>
                    <div
                      className={`${styles.toggle} ${notifs[n.key] ? styles.toggleOn : ''}`}
                      onClick={() => setNotifs({...notifs, [n.key]: !notifs[n.key]})}
                    >
                      <div className={styles.toggleThumb}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="card">
              <h2 className={styles.cardTitle}><i className="fa-solid fa-language"></i> Language</h2>
              <div className={styles.langOptions}>
                {[
                  { value: 'EN', label: 'English', sub: 'Default' },
                  { value: 'UR', label: 'اردو', sub: 'Urdu' },
                  { value: 'RU', label: 'Roman Urdu', sub: 'Transliterated' },
                ].map(l => (
                  <div
                    key={l.value}
                    className={`${styles.langOption} ${profile.lang === l.value ? styles.langActive : ''}`}
                    onClick={() => setProfile({...profile, lang: l.value})}
                  >
                    <div className={styles.langLabel}>{l.label}</div>
                    <div className={styles.langSub}>{l.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className={`card ${styles.dangerCard}`}>
              <h2 className={styles.cardTitle} style={{color:'var(--red)'}}><i className="fa-solid fa-triangle-exclamation"></i> Danger Zone</h2>
              <button className={styles.dangerBtn}>
                <i className="fa-solid fa-trash"></i> Delete My Account
              </button>
              <p className={styles.dangerNote}>This will permanently delete all your bills, appliances, and data. Cannot be undone.</p>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className={styles.saveBar}>
          {saved && (
            <div className={styles.savedMsg}>
              <i className="fa-solid fa-circle-check"></i> Settings saved successfully!
            </div>
          )}
          <button className="btn-primary" onClick={handleSave}>
            <i className="fa-solid fa-floppy-disk"></i> Save Changes
          </button>
        </div>
      </div>
    </Sidebar>
  )
}
