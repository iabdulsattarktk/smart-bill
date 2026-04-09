import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './OnboardingPage.module.css'

const DISCOS = [
  { name: 'IESCO',  city: 'Islamabad' },
  { name: 'LESCO',  city: 'Lahore' },
  { name: 'MEPCO',  city: 'Multan' },
  { name: 'FESCO',  city: 'Faisalabad' },
  { name: 'GEPCO',  city: 'Gujranwala' },
  { name: 'PESCO',  city: 'Peshawar' },
  { name: 'HESCO',  city: 'Hyderabad' },
  { name: 'SEPCO',  city: 'Sukkur' },
  { name: 'QESCO',  city: 'Quetta' },
  { name: 'KE',     city: 'Karachi' },
  { name: 'TESCO',  city: 'Tribal Areas' },
  { name: 'AJKESC', city: 'Azad Kashmir' },
]

const APPLIANCES = [
  { name: 'AC',               icon: 'fa-snowflake',          bg: '#e3f2fd', color: '#1565c0' },
  { name: 'Geyser',           icon: 'fa-fire-flame-curved',  bg: '#fff3e0', color: '#e65100' },
  { name: 'Fans',             icon: 'fa-fan',                bg: '#e3f2fd', color: '#1565c0' },
  { name: 'Fridge',           icon: 'fa-temperature-low',    bg: '#fce4ec', color: '#c62828' },
  { name: 'TV',               icon: 'fa-tv',                 bg: '#f3e5f5', color: '#6a1b9a' },
  { name: 'Washing Machine',  icon: 'fa-shirt',              bg: '#e8f5e9', color: '#2E7D32' },
  { name: 'PC / Laptop',      icon: 'fa-computer',           bg: '#e8eaf6', color: '#1a2a6c' },
  { name: 'Microwave',        icon: 'fa-utensils',           bg: '#fff3e0', color: '#e65100' },
  { name: 'Water Pump',       icon: 'fa-water',              bg: '#e3f2fd', color: '#1565c0' },
  { name: 'Lights / LEDs',    icon: 'fa-lightbulb',          bg: '#fffde7', color: '#f9a825' },
  { name: 'Iron',             icon: 'fa-iron',               bg: '#fce4ec', color: '#c62828' },
  { name: 'Add Other',        icon: 'fa-plus',               bg: '#e8f5e9', color: '#2E7D32' },
]

const STEP_LABELS = ['Language', 'Your DISCO', 'Meter Number', 'Appliances', 'All Done!']

