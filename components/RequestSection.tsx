'use client'
import { useState } from 'react'

/* ─── Types ─── */
type EmergencyType = 'cardiac' | 'trauma' | 'respiratory' | 'stroke' | 'accident' | 'other'
type ServiceLevel  = 'basic' | 'advanced' | 'critical'
type PayMethod     = 'card' | 'momo' | 'insurance'
type MomoNetwork   = 'mtn' | 'opay' | 'airtel'

interface FormData {
  emergencyType: EmergencyType
  patientName:   string
  patientAge:    string
  phone:         string
  location:      string
  notes:         string
  service:       ServiceLevel
}

const PRICES: Record<ServiceLevel, number> = { basic: 15000, advanced: 35000, critical: 75000 }

const EMERGENCY_TYPES: { type: EmergencyType; label: string; icon: React.ReactNode }[] = [
  { type: 'cardiac',     label: 'Cardiac',     icon: <HeartIcon /> },
  { type: 'trauma',      label: 'Trauma',      icon: <ShieldIcon /> },
  { type: 'respiratory', label: 'Respiratory', icon: <WindIcon /> },
  { type: 'stroke',      label: 'Stroke',      icon: <ClockIcon /> },
  { type: 'accident',    label: 'Accident',    icon: <AlertIcon /> },
  { type: 'other',       label: 'Other',       icon: <InfoIcon /> },
]

