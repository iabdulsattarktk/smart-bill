import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './OnboardingPage.module.css'

const DISCOS = ['LESCO','MEPCO','FESCO','GEPCO','IESCO','PESCO','HESCO','SEPCO','QESCO','KE','TESCO','AJKESC']

const STEPS = ['Welcome', 'Your DISCO', 'Your Bills', 'Done!']

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ disco: 'IESCO', city: '', units: '', amount: '', budget: '' })

  const next = () => step < STEPS.length - 1 ? setStep(step + 1) : navigate('/dashboard')
  const prev = () => step > 0 && setStep(step - 1)

  return (
    <div className={styles.page}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
        <span>Smart<span>Bill</span></span>
      </div>

      {/* Progress */}
      <div className={styles.progress}>
        {STEPS.map((s, i) => (
          <div key={s} className={styles.progressStep}>
            <div className={`${styles.dot} ${i <= step ? styles.dotActive : ''}`}>
              {i < step ? <i className="fa-solid fa-check"></i> : i + 1}
            </div>
            <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className={styles.card}>
        {step === 0 && (
          <div className={styles.stepContent}>
            <div className={styles.stepIcon}><i className="fa-solid fa-hand-wave"></i></div>
            <h1>Welcome to Smart Bill!</h1>
            <p className={styles.stepUrdu}>خوش آمدید — بجلی کا بل اب آپ کے کنٹرول میں ہے</p>
            <p>Let us set up your account in 2 minutes. We will need to know your electricity company and a few past bills to give you accurate predictions.</p>
            <div className={styles.welcomeFeatures}>
              {[
                { icon: 'fa-brain', text: 'AI Prediction — know your bill before it arrives' },
                { icon: 'fa-calculator', text: 'Slab Calculator — see exact NEPRA breakdown' },
                { icon: 'fa-piggy-bank', text: 'Savings Goals — set a budget and track it' },
              ].map(f => (
                <div key={f.text} className={styles.wFeat}>
                  <div className={styles.wFeatIcon}><i className={`fa-solid ${f.icon}`}></i></div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.stepIcon}><i className="fa-solid fa-bolt"></i></div>
            <h1>Your Electricity Company</h1>
            <p>Select your DISCO (electricity distribution company) and city. This is used to apply the correct tariff rates.</p>
            <div className="input-group">
              <label>Select Your DISCO</label>
              <select value={form.disco} onChange={e => setForm({...form, disco: e.target.value})}>
                {DISCOS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Your City</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-location-dot"></i>
                <input type="text" placeholder="e.g. Islamabad" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
              </div>
            </div>
            <div className="input-group">
              <label>Monthly Budget (Rs.) — Optional</label>
              <div className="input-icon-wrap">
                <i className="fa-solid fa-piggy-bank"></i>
                <input type="number" placeholder="e.g. 5000" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.stepIcon}><i className="fa-solid fa-file-invoice"></i></div>
            <h1>Your Last Bill</h1>
            <p>Enter your most recent electricity bill details. This helps us start making predictions immediately. You can add more history in the app.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div className="input-group">
                <label>Units (kWh)</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-bolt"></i>
                  <input type="number" placeholder="e.g. 350" value={form.units} onChange={e => setForm({...form, units: e.target.value})} />
                </div>
              </div>
              <div className="input-group">
                <label>Amount (Rs.)</label>
                <div className="input-icon-wrap">
                  <i className="fa-solid fa-money-bill"></i>
                  <input type="number" placeholder="e.g. 4957" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                </div>
              </div>
            </div>
            <div className={styles.skipNote}>
              <i className="fa-solid fa-circle-info"></i>
              You can skip this and add bills later from Bill History page.
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <div className={styles.stepIcon} style={{background:'rgba(46,125,50,0.12)',color:'var(--green)'}}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h1>You are all set!</h1>
            <p>Your Smart Bill account is ready. Your first AI prediction will appear on your dashboard once you add 2-3 bill records.</p>
            <div className={styles.setupSummary}>
              <div className={styles.summRow}><i className="fa-solid fa-bolt"></i> DISCO: <strong>{form.disco}</strong></div>
              {form.city && <div className={styles.summRow}><i className="fa-solid fa-location-dot"></i> City: <strong>{form.city}</strong></div>}
              {form.budget && <div className={styles.summRow}><i className="fa-solid fa-piggy-bank"></i> Budget: <strong>Rs. {parseInt(form.budget).toLocaleString()}/month</strong></div>}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className={styles.btnRow}>
          {step > 0 && (
            <button className="btn-secondary" onClick={prev}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
          )}
          <button className="btn-primary" style={{flex:1,justifyContent:'center'}} onClick={next}>
            {step === STEPS.length - 1
              ? <><i className="fa-solid fa-house"></i> Go to Dashboard</>
              : step === 2 && !form.units
              ? <><i className="fa-solid fa-forward"></i> Skip for Now</>
              : <><i className="fa-solid fa-arrow-right"></i> Continue</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
