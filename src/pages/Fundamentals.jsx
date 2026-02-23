import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import cardiac_electro from './CardiacElectro'
import ecg_interpret from './ECGInterpret'
import arrhy_overview from './ArrhyOverview'


export default function Fundamentals() {
  const location = useLocation()
  const [lang, setLang] = useState('en')  // Shared language state

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
        <h1>{lang === 'en' ? 'Fundamentals' : '基礎知識'}</h1>
        
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
          <button onClick={() => scrollToSection('cardiac-electro')}>
            {lang === 'en' ? 'Cardiac Electrophysiology' : '心臟電生理學'}
          </button>
          <button onClick={() => scrollToSection('ecg-interpret')}>
            {lang === 'en' ? 'ECG Interpretation' : '心電圖判讀'}
          </button>
          <button onClick={() => scrollToSection('arrhy-overview')}>
            {lang === 'en' ? 'Arrhythmia Overview' : '心律不整概論'}
          </button>
        </nav>
      </div>

      <section id="cardiac-electro" className="section-wrapper">
        <CardiacElectro lang={lang} />
      </section>

      <section id="ecg-interpret" className="section-wrapper">
        <ECGInterpret lang={lang} />
      </section>

      <section id="arrhy-overview" className="section-wrapper">
        <ArrhyOverview lang={lang} />
      </section>
    </div>
  )
}