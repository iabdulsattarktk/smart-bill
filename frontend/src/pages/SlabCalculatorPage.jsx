import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import styles from './SlabCalculatorPage.module.css'

// NEPRA 2024-25 slab rates
const SLABS = [
  { range: '1–100 units',   rate: 7.74,  fixed: 75 },
  { range: '101–200 units', rate: 10.06, fixed: 100 },
  { range: '201–300 units', rate: 14.32, fixed: 150 },
  { range: '301–400 units', rate: 19.55, fixed: 200 },
  { range: '401–500 units', rate: 22.65, fixed: 250 },
  { range: '501–600 units', rate: 26.00, fixed: 300 },
  { range: '601–700 units', rate: 27.00, fixed: 350 },
  { range: '700+ units',    rate: 28.00, fixed: 400 },
]

function calculateBill(units) {
  if (!units || units <= 0) return null
  const u = parseInt(units)
  let energyCharge = 0
  let slabIndex = 0

  if (u <= 100)       { energyCharge = u * 7.74;  slabIndex = 0 }
  else if (u <= 200)  { energyCharge = 100*7.74 + (u-100)*10.06; slabIndex = 1 }
  else if (u <= 300)  { energyCharge = 100*7.74 + 100*10.06 + (u-200)*14.32; slabIndex = 2 }
  else if (u <= 400)  { energyCharge = 100*7.74 + 100*10.06 + 100*14.32 + (u-300)*19.55; slabIndex = 3 }
  else if (u <= 500)  { energyCharge = 100*7.74 + 100*10.06 + 100*14.32 + 100*19.55 + (u-400)*22.65; slabIndex = 4 }
  else if (u <= 600)  { energyCharge = 100*7.74 + 100*10.06 + 100*14.32 + 100*19.55 + 100*22.65 + (u-500)*26.00; slabIndex = 5 }
  else if (u <= 700)  { energyCharge = 100*7.74 + 100*10.06 + 100*14.32 + 100*19.55 + 100*22.65 + 100*26.00 + (u-600)*27.00; slabIndex = 6 }
  else                { energyCharge = 100*7.74 + 100*10.06 + 100*14.32 + 100*19.55 + 100*22.65 + 100*26.00 + 100*27.00 + (u-700)*28.00; slabIndex = 7 }

  const currentRate = SLABS[slabIndex].rate
  const fixedCharges = SLABS[slabIndex].fixed
  const subtotal = energyCharge + fixedCharges
  const gst = subtotal * 0.17
  const total = subtotal + gst

  // Units to next slab
  const slabBoundaries = [100, 200, 300, 400, 500, 600, 700]
  const nextBoundary = slabBoundaries.find(b => b > u)
  const unitsToNextSlab = nextBoundary ? nextBoundary - u : null

  return {
    units: u,
    energyCharge: Math.round(energyCharge),
    fixedCharges,
    subtotal: Math.round(subtotal),
    gst: Math.round(gst),
    total: Math.round(total),
    currentRate,
    slabIndex,
    unitsToNextSlab,
    perUnitAvg: Math.round(total / u),
  }
}

export default function SlabCalculatorPage() {
  const [units, setUnits] = useState('')
  const [result, setResult] = useState(null)

  const handleCalculate = (e) => {
    e.preventDefault()
    setResult(calculateBill(units))
  }

  return (
    <Sidebar>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1><i className="fa-solid fa-calculator"></i> Slab Calculator</h1>
          <p>Enter your monthly units to see full NEPRA bill breakdown — exact charges, GST, and which slab you are in.</p>
        </div>

        <div className={styles.layout}>
          {/* Left — Calculator */}
          <div className={styles.calcSection}>
            <div className="card">
              <h2 className={styles.cardTitle}>Calculate Your Bill</h2>

              <form onSubmit={handleCalculate}>
                <div className="input-group">
                  <label>Units Consumed (kWh)</label>
                  <div className="input-icon-wrap">
                    <i className="fa-solid fa-bolt"></i>
                    <input
                      type="number"
                      placeholder="e.g. 350"
                      value={units}
                      onChange={e => { setUnits(e.target.value); setResult(null) }}
                      min="1"
                      max="9999"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'13px'}}>
                  <i className="fa-solid fa-calculator"></i> Calculate Bill
                </button>
              </form>

              {/* Result */}
              {result && (
                <div className={styles.result}>
                  <div className={styles.resultHeader}>
                    <div className={styles.resultLabel}>Total Bill Amount</div>
                    <div className={styles.resultAmount}>Rs. {result.total.toLocaleString()}</div>
                    <div className={styles.resultUnits}>{result.units} units · Rs. {result.perUnitAvg}/unit average</div>
                  </div>

                  <div className={styles.breakdown}>
                    <div className={styles.bRow}>
                      <span><i className="fa-solid fa-bolt"></i> Energy Charges</span>
                      <span>Rs. {result.energyCharge.toLocaleString()}</span>
                    </div>
                    <div className={styles.bRow}>
                      <span><i className="fa-solid fa-building"></i> Fixed Charges</span>
                      <span>Rs. {result.fixedCharges.toLocaleString()}</span>
                    </div>
                    <div className={styles.bRow}>
                      <span><i className="fa-solid fa-receipt"></i> Subtotal</span>
                      <span>Rs. {result.subtotal.toLocaleString()}</span>
                    </div>
                    <div className={styles.bRow}>
                      <span><i className="fa-solid fa-percent"></i> GST (17%)</span>
                      <span>Rs. {result.gst.toLocaleString()}</span>
                    </div>
                    <div className={`${styles.bRow} ${styles.bTotal}`}>
                      <span>Total Payable</span>
                      <span>Rs. {result.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className={styles.slabInfo}>
                    <i className="fa-solid fa-layer-group"></i>
                    Current Slab: <strong>{SLABS[result.slabIndex].range}</strong> at <strong>Rs. {result.currentRate}/unit</strong>
                  </div>

                  {result.unitsToNextSlab && result.unitsToNextSlab <= 30 && (
                    <div className={styles.slabWarning}>
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      Warning: Only <strong>{result.unitsToNextSlab} units</strong> away from next (higher) slab!
                      Reduce usage to stay in current slab.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right — Slab table */}
          <div className={styles.tableSection}>
            <div className="card">
              <h2 className={styles.cardTitle}>NEPRA Slab Rates 2024-25</h2>
              <p className={styles.tableNote}>Pakistan's official electricity tariff slabs. Higher usage = higher rate per unit.</p>
              <div className={styles.slabTable}>
                {SLABS.map((slab, i) => (
                  <div
                    key={i}
                    className={`${styles.slabRow} ${result && result.slabIndex === i ? styles.activeSlab : ''}`}
                  >
                    <div className={styles.slabNum}>{i + 1}</div>
                    <div className={styles.slabRange}>{slab.range}</div>
                    <div className={styles.slabRate}>Rs. {slab.rate}/unit</div>
                    {result && result.slabIndex === i && (
                      <span className="badge badge-yellow">Your Slab</span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.tableFooter}>
                <i className="fa-solid fa-circle-info"></i>
                Rates are cumulative — you pay each rate only for units in that slab range.
                Fixed charges and 17% GST added separately.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
