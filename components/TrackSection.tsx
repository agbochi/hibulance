'use client'
import { useState } from 'react'

const DEMO = {
  ref: 'HIB-2026-0042',
  status: 'En Route',
  unit: 'AMB-07',
  paramedic: 'Dr. Emeka Okafor',
  role: 'Lead Paramedic Ã‚Â· Lagos',
  eta: '3 min',
  steps: [
    { label: 'Request Received',     time: '10:32 AM', done: true,    active: false },
    { label: 'Ambulance Dispatched', time: '10:34 AM', done: true,    active: false },
    { label: 'En Route to You',      time: 'ETA 3 min',done: false,   active: true  },
    { label: 'Arrived',              time: 'Ã¢â‚¬â€',         done: false,  active: false },
  ],
}

export default function TrackSection() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)

  const handleTrack = () => {
    if (query.trim()) setSearched(true)
  }

  return (
    <section className="section-page pt-16">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-3 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Track Your <span className="text-brand">Ambulance</span>
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            Enter your booking reference or phone number to see real-time status.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 animate-slide-up [animation-delay:0.1s]">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="field pl-11 h-13 py-3.5"
              placeholder="Booking ref (e.g. HIB-2026-0042) or phone"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
          </div>
          <button
            onClick={handleTrack}
            className="btn-brand px-6 py-3.5 font-bold"
            style={{ boxShadow: '0 6px 20px rgba(212,31,38,0.3)' }}
          >
            Track
          </button>
        </div>

        {/* Demo hint */}
        {!searched && (
          <div className="flex items-center gap-2 text-xs text-white/30 justify-center animate-fade-in">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Try typing anything and click Track to see a demo
          </div>
        )}

        {/* Tracking result */}
        {searched && (
          <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl animate-slide-up"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,31,38,0.1)' }}>

            {/* Booking header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-xs text-white/40 font-medium mb-1">Booking Reference</div>
                <div className="font-display text-xl font-bold text-white tracking-wide">{DEMO.ref}</div>
              </div>
              <div className="flex items-center gap-1.5 bg-brand/20 text-brand text-xs font-bold px-3 py-1.5 rounded-full border border-brand/30">
                <span className="live-dot" />
                {DEMO.status}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-0 mb-8">
              {DEMO.steps.map((s, i) => (
                <div key={i}>
                  <div className="flex items-start gap-4">
                    {/* Dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        s.done   ? 'bg-brand border-brand' :
                        s.active ? 'border-brand bg-brand/30 tl-dot-active' :
                                   'border-white/20 bg-transparent'
                      }`}>
                        {s.done && (
                          <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                      </div>
                      {i < DEMO.steps.length - 1 && (
                        <div className={`w-0.5 h-10 my-1 ${s.done ? 'bg-brand' : 'bg-white/10'}`} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pt-0">
                      <div className={`text-sm font-semibold ${s.active ? 'text-brand' : s.done ? 'text-white' : 'text-white/40'}`}>
                        {s.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${s.active ? 'text-brand/70' : 'text-white/30'}`}>{s.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ETA card */}
            <div className="rounded-2xl p-4 mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(212,31,38,0.15), rgba(212,31,38,0.05))', border: '1px solid rgba(212,31,38,0.2)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <div className="text-xs text-brand/70 font-medium">Estimated Arrival</div>
                  <div className="font-display font-bold text-white text-lg">{DEMO.eta}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xs text-white/40 mb-0.5">Unit</div>
                  <div className="font-bold text-white">{DEMO.unit}</div>
                </div>
              </div>
            </div>

            {/* Paramedic */}
            <div className="flex items-center gap-4 pt-5 border-t border-white/[0.08]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                J
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{DEMO.paramedic}</div>
                <div className="text-xs text-white/50">{DEMO.role} Ã‚Â· {DEMO.unit}</div>
              </div>
              <a
                href="tel:+233000000000"
                className="btn-brand px-4 py-2.5 text-sm font-bold"
                style={{ boxShadow: '0 4px 16px rgba(212,31,38,0.3)' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                </svg>
                Call
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
