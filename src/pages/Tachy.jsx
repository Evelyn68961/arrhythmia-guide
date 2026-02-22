import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SVT from './SVT'
import AF from './AF'
import VT from './VT'
import VF from './VF'

export default function Tachy() {
  const location = useLocation()
  const [lang, setLang] = useState('en') 

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
        <h1>{lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}</h1>
        
        {/* Single language toggle */}
        <div className="lang-toggle">
          <button 
            className={lang === 'en' ? 'active' : ''} 
            onClick={() => setLang('en')}
          >
            Eng
          </button>
          <button 
            className={lang === 'zh' ? 'active' : ''} 
            onClick={() => setLang('zh')}
          >
            中文
          </button>
        </div>

        <nav className="section-nav">
          <button onClick={() => scrollToSection('svt')}>
            {lang === 'en' ? 'Supraventricular Tachycardia (SVT)' : '上心室心搏過速'}
          </button>
          <button onClick={() => scrollToSection('af')}>
            {lang === 'en' ? 'Atrial Fibrillation (AF)' : '心房顫動'}
          </button>
          <button onClick={() => scrollToSection('vt')}>
            {lang === 'en' ? 'Ventricular Tachycardia (VT)' : '心室心搏過速'}
          </button>
          <button onClick={() => scrollToSection('vf')}>
            {lang === 'en' ? 'Ventricular Fibrillation (VF)' : '心室顫動'}
          </button>
        </nav>
      </div>

      <section id="svt" className="section-wrapper">
        <SVT lang={lang} />
      </section>

      <section id="af" className="section-wrapper">
        <AF lang={lang} />
      </section>

      <section id="vt" className="section-wrapper">
        <VT lang={lang} />
      </section>

      <section id="vf" className="section-wrapper">
        <VF lang={lang} />
      </section>
    </div>
  )
}
