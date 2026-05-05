'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import RequestSection from '@/components/RequestSection'
import TrackSection from '@/components/TrackSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import ConfirmOverlay from '@/components/ConfirmOverlay'

export type ActiveSection = 'hero' | 'request' | 'track'

export default function Home() {
  const [active, setActive] = useState<ActiveSection>('hero')
  const [showConfirm, setShowConfirm] = useState(false)

  const navigate = (section: ActiveSection) => {
    setActive(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar active={active} navigate={navigate} />

      <main>
        {active === 'hero'    && <HeroSection navigate={navigate} />}
        {active === 'request' && <RequestSection onConfirm={() => setShowConfirm(true)} />}
        {active === 'track'   && <TrackSection />}
      </main>

      <AboutSection />
      <Footer navigate={navigate} />

      {showConfirm && (
        <ConfirmOverlay
          onClose={() => setShowConfirm(false)}
          onTrack={() => { navigate('track'); setShowConfirm(false) }}
        />
      )}
    </>
  )
}
