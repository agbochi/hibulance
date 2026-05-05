'use client'
import { useEffect } from 'react'

export default function ConfirmOverlay({
  onClose, onTrack,
}: { onClose: () => void; onTrack: () => void }) {
  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="glass rounded-3xl p-8 md:p-10 w-full max-w-md flex flex-col items-center gap-6 animate-slide-up text-center shadow-2xl"
        style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)' }}
      >
        {/* Checkmark animation */}
        <div className="w-20 h-20">
          <svg viewBox="0 0 52 52" className="w-full h-full">
            <circle cx="26" cy="26" r="25" className="check-circle" />
            <path d="M14.1 27.2l7.1 7.2 16.7-16.8" className="check-mark" />
          </svg>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Ambulance Dispatched!
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Payment confirmed. Unit <strong className="text-white">AMB-07</strong> is on
            the way. Estimated arrival: <strong className="text-brand">4 minutes</strong>.
          </p>
        </div>

        {/* Booking reference */}
        <div className="w-full rounded-2xl p-4 flex flex-col items-center gap-1"
          style={{ background: 'rgba(212,31,38,0.08)', border: '1px dashed rgba(212,31,38,0.3)' }}>
          <span className="text-xs text-white/40 uppercase tracking-wider">Booking Reference</span>
          <span className="font-display font-bold text-brand text-xl tracking-wide">HIB-2026-0042</span>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span className="live-dot" />
          Real-time tracking is now active
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onTrack}
            className="btn-brand w-full justify-center py-4 font-bold text-base"
            style={{ boxShadow: '0 8px 28px rgba(212,31,38,0.35)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            Track Ambulance Live
          </button>
          <button onClick={onClose} className="btn-ghost w-full justify-center py-3.5 text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