export default function OnboardingPage() {
  const navigate = useNavigate()

  const [step, setStep]             = useState(1)
  const [lang, setLang]             = useState('en')
  const [disco, setDisco]           = useState('IESCO')
  const [meterNumber, setMeterNumber] = useState('')
  const [fetchDone, setFetchDone]   = useState(false)
  const [selectedAppl, setSelectedAppl] = useState(new Set(['AC', 'Geyser', 'Fans', 'Fridge']))

  const goTo = (n) => setStep(n)

  const toggleAppl = (name) => {
    setSelectedAppl(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  return (
    <div className={styles.page}>

      {/* ── TOP NAV ── */}
      <div className={styles.topNav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><i className="fa-solid fa-bolt"></i></div>
          <span className={styles.logoText}>Smart<span>Bill</span></span>
        </div>

        <div className={styles.langToggle}>
          <button
            className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`${styles.langBtn} ${lang === 'ur' ? styles.langBtnActive : ''}`}
            onClick={() => setLang('ur')}
          >اردو</button>
        </div>

        <button className={styles.skipBtn} onClick={() => goTo(5)}>
          Skip Setup <i className="fa-solid fa-forward"></i>
        </button>
      </div>

      {/* ── STEP PROGRESS ── */}
      <div className={styles.progressWrap}>
        <div className={styles.stepIndicators}>
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const isDone   = n < step
            const isActive = n === step
            return (
              <>
                <div
                  key={label}
                  className={`${styles.stepInd} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''}`}
                  onClick={() => n < step && goTo(n)}
                >
                  <div className={styles.stepIndCircle}>
                    {isDone
                      ? <i className="fa-solid fa-check"></i>
                      : n
                    }
                  </div>
                  <div className={styles.stepIndLabel}>{label}</div>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div key={`line-${n}`} className={`${styles.stepLine} ${isDone ? styles.lineDone : ''}`}></div>
                )}
              </>
            )
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className={styles.mainContent}>
        <div className={styles.onboardCard}>

          {/* ── STEP 1: LANGUAGE ── */}
          {step === 1 && (
            <>
              <div className={styles.cardTop}>
                <div className={styles.cardTopIcon}><i className="fa-solid fa-language"></i></div>
                <div className={styles.cardTopText}>
                  <h2>Choose Your Language</h2>
                  <p>Select the language you are most comfortable with</p>
                </div>
                <div className={styles.stepBadge}>Step 1 of 4</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.langGrid}>
                  <div
                    className={`${styles.langCard} ${lang === 'en' ? styles.selected : ''}`}
                    onClick={() => setLang('en')}
                  >
                    <div className={styles.langFlag}><i className="fa-solid fa-e" style={{fontSize:28,color:'var(--navy)'}}></i></div>
                    <div className={styles.langName}>English</div>
                    <div className={styles.langNative}>English</div>
                  </div>
                  <div
                    className={`${styles.langCard} ${lang === 'ur' ? styles.selected : ''}`}
                    onClick={() => setLang('ur')}
                  >
                    <div className={styles.langFlag} style={{fontSize:28,color:'var(--navy)',fontWeight:900}}>اردو</div>
                    <div className={styles.langName}>Urdu</div>
                    <div className={styles.langNative}>اردو</div>
                  </div>
                </div>

                <div className={styles.infoBox}>
                  <i className="fa-solid fa-circle-info"></i>
                  You can change the language anytime from Settings. All features work in both languages.
                </div>

                <div className={styles.navRow} style={{paddingTop:0,borderTop:'none'}}>
                  <button className={styles.btnNext} onClick={() => goTo(2)}>
                    Continue <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2: DISCO ── */}
          {step === 2 && (
            <>
              <div className={styles.cardTop}>
                <div className={styles.cardTopIcon}><i className="fa-solid fa-location-dot"></i></div>
                <div className={styles.cardTopText}>
                  <h2>Select Your DISCO</h2>
                  <p>Which electricity company supplies power to your home?</p>
                </div>
                <div className={styles.stepBadge}>Step 2 of 4</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoBox}>
                  <i className="fa-solid fa-circle-info"></i>
                  Your DISCO is printed on your electricity bill — top left corner. Each DISCO has different slab rates.
                </div>

                <div className={styles.discoGrid}>
                  {DISCOS.map(d => (
                    <div
                      key={d.name}
                      className={`${styles.discoCard} ${disco === d.name ? styles.selected : ''}`}
                      onClick={() => setDisco(d.name)}
                    >
                      <div className={styles.discoCardIcon}><i className="fa-solid fa-bolt"></i></div>
                      <div className={styles.discoCardName}>{d.name}</div>
                      <div className={styles.discoCardCity}>{d.city}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.navRow}>
                  <button className={styles.btnBack} onClick={() => goTo(1)}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                  </button>
                  <button className={styles.btnNext} onClick={() => goTo(3)}>
                    Continue <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3: METER NUMBER ── */}
          {step === 3 && (
            <>
              <div className={styles.cardTop}>
                <div className={styles.cardTopIcon}><i className="fa-solid fa-gauge-high"></i></div>
                <div className={styles.cardTopText}>
                  <h2>Enter Your Meter Number</h2>
                  <p>We auto-fetch your bill details — no manual typing needed</p>
                </div>
                <div className={styles.stepBadge}>Step 3 of 4</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.meterBox}>
                  <div className={styles.meterBoxTitle}>
                    <i className="fa-solid fa-gauge-high"></i> Consumer / Reference Number
                  </div>

                  <div className={styles.infoBox} style={{marginBottom:14}}>
                    <i className="fa-solid fa-circle-info"></i>
                    Find this number on your electricity bill — top section. It looks like: <strong>14 1411 3820500 U</strong>
                  </div>

                  <div className={styles.inputWrap} style={{marginBottom:10}}>
                    <i className={`fa-solid fa-hashtag ${styles.inputIcon}`}></i>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. 14 1411 3820500 U"
                      value={meterNumber}
                      onChange={e => setMeterNumber(e.target.value)}
                    />
                  </div>

                  <button className={styles.meterFetchBtn} onClick={() => setFetchDone(true)}>
                    <i className="fa-solid fa-rotate"></i> Fetch My Bill Details from {disco}
                  </button>

                  {fetchDone && (
                    <div className={styles.fetchResult}>
                      <div className={styles.fetchResultTitle}>
                        <i className="fa-solid fa-circle-check"></i> Bill details fetched successfully!
                      </div>
                      <div className={styles.fetchGrid}>
                        <div className={styles.fetchItem}>
                          <div className={styles.fetchLabel}>Consumer Name</div>
                          <div className={styles.fetchVal}>Ali Khan</div>
                        </div>
                        <div className={styles.fetchItem}>
                          <div className={styles.fetchLabel}>DISCO</div>
                          <div className={styles.fetchVal}>{disco}</div>
                        </div>
                        <div className={styles.fetchItem}>
                          <div className={styles.fetchLabel}>Last Units</div>
                          <div className={styles.fetchVal}>228 units</div>
                        </div>
                        <div className={styles.fetchItem}>
                          <div className={styles.fetchLabel}>Last Bill</div>
                          <div className={styles.fetchVal}>Rs. 10,973</div>
                        </div>
                        <div className={styles.fetchItem}>
                          <div className={styles.fetchLabel}>Due Date</div>
                          <div className={styles.fetchVal}>11 Mar 2026</div>
                        </div>
                        <div className={styles.fetchItem}>
                          <div className={styles.fetchLabel}>Address</div>
                          <div className={styles.fetchVal}>G-4 Sector, ISB</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.skipMeter}>
                  Don't have bill with you?{' '}
                  <span onClick={() => goTo(4)}>Skip this step →</span>
                </div>

                <div className={styles.navRow}>
                  <button className={styles.btnBack} onClick={() => goTo(2)}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                  </button>
                  <button className={styles.btnNext} onClick={() => goTo(4)}>
                    Continue <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 4: APPLIANCES ── */}
          {step === 4 && (
            <>
              <div className={styles.cardTop}>
                <div className={styles.cardTopIcon}><i className="fa-solid fa-plug"></i></div>
                <div className={styles.cardTopText}>
                  <h2>Select Your Appliances</h2>
                  <p>Tick the appliances you have at home — AI uses this to predict your bill</p>
                </div>
                <div className={styles.stepBadge}>Step 4 of 4</div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoBox}>
                  <i className="fa-solid fa-circle-info"></i>
                  Don't worry about exact details now — you can add wattage and usage hours later from the Appliances page.
                </div>

                <div className={styles.applGrid}>
                  {APPLIANCES.map(a => (
                    <div
                      key={a.name}
                      className={`${styles.applCard} ${selectedAppl.has(a.name) ? styles.selected : ''}`}
                      onClick={() => toggleAppl(a.name)}
                    >
                      <div
                        className={styles.applIcon}
                        style={{background: a.bg, color: a.color}}
                      >
                        <i className={`fa-solid ${a.icon}`}></i>
                      </div>
                      <div className={styles.applName}>{a.name}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.navRow}>
                  <button className={styles.btnBack} onClick={() => goTo(3)}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                  </button>
                  <button className={`${styles.btnNext} ${styles.btnGreen}`} onClick={() => goTo(5)}>
                    <i className="fa-solid fa-check"></i> Finish Setup
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 5: COMPLETE ── */}
          {step === 5 && (
            <>
              <div className={`${styles.cardTop} ${styles.cardTopGreen}`}>
                <div className={`${styles.cardTopIcon} ${styles.cardTopIconWhite}`}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className={styles.cardTopText}>
                  <h2>You're All Set!</h2>
                  <p>SmartBill is ready to predict your electricity bills</p>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.completion}>
                  <div className={styles.completionIcon}>
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <h2>Welcome to SmartBill!</h2>
                  <p>
                    Your account is fully set up. AI has loaded your {disco} slab rates
                    and is ready to predict your next bill the moment you add your first bill.
                  </p>

                  <div className={styles.completionStats}>
                    <div className={styles.compStat}>
                      <div className={styles.compStatIcon}><i className="fa-solid fa-location-dot" style={{color:'var(--navy)'}}></i></div>
                      <div className={styles.compStatVal}>{disco}</div>
                      <div className={styles.compStatLbl}>DISCO Selected</div>
                    </div>
                    <div className={styles.compStat}>
                      <div className={styles.compStatIcon}><i className="fa-solid fa-plug" style={{color:'var(--green)'}}></i></div>
                      <div className={styles.compStatVal}>{selectedAppl.size} Appliances</div>
                      <div className={styles.compStatLbl}>Added</div>
                    </div>
                    <div className={styles.compStat}>
                      <div className={styles.compStatIcon}><i className="fa-solid fa-gauge-high" style={{color:'var(--yellow)'}}></i></div>
                      <div className={styles.compStatVal}>{fetchDone ? 'Meter Linked' : 'Ready'}</div>
                      <div className={styles.compStatLbl}>{fetchDone ? 'Auto Fetch ON' : 'Setup Complete'}</div>
                    </div>
                  </div>

                  <button
                    className={styles.btnNext}
                    style={{maxWidth:320,margin:'0 auto'}}
                    onClick={() => navigate('/dashboard')}
                  >
                    <i className="fa-solid fa-house"></i> Go to My Dashboard
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
