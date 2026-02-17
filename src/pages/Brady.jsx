import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SND from './SND'
import AVBlock from './AVBlock'

export default function Brady() {
  const location = useLocation()

  // Scroll to section when hash exists on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.hash])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <div>
      <div className="section-header">
        <h1>Bradyarrhythmias</h1>
        <nav className="section-nav">
          <button onClick={() => scrollToSection('snd')}>
            Sinus Node Dysfunction (SND)
          </button>
          <button onClick={() => scrollToSection('avblock')}>
            AV Block
          </button>
        </nav>
      </div>

      {/* SND Section */}
      <section id="snd" className="section-wrapper">
        <SND />
      </section>

      {/* AV Block Section */}
      <section id="avblock" className="section-wrapper">
        <AVBlock />
      </section>
    </div>
  )
}