/* ─── Main component ─── */
export default function RequestSection({ onConfirm }: { onConfirm: () => void }) {
  const [step, setStep]   = useState(1)
  const [form, setForm]   = useState<FormData>({
    emergencyType: 'cardiac', patientName: '', patientAge: '',
    phone: '', location: '', notes: '', service: 'basic',
  })
  const [pay,  setPay]    = useState<PayMethod>('card')
  const [momoNet, setMomoNet] = useState<MomoNetwork>('mtn')
  const [card, setCard]   = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [momo, setMomo]   = useState({ number: '' })
  const [ins,  setIns]    = useState({ provider: '', id: '' })
  const [processing, setProcessing] = useState(false)

  const price = PRICES[form.service]
  const total = price + 500

  /* helpers */
  const fmtCardNum = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExpiry  = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d
  }

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); onConfirm() }, 2200)
  }

  /* ─── step 1 ─── */
  const Step1 = (
    <div className="step-enter flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-white mb-1">
          Request <span className="text-brand">Emergency</span> Care
        </h2>
        <p className="text-white/50 text-sm">Fill in the details. Help is on its way.</p>
      </div>

      {/* Emergency type */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Type of Emergency</label>
        <div className="grid grid-cols-3 gap-2">
          {EMERGENCY_TYPES.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => setForm(f => ({ ...f, emergencyType: type }))}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                form.emergencyType === type
                  ? 'bg-brand/20 border-brand text-white'
                  : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className={`w-5 h-5 ${form.emergencyType === type ? 'text-brand' : ''}`}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient name + age */}
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label="Patient's Full Name"
          id="patientName"
          placeholder="e.g. Adaobi Okonkwo"
          value={form.patientName}
          onChange={v => setForm(f => ({ ...f, patientName: v }))}
          icon={<UserIcon />}
        />
        <InputField
          label="Age"
          id="age"
          type="number"
          placeholder="e.g. 45"
          value={form.patientAge}
          onChange={v => setForm(f => ({ ...f, patientAge: v }))}
          icon={<CalIcon />}
        />
      </div>

      <InputField
        label="Contact Phone Number"
        id="phone"
        type="tel"
        placeholder="+234 XXX XXX XXXX"
        value={form.phone}
        onChange={v => setForm(f => ({ ...f, phone: v }))}
        icon={<PhoneIcon />}
      />

      {/* Location with GPS */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider" htmlFor="location">
          Pickup Location
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-white/30 w-4 h-4 flex-shrink-0"><PinIcon /></span>
          <input
            id="location"
            className="field pl-10 pr-12"
            placeholder="Enter address or use GPS"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          />
          <button
            type="button"
            title="Use my location"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                  setForm(f => ({ ...f, location: `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}` }))
                })
              }
            }}
            className="absolute right-2 w-8 h-8 rounded-lg bg-brand/20 hover:bg-brand/40 flex items-center justify-center text-brand transition-colors"
          >
            <CrosshairIcon />
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Additional Notes <span className="normal-case text-white/30 font-normal">(optional)</span>
        </label>
        <textarea
          className="field resize-none"
          rows={3}
          placeholder="Describe the situation, floor number, any relevant details..."
          value={form.notes}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
        />
      </div>

      {/* Service level */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Service Level</label>
        <div className="flex flex-col gap-2">
          {(['basic', 'advanced', 'critical'] as ServiceLevel[]).map(sl => (
            <label
              key={sl}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                form.service === sl
                  ? 'bg-brand/15 border-brand'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/25'
              }`}
            >
              <input
                type="radio"
                name="service"
                value={sl}
                checked={form.service === sl}
                onChange={() => setForm(f => ({ ...f, service: sl }))}
                className="accent-brand w-4 h-4"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">
                  {{ basic: 'Basic Life Support', advanced: 'Advanced Life Support', critical: 'Critical Care' }[sl]}
                </div>
                <div className="text-xs text-white/50">
                  {{ basic: 'Standard ambulance with EMTs', advanced: 'Paramedic + advanced equipment', critical: 'Doctor + ICU-level mobile unit' }[sl]}
                </div>
              </div>
              <div className="font-bold text-brand font-display">₦{PRICES[sl].toLocaleString()}</div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        className="btn-brand w-full justify-center py-4 text-base font-bold mt-1"
        disabled={!form.patientName || !form.phone || !form.location}
        style={(!form.patientName || !form.phone || !form.location) ? { opacity: 0.5, cursor: 'not-allowed', transform: 'none', boxShadow: 'none' } : {}}
      >
        Continue to Review
        <ArrowRight />
      </button>
    </div>
  )

  /* ─── step 2 ─── */
  const Step2 = (
    <div className="step-enter flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-white mb-1">
          Review Your <span className="text-brand">Request</span>
        </h2>
        <p className="text-white/50 text-sm">Confirm details before payment.</p>
      </div>

      <div className="glass rounded-2xl p-5 flex flex-col gap-3">
        {[
          ['Emergency Type', form.emergencyType.charAt(0).toUpperCase() + form.emergencyType.slice(1)],
          ['Patient', form.patientName],
          ['Age', form.patientAge ? `${form.patientAge} years` : '—'],
          ['Phone', form.phone],
          ['Location', form.location],
          ['Service', { basic: 'Basic Life Support', advanced: 'Advanced Life Support', critical: 'Critical Care' }[form.service]],
          ...(form.notes ? [['Notes', form.notes]] : []),
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <span className="text-white/50 flex-shrink-0">{k}</span>
            <span className="text-white font-medium text-right">{v}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Service Fee</span>
          <span className="text-white">₦{price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Processing Fee</span>
          <span className="text-white">₦500</span>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex justify-between font-bold">
          <span className="text-white">Total</span>
          <span className="text-brand text-lg font-display">₦{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setStep(1)} className="btn-ghost flex-1 justify-center py-3.5">
          <ArrowLeft /> Back
        </button>
        <button onClick={() => setStep(3)} className="btn-brand flex-1 justify-center py-3.5">
          Proceed to Payment <ArrowRight />
        </button>
      </div>
    </div>
  )

  /* ─── step 3 ─── */
  const Step3 = (
    <div className="step-enter flex flex-col gap-6">
      <div>
        <h2 className="font-display text-3xl font-bold text-white mb-1">
          Secure <span className="text-brand">Payment</span>
        </h2>
        <p className="text-white/50 text-sm">Your payment is encrypted and secure.</p>
      </div>

      {/* Payment method tabs */}
      <div className="flex gap-2 glass rounded-xl p-1">
        {([['card', 'Credit / Debit Card'], ['momo', 'Mobile Money'], ['insurance', 'Insurance']] as [PayMethod, string][]).map(([m, label]) => (
          <button
            key={m}
            onClick={() => setPay(m)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 ${
              pay === m ? 'bg-brand text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Card form */}
      {pay === 'card' && (
        <div className="step-enter flex flex-col gap-4">
          {/* Card preview */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden h-44"
            style={{
              background: 'linear-gradient(135deg, #1a0808 0%, #2d0b0b 50%, #1a0808 100%)',
              boxShadow: '0 10px 40px rgba(212,31,38,0.25)',
            }}
          >
            <div className="absolute top-4 right-4 flex gap-1 opacity-70">
              <div className="w-8 h-8 rounded-full bg-brand/80" />
              <div className="w-8 h-8 rounded-full bg-brand-dark/80 -ml-3" />
            </div>
            <div className="absolute top-4 left-5 w-8 h-6 rounded-sm bg-yellow-300/80"
              style={{ background: 'linear-gradient(135deg, #fcd34d, #f59e0b)' }} />
            <div className="absolute bottom-12 left-5 text-white font-mono text-base tracking-[0.2em] font-medium">
              {card.number || '•••• •••• •••• ••••'}
            </div>
            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
              <div>
                <div className="text-white/40 text-[9px] uppercase tracking-wider">Card Holder</div>
                <div className="text-white text-xs font-semibold mt-0.5">{card.name || 'YOUR NAME'}</div>
              </div>
              <div>
                <div className="text-white/40 text-[9px] uppercase tracking-wider">Expires</div>
                <div className="text-white text-xs font-semibold mt-0.5">{card.expiry || 'MM/YY'}</div>
              </div>
            </div>
          </div>

          <InputField label="Card Number"     id="cn" placeholder="1234 5678 9012 3456"
            value={card.number} onChange={v => setCard(c => ({ ...c, number: fmtCardNum(v) }))} icon={<CardIcon />} />
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <InputField label="Cardholder Name" id="cname" placeholder="As on card"
                value={card.name} onChange={v => setCard(c => ({ ...c, name: v }))} icon={<UserIcon />} />
            </div>
            <InputField label="Expiry" id="exp" placeholder="MM/YY"
              value={card.expiry} onChange={v => setCard(c => ({ ...c, expiry: fmtExpiry(v) }))} icon={<CalIcon />} />
          </div>
          <InputField label="CVV" id="cvv" type="password" placeholder="•••"
            value={card.cvv} onChange={v => setCard(c => ({ ...c, cvv: v.slice(0,3) }))} icon={<LockIcon />} />
        </div>
      )}

      {/* MoMo form */}
      {pay === 'momo' && (
        <div className="step-enter flex flex-col gap-4">
          <div className="flex gap-2">
            {(['mtn', 'opay', 'airtel'] as MomoNetwork[]).map(n => (
              <button
                key={n}
                onClick={() => setMomoNet(n)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                  momoNet === n ? 'bg-brand/20 border-brand text-white' : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/25'
                }`}
              >
                {{ mtn: 'MTN MoMo', opay: 'OPay', airtel: 'Airtel Money' }[n]}
              </button>
            ))}
          </div>
          <InputField label="Mobile Money Number" id="momo" type="tel" placeholder="+234 XXX XXX XXXX"
            value={momo.number} onChange={v => setMomo({ number: v })} icon={<PhoneIcon />} />
          <div className="flex items-start gap-3 glass rounded-xl p-4 text-xs text-white/60">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            A payment prompt will be sent to your phone. Approve it to confirm the dispatch.
          </div>
        </div>
      )}

      {/* Insurance form */}
      {pay === 'insurance' && (
        <div className="step-enter flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Insurance Provider</label>
            <select
              className="field"
              value={ins.provider}
              onChange={e => setIns(i => ({ ...i, provider: e.target.value }))}
            >
              <option value="">Select provider…</option>
              {['NHIS', 'AXA Mansard Health', 'Leadway Health', 'Hygeia HMO', 'Reliance HMO'].map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <InputField label="Insurance ID / Member Number" id="insid" placeholder="e.g. NHIS-1234567"
            value={ins.id} onChange={v => setIns(i => ({ ...i, id: v }))} icon={<ShieldIcon />} />
        </div>
      )}

      {/* Security badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-white/40 py-1">
        <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        256-bit SSL Encrypted · PCI DSS Compliant
      </div>

      {/* Amount due */}
      <div className="glass rounded-xl p-4 flex justify-between items-center">
        <span className="text-sm text-white/60">Amount Due</span>
        <span className="font-display font-bold text-brand text-xl">₦{total.toLocaleString()}</span>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setStep(2)} className="btn-ghost flex-1 justify-center py-3.5">
          <ArrowLeft /> Back
        </button>
        <button
          onClick={handlePay}
          disabled={processing}
          className="btn-brand flex-1 justify-center py-3.5 font-bold relative overflow-hidden"
          style={{ boxShadow: '0 8px 24px rgba(212,31,38,0.3)' }}
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M12 2a10 10 0 010 20" opacity="0.75"/></svg>
              Processing…
            </span>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Pay &amp; Dispatch
            </>
          )}
        </button>
      </div>
    </div>
  )

  /* ─── Render ─── */
  return (
    <section className="section-page pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid lg:grid-cols-2 gap-10 items-start">

        {/* LEFT: Form */}
        <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          {/* Step indicator */}
          <div className="flex items-center mb-8">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step === s ? 'bg-brand text-white shadow-lg' :
                    step > s  ? 'bg-green-500 text-white' :
                                'bg-white/10 text-white/40'
                  }`}>
                    {step > s ? '✓' : s}
                  </div>
                  <span className={`text-[10px] ${step === s ? 'text-brand' : 'text-white/30'}`}>
                    {['Details', 'Review', 'Payment'][i]}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-px mx-2 mb-4 transition-all duration-300 ${step > s ? 'bg-brand' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && Step1}
          {step === 2 && Step2}
          {step === 3 && Step3}
        </div>

        {/* RIGHT: Map panel */}
        <div className="flex flex-col gap-4 sticky top-24">
          <div className="glass rounded-3xl overflow-hidden shadow-2xl" style={{ height: 400 }}>
            <MapMock />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InfoCard
              icon={<svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
              title="Average ETA"
              value="4–7 minutes"
            />
            <InfoCard
              icon={<svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
              title="Nearest Unit"
              value="AMB-07 · 2.1 km"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Sub-components ─── */
function InputField({
  label, id, type = 'text', placeholder, value, onChange, icon,
}: {
  label: string; id: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3.5 text-white/30 w-4 h-4 flex-shrink-0">{icon}</span>}
        <input
          id={id}
          type={type}
          className={`field ${icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-white/50">{title}</div>
        <div className="text-sm font-semibold text-white">{value}</div>
      </div>
    </div>
  )
}

