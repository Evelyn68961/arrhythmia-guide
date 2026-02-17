import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SVT from './SVT'
import AF from './AF'
import VT from './VT'
import VF from './VF'

export default function Tachy() {
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
        <h1>Tachyarrhythmias</h1>
        <nav className="section-nav">
          <span className="nav-label">Supraventricular</span>
          <button onClick={() => scrollToSection('svt')}>SVT</button>
          <button onClick={() => scrollToSection('af')}>AF</button>
          <span className="section-label">Ventricular</span>
          <button onClick={() => scrollToSection('vt')}>VT</button>
          <button onClick={() => scrollToSection('vf')}>VF</button>
        </nav>
      </div>

      {/* SVT Section */}
      <section id="svt" className="section-wrapper">
        <SVT />
      </section>

      {/* AF Section */}
      <section id="af" className="section-wrapper">
        <AF />
      </section>

      {/* VT Section */}
      <section id="vt" className="section-wrapper">
        <VT />
      </section>

      {/* VF Section */}
      <section id="vf" className="section-wrapper">
        <VF />
      </section>
    </div>
  )
}
