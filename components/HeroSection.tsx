'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { ActiveSection } from '@/app/page'

function StatCard({ target, unit, label }: { target: number; unit: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (ref.current) ref.current.textContent = Math.min(Math.round(start), target).toString()
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target])
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-0.5">
        <span ref={ref} className="text-3xl md:text-4xl font-display font-bold" style={{ color: 'var(--text)' }}>0</span>
        <span className="text-brand font-bold text-xl mb-0.5">{unit}</span>
      </div>
      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}

export default function HeroSection({ navigate }: { navigate: (s: ActiveSection) => void }) {
  return (
    <section className="section-page relative pt-16 flex flex-col justify-center overflow-hidden min-h-screen">

      {/* ── Crossfading photo background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Photo 1 — Nigerian paramedics */}
        <div className="absolute inset-0" style={{ animation: 'hero-crossfade 14s ease-in-out infinite' }}>
          <Image src="/med1.jpg" alt="" fill className="object-cover object-center" priority />
        </div>
        {/* Photo 2 — Medical instruments */}
        <div className="absolute inset-0" style={{ opacity: 0, animation: 'hero-crossfade 14s ease-in-out infinite 7s' }}>
          <Image src="/med2.jpg" alt="" fill className="object-cover object-center" />
        </div>
        {/* Theme-aware overlay for text readability */}
        <div className="absolute inset-0" style={{ background: 'var(--hero-photo-overlay)' }} />
      </div>

      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob-1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-brand/20 blur-[100px]" />
        <div className="animate-blob-2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand/8 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="flex flex-col gap-6 animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 w-fit text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            <span className="live-dot" />
            24/7 Emergency Response Active
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight" style={{ color: 'var(--text)' }}>
            Fast.{' '}
            <span style={{ color: 'var(--text-muted)' }}>Reliable.</span>
            <br />
            <span
              className="text-brand"
              style={{ textShadow: '0 0 40px rgba(212,31,38,0.45)' }}
            >
              Life&#x2011;Saving.
            </span>
          </h1>

          <p className="text-lg leading-relaxed max-w-md" style={{ color: 'var(--text-muted)' }}>
            Request a certified ambulance in seconds. Our fleet of paramedics is on
            standby — reaching you anywhere in the city within minutes.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('request')}
              className="btn-brand text-base px-7 py-3.5 text-lg font-bold shadow-lg"
              style={{ boxShadow: '0 8px 32px rgba(212,31,38,0.35)' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Request Ambulance
            </button>
            <button
              onClick={() => navigate('track')}
              className="btn-ghost text-base px-7 py-3.5 text-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
              Track Ambulance
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-2">
            <StatCard target={4}   unit="min" label="Avg. Response Time"  />
            <div className="w-px h-10" style={{ background: 'var(--border)' }} />
            <StatCard target={120} unit="+"   label="Ambulances Active"   />
            <div className="w-px h-10" style={{ background: 'var(--border)' }} />
            <StatCard target={98}  unit="%"   label="Success Rate"        />
          </div>
        </div>

        {/* RIGHT — Floating ambulance card */}
        <div className="flex justify-center items-center relative">
          {/* Pulse rings */}
          <div className="absolute rounded-full bg-brand/20 w-72 h-72 animate-pulse-ring" />
          <div className="absolute rounded-full bg-brand/15 w-72 h-72 animate-pulse-ring [animation-delay:0.7s]" />

          <div className="animate-float relative z-10 glass rounded-3xl p-6 w-80 shadow-2xl"
            style={{ boxShadow: '0 20px 60px rgba(212,31,38,0.2), 0 0 0 1px var(--border)' }}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center flex-shrink-0">
                <AmbulanceIcon />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Unit</div>
                <div className="font-bold font-display" style={{ color: 'var(--text)' }}>AMB-07</div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full animate-siren-red" />
                <div className="w-3.5 h-3.5 rounded-full animate-siren-blue [animation-delay:0.5s]" />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">En Route</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>ETA 3 min</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full overflow-hidden mb-5" style={{ background: 'var(--border)' }}>
              <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full animate-progress" />
            </div>

            {/* Paramedic */}
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                J
              </div>
              <div className="flex-1">
              <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Dr. Emeka Okafor</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Lead Paramedic · Lagos</div>
              </div>
              <div className="text-yellow-400 text-xs font-semibold">★ 4.9</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-current to-transparent animate-scroll-bounce" style={{ color: 'var(--text-muted)' }} />
      </div>
    </section>
  )
}

function AmbulanceIcon() {
  return (
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17h1m16 0h1M5 17V9l4-4h6l4 4v8" />
      <path d="M5 17H3V9l2-2" />
      <circle cx="7.5" cy="17.5" r="1.5" fill="white" stroke="none" />
      <circle cx="16.5" cy="17.5" r="1.5" fill="white" stroke="none" />
      <path d="M10 9v4M8 11h4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Full-viewport illustrated Nigerian city scene used as a faded hero background */
function HeroBgScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080408" stopOpacity="1"/>
          <stop offset="100%" stopColor="#0e0808" stopOpacity="1"/>
        </linearGradient>
        <radialGradient id="moonGlow" cx="75%" cy="18%" r="12%">
          <stop offset="0%" stopColor="#bb4444" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#D41F26" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill="url(#skyGrad)"/>
      <rect width="1440" height="900" fill="url(#moonGlow)"/>

      {/* Stars */}
      {[
        [120,60],[200,100],[340,45],[450,80],[550,55],[650,90],[750,40],[870,70],
        [980,50],[1080,85],[1180,60],[1300,75],[1380,45],[160,130],[420,120],
        [600,140],[800,110],[1000,130],[1200,100],[1400,115],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.5" fill="#ddaaaa" opacity={0.25 + (i % 3) * 0.1}/>
      ))}

      {/* Moon */}
      <circle cx="1080" cy="130" r="45" fill="#090408" opacity="0.9"/>
      <circle cx="1080" cy="130" r="40" fill="#D41F26" opacity="0.12"/>
      <circle cx="1096" cy="118" r="28" fill="#080408" opacity="0.6"/>

      {/* ── Nigerian flag silhouette (subtle, far background) ── */}
      {/* Far buildings — green-tinged dark */}
      <rect x="0"    y="480" width="60"  height="420" fill="#0e0808" opacity="0.55"/>
      <rect x="55"   y="520" width="45"  height="380" fill="#0c0808" opacity="0.55"/>
      <rect x="95"   y="460" width="70"  height="440" fill="#0e0808" opacity="0.55"/>
      <rect x="160"  y="500" width="50"  height="400" fill="#0c0808" opacity="0.55"/>
      <rect x="205"  y="440" width="80"  height="460" fill="#140808" opacity="0.55"/>
      <rect x="280"  y="490" width="55"  height="410" fill="#0e0808" opacity="0.55"/>
      <rect x="330"  y="455" width="65"  height="445" fill="#0e0808" opacity="0.55"/>
      <rect x="390"  y="510" width="40"  height="390" fill="#0c0808" opacity="0.55"/>
      <rect x="425"  y="430" width="90"  height="470" fill="#160808" opacity="0.55"/>
      <rect x="510"  y="470" width="60"  height="430" fill="#0e0808" opacity="0.55"/>
      <rect x="565"  y="490" width="55"  height="410" fill="#0e0808" opacity="0.55"/>
      <rect x="615"  y="445" width="80"  height="455" fill="#140808" opacity="0.55"/>
      <rect x="690"  y="475" width="50"  height="425" fill="#0c0808" opacity="0.55"/>
      <rect x="735"  y="435" width="95"  height="465" fill="#180808" opacity="0.55"/>
      <rect x="825"  y="465" width="60"  height="435" fill="#0e0808" opacity="0.55"/>
      <rect x="880"  y="485" width="50"  height="415" fill="#0c0808" opacity="0.55"/>
      <rect x="925"  y="450" width="75"  height="450" fill="#0e0808" opacity="0.55"/>
      <rect x="995"  y="480" width="55"  height="420" fill="#0c0808" opacity="0.55"/>
      <rect x="1045" y="440" width="85"  height="460" fill="#160808" opacity="0.55"/>
      <rect x="1125" y="470" width="60"  height="430" fill="#0e0808" opacity="0.55"/>
      <rect x="1180" y="490" width="50"  height="410" fill="#0e0808" opacity="0.55"/>
      <rect x="1225" y="455" width="70"  height="445" fill="#140808" opacity="0.55"/>
      <rect x="1290" y="480" width="55"  height="420" fill="#0c0808" opacity="0.55"/>
      <rect x="1340" y="445" width="80"  height="455" fill="#0e0808" opacity="0.55"/>
      <rect x="1415" y="470" width="50"  height="430" fill="#0e0808" opacity="0.55"/>

      {/* Building windows — Nigerian green tint */}
      {[
        [15,510],[30,510],[15,535],[30,535],[15,560],[30,560],
        [100,480],[115,480],[100,505],[115,505],[100,530],
        [215,460],[230,460],[215,485],[230,485],[215,510],[230,510],[215,535],
        [440,450],[455,450],[470,450],[440,475],[455,475],[470,475],[440,500],[455,500],
        [745,455],[760,455],[775,455],[745,480],[760,480],[775,480],[745,505],[760,505],
        [935,470],[950,470],[965,470],[935,495],[950,495],[965,495],
        [1055,460],[1070,460],[1085,460],[1055,485],[1070,485],[1085,485],[1055,510],
        [1235,475],[1250,475],[1265,475],[1235,500],[1250,500],[1265,500],
        [1350,465],[1365,465],[1350,490],[1365,490],[1350,515],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="6" rx="1"
          fill="#D41F26" opacity={0.18 + (i % 4) * 0.07}/>
      ))}

      {/* Road / ground */}
      <rect x="0" y="740" width="1440" height="160" fill="#0e0808" opacity="0.85"/>
      <rect x="0" y="755" width="1440" height="3" fill="#0e0808" opacity="0.6"/>
      <rect x="0" y="810" width="1440" height="3" fill="#0e0808" opacity="0.6"/>
      {/* Centre dashes — Nigerian green */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect key={i} x={i * 80 + 10} y="780" width="50" height="4" rx="2"
          fill="#D41F26" opacity="0.3"/>
      ))}

      {/* ── Nigerian ambulance (white body, green cross/stripe) ── */}
      <g transform="translate(320, 700)">
        {/* Body — white/light */}
        <rect x="0" y="0" width="160" height="80" rx="8" fill="#edd8d8" opacity="0.9"/>
        {/* Cab */}
        <rect x="100" y="-25" width="60" height="45" rx="6" fill="#edd8d8" opacity="0.9"/>
        {/* Nigerian green stripe */}
        <rect x="0" y="20" width="160" height="12" fill="#D41F26" opacity="0.7"/>
        {/* Green cross — Nigerian health symbol */}
        <rect x="35" y="10" width="30" height="10" rx="2" fill="#D41F26" opacity="0.8"/>
        <rect x="45" y="4" width="10" height="22" rx="2" fill="#D41F26" opacity="0.8"/>
        {/* "AMBULANCE" text bar */}
        <rect x="0" y="55" width="95" height="12" fill="#a01219" opacity="0.4"/>
        {/* Windshield */}
        <rect x="110" y="-20" width="44" height="30" rx="4" fill="#dd8888" opacity="0.2"/>
        {/* Wheels */}
        <circle cx="30" cy="82" r="18" fill="#0a0808"/>
        <circle cx="30" cy="82" r="10" fill="#120808"/>
        <circle cx="130" cy="82" r="18" fill="#0a0808"/>
        <circle cx="130" cy="82" r="10" fill="#120808"/>
        {/* Siren lights — green + blue (Nigerian) */}
        <rect x="40" y="-6" width="16" height="8" rx="3" fill="#D41F26" opacity="0.95"/>
        <rect x="60" y="-6" width="16" height="8" rx="3" fill="#3b82f6" opacity="0.75"/>
        {/* Siren glow */}
        <ellipse cx="48" cy="-2" rx="20" ry="10" fill="#D41F26" opacity="0.15"/>
        {/* Motion blur */}
        <rect x="-60" y="30" width="55" height="3" rx="1.5" fill="#D41F26" opacity="0.15"/>
        <rect x="-80" y="40" width="70" height="2" rx="1" fill="#D41F26" opacity="0.10"/>
        <rect x="-45" y="50" width="40" height="2" rx="1" fill="#D41F26" opacity="0.08"/>
      </g>

      {/* ── Second distant ambulance ── */}
      <g transform="translate(980, 715)" opacity="0.6">
        <rect x="0" y="0" width="110" height="55" rx="6" fill="#e8c8c8"/>
        <rect x="70" y="-18" width="42" height="32" rx="4" fill="#e8c8c8"/>
        <rect x="0" y="14" width="110" height="8" fill="#D41F26" opacity="0.6"/>
        <circle cx="20" cy="57" r="13" fill="#0a0808"/>
        <circle cx="90" cy="57" r="13" fill="#0a0808"/>
        <rect x="28" y="-4" width="11" height="6" rx="2" fill="#D41F26" opacity="0.9"/>
        <rect x="42" y="-4" width="11" height="6" rx="2" fill="#3b82f6" opacity="0.6"/>
      </g>

      {/* ── Nigerian hospital building (green cross) ── */}
      <rect x="1050" y="320" width="280" height="580" fill="#140808" opacity="0.75"/>
      {/* Hospital green cross sign */}
      <rect x="1155" y="350" width="70" height="24" rx="4" fill="#D41F26" opacity="0.6"/>
      <rect x="1177" y="332" width="26" height="60" rx="4" fill="#D41F26" opacity="0.6"/>
      {/* "GENERAL HOSPITAL" sign area */}
      <rect x="1060" y="395" width="260" height="16" rx="3" fill="#a01219" opacity="0.3"/>
      {/* Hospital windows grid */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <rect key={`hw-${row}-${col}`}
            x={1065 + col * 62} y={420 + row * 72}
            width="38" height="48" rx="3"
            fill="#D41F26" opacity={0.07 + (row + col) % 3 * 0.05}/>
        ))
      )}
      {/* Entrance */}
      <rect x="1148" y="780" width="84" height="120" rx="4" fill="#090408" opacity="0.9"/>
      <rect x="1148" y="780" width="84" height="8" fill="#D41F26" opacity="0.4"/>

      {/* Ground glow from ambulance lights */}
      <ellipse cx="400" cy="755" rx="120" ry="20" fill="#D41F26" opacity="0.07"/>
      <ellipse cx="1035" cy="758" rx="80" ry="15" fill="#D41F26" opacity="0.05"/>

      {/* Vignette fades */}
      <defs>
        <linearGradient id="vigTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#080808" stopOpacity="1"/>
          <stop offset="35%" stopColor="#080808" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="vigBot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="#080808" stopOpacity="0"/>
          <stop offset="100%" stopColor="#080808" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#vigTop)"/>
      <rect width="1440" height="900" fill="url(#vigBot)"/>
    </svg>
  )
}