function MapMock() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'var(--map-base)' }}>
      {/* SVG street grid */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="var(--map-base)"/>
        {/* Horizontal roads */}
        <rect x="0" y="55" width="400" height="10" fill="var(--map-road)" rx="0"/>
        <rect x="0" y="130" width="400" height="14" fill="var(--map-road-2)" rx="0"/>
        <rect x="0" y="205" width="400" height="10" fill="var(--map-road)" rx="0"/>
        <rect x="0" y="275" width="400" height="14" fill="var(--map-road-2)" rx="0"/>
        <rect x="0" y="345" width="400" height="10" fill="var(--map-road)" rx="0"/>
        {/* Vertical roads */}
        <rect x="55" y="0" width="10" height="400" fill="var(--map-road)" rx="0"/>
        <rect x="140" y="0" width="14" height="400" fill="var(--map-road-2)" rx="0"/>
        <rect x="220" y="0" width="10" height="400" fill="var(--map-road)" rx="0"/>
        <rect x="300" y="0" width="14" height="400" fill="var(--map-road-2)" rx="0"/>
        <rect x="370" y="0" width="10" height="400" fill="var(--map-road)" rx="0"/>
        {/* Blocks */}
        <rect x="65" y="65" width="65" height="55" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="154" y="65" width="56" height="55" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="230" y="65" width="60" height="55" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="314" y="65" width="46" height="55" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="65" y="144" width="65" height="51" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="154" y="144" width="56" height="51" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="230" y="144" width="60" height="51" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="314" y="144" width="46" height="51" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="65" y="215" width="65" height="50" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="154" y="215" width="56" height="50" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="230" y="215" width="60" height="50" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="314" y="215" width="46" height="50" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="65" y="289" width="65" height="46" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="154" y="289" width="56" height="46" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="230" y="289" width="60" height="46" rx="3" fill="var(--map-block)" opacity="0.9"/>
        <rect x="314" y="289" width="46" height="46" rx="3" fill="var(--map-block)" opacity="0.9"/>
        {/* Route */}
        <path d="M 80 320 L 80 130 L 230 130 L 230 205" stroke="#D41F26" strokeWidth="3" fill="none" className="route-dash" opacity="0.8"/>
        {/* Destination circle */}
        <circle cx="230" cy="210" r="14" fill="rgba(212,31,38,0.15)" stroke="#D41F26" strokeWidth="1.5"/>
        <circle cx="230" cy="210" r="6" fill="#D41F26"/>
      </svg>

      {/* You pin */}
      <div className="absolute" style={{ left: '54%', top: '47%', transform: 'translate(-50%,-100%)' }}>
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 drop-shadow-lg" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="#D41F26"/>
            <circle cx="12" cy="10" r="3.5" fill="white"/>
          </svg>
          <span className="text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded mt-0.5">You</span>
        </div>
      </div>

      {/* Ambulance pin (animated) */}
      <div className="map-amb-pin" style={{ transform: 'translate(-50%,-50%)' }}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
            style={{ boxShadow: '0 0 12px #3b82f6' }}>
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.5h-1.5l-3-4H9.5l-3 4H5a2 2 0 00-2 2V17a1 1 0 001 1h1a3 3 0 006 0h4a3 3 0 006 0h1a1 1 0 001-1V8.5a2 2 0 00-2-2z"/>
            </svg>
          </div>
          <span className="text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">AMB</span>
        </div>
      </div>

      {/* Map overlay gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--map-overlay-from), transparent)' }} />

      {/* Scale label */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[9px]" style={{ color: 'var(--text-faint)' }}>
        <div className="w-8 h-0.5" style={{ background: 'var(--text-faint)' }} />
        <span>500 m</span>
      </div>
    </div>
  )
}

/* ─── Icons ─── */
function HeartIcon()    { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> }
function ShieldIcon()   { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
function WindIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/></svg> }
function ClockIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> }
function AlertIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
function InfoIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> }
function UserIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function CalIcon()      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> }
function PhoneIcon()    { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg> }
function PinIcon()      { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function CrosshairIcon(){ return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> }
function CardIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> }
function LockIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> }
function ArrowRight()   { return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg> }
function ArrowLeft()    { return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> }
