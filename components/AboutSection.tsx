import Image from 'next/image'

export default function AboutSection() {
  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'HEFAMAA Certified',
      desc:  'All ambulance partners are fully licensed and certified by the Health Facility Monitoring and Accreditation Agency.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      ),
      title: 'Real-Time Dispatch',
      desc:  'AI-powered routing finds the nearest available unit and dispatches instantly.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Flexible Payment',
      desc:  'Pay by card, mobile money, or insurance — all secure and encrypted.',
    },
  ]

  return (
    <section id="about" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/8 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 w-fit text-xs font-semibold text-white/70 uppercase tracking-wider">
            About Us
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Nigeria&apos;s Leading<br />
            <span className="text-brand">Emergency Response</span><br />
            Platform
          </h2>
          <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Hibulance bridges the critical gap between emergencies and medical response.
            We partner with certified ambulance operators, hospitals, and paramedics to
            deliver rapid, reliable care — at the tap of a button.
          </p>
          <div className="flex flex-col gap-4 mt-2">
            {features.map(f => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <div className="font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{f.title}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: logo + stats */}
        <div className="flex flex-col items-center gap-8">
          <div
            className="w-52 h-52 rounded-full overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 0 80px rgba(212,31,38,0.4), 0 20px 60px rgba(0,0,0,0.5)' }}
          >
            <Image
              src="/logo.jpeg"
              alt="Hibulance logo"
              width={208}
              height={208}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {[
              { val: '4 min',  label: 'Avg. Response' },
              { val: '120+',   label: 'Active Units'  },
              { val: '98%',    label: 'Success Rate'  },
            ].map(s => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <div className="font-display font-bold text-brand text-2xl">{s.val}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
