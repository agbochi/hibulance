'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { ActiveSection } from '@/app/page'
import { useTheme } from '@/components/ThemeProvider'

function SunIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  )
}

export default function Navbar({
  active, navigate,
}: { active: ActiveSection; navigate: (s: ActiveSection) => void }) {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const link = (label: string, section: ActiveSection) => (
    <button
      onClick={() => { navigate(section); setOpen(false) }}
      className={`text-sm font-medium transition-colors duration-200 ${
        active === section ? 'text-brand' : 'text-[color:var(--text-muted)] hover:text-[color:var(--text)]'
      }`}
    >
      {label}
    </button>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('hero')}
          className="flex items-center gap-3 group"
        >
          <Image src="/logo.jpeg" alt="Hibulance logo" width={36} height={36} className="rounded-full object-cover" />
          <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--text)' }}>
            hibulance
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {link('Home', 'hero')}
          {link('Request', 'request')}
          {link('Track', 'track')}
          <a
            href="#about"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            About
          </a>
        </div>

        {/* Theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)', color: 'var(--text-muted)' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => navigate('request')}
            className="flex items-center gap-2 btn-brand text-sm px-4 py-2"
          >
          <span className="live-dot" />
            Emergency Request
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--text)' }} />
          <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? 'opacity-0' : ''}`} style={{ background: 'var(--text)' }} />
          <span className={`block w-5 h-0.5 transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--text)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass px-6 py-5 flex flex-col gap-4 animate-fade-in" style={{ borderTop: '1px solid var(--border)' }}>
          {link('Home', 'hero')}
          {link('Request', 'request')}
          {link('Track', 'track')}
          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
          >
            About
          </a>
          <div className="flex gap-3 pt-1">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)', color: 'var(--text-muted)' }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => { navigate('request'); setOpen(false) }}
              className="btn-brand text-sm px-4 py-2.5 flex-1 justify-center"
            >
              <span className="live-dot" />
              Emergency Request
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
