import Image from 'next/image'
import type { ActiveSection } from '@/app/page'

export default function Footer({ navigate }: { navigate: (s: ActiveSection) => void }) {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <button
          onClick={() => navigate('hero')}
          className="flex items-center gap-3 group"
        >
          <Image src="/logo.jpeg" alt="Hibulance logo" width={32} height={32} className="rounded-full object-cover" />
          <span className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>hibulance</span>
        </button>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--text-faint)' }}>
          {['Privacy', 'Terms', 'Support', 'Contact'].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors duration-200">{l}</a>
          ))}
        </div>

        {/* Emergency line */}
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-faint)' }}>
          <span className="live-dot" />
          <span>Emergency line: <a href="tel:+2340000000000" className="text-brand hover:underline">112 (NEMA)</a></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.04] text-center text-xs text-white/25">
        Ã‚Â© 2026 Hibulance. All rights reserved. Built for Nigeria.
      </div>
    </footer>
  )
}
