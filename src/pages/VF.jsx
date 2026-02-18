import { useState } from 'react'
import data from '../data/vf.json'
import introImg from '../assets/images/VF-intro.png'
import treatImg from '../assets/images/VF-management.png'
import preventImg from '../assets/images/VF-prevention.png'

export default function VF() {
  const [lang, setLang] = useState('en')
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Etiology', zh: '病因' }, img: introImg },
    { label: { en: 'Treatment', zh: '治療' }, img: treatImg },
    { label: { en: 'Prevention', zh: '預防' }, img: preventImg }
  ]

  return (
    <div className="content">
      {/* Language Toggle */}
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

      {/* Title */}
      <h2>{data.topic[lang]}</h2>

      {/* Section Tabs */}
      <div className="section-tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {tab.label[lang]}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="two-column">
        <div className="column-left">
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <img src={introImg} alt="VF Overview" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={introImg} alt="VF Etiology" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={treatImg} alt="VF Treatment" />
          </div>
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <img src={preventImg} alt="VF Prevention" />
          </div>
          <div className="references">
            <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
            <ul>
              <li>
                <a href="https://www.msdmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/ventricular-fibrillation-vf" target="_blank" rel="noopener noreferrer">
                  MSD Manual - Ventricular Fibrillation
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK537120/" target="_blank" rel="noopener noreferrer">
                  NCBI - Ventricular Fibrillation
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="column-right">
          {/* Tab 0: Overview */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
              <h3>{data.topic[lang]}</h3>
              <p>{data.definition[lang]}</p>
              
              <h3>{data.clinical_presentation[lang]}</h3>
              <strong>{data.clinical_presentation.warning[lang]}</strong>
              <ul>
                {data.clinical_presentation.signs.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>

              <h3>{data.ecg_characteristics[lang]}</h3>
              <ul>
                <li>{data.ecg_characteristics.general.rate[lang]}</li>
                <li>{data.ecg_characteristics.general.rhythm[lang]}</li>
                <li>{data.ecg_characteristics.general.qrs_complex[lang]}</li>
              </ul>
              {data.ecg_characteristics.types.map((item) => (
                <div key={item.type} >
                  <h4>{item.name[lang]}</h4>
                  <p>{item.description[lang]}</p>
                </div>
              ))}               
          </div> 

          {/* Tab 1: Etiology */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
              <h3>{data.etiology[lang]}</h3>
              <h4>{data.etiology.primary[lang]}</h4>
              <strong>{data.etiology.primary.category[lang]}</strong>
              <ul>
                {data.etiology.primary.items.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>              
              <h4>{data.etiology.secondary[lang]}</h4>
              <h5>{data.etiology.secondary.structural_heart_disease[lang]}</h5>
              <ul>
                {data.etiology.secondary.structural_heart_disease.items.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>  
              <h5>{data.etiology.secondary.electrolyte_abnormalities[lang]}</h5>
              <ul>
                {data.etiology.secondary.electrolyte_abnormalities.items.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>  
              <h5>{data.etiology.secondary.metabolic_systemic_factors[lang]}</h5>
              <ul>
                {data.etiology.secondary.metabolic_systemic_factors.items.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>             
          </div>

          {/* Tab 2: Treatment */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <h3>{lang === 'zh' ? '治療' : 'Treatment'}</h3>
            <h4>{data.treatment.overview[lang]}</h4>
            <h4>{data.treatment.immediate_actions[lang]}</h4>
            
            <h4>{data.treatment.defibrillation[lang]}</h4>
            <ul>
              <li>{data.treatment.defibrillation.energy_settings.biphasic[lang]}</li>
              <li>{data.treatment.defibrillation.energy_settings.monophasic[lang]}</li>
            </ul>
            
            <h4>{data.treatment.high_quality_cpr[lang]}</h4>
            <ul>
              {data.treatment.high_quality_cpr.parameters.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul>   
            
            <h4>{data.treatment.pharmacotherapy[lang]}</h4>
            {data.treatment.pharmacotherapy.agents.map((item) => (
              <div key={item.drug} >
                <h5>{item.drug}</h5>
                <p>{item.dose[lang]}</p>
                <p>{item.timing[lang]}</p>
              </div>
            ))}  
            
            <h4>{data.treatment.reversible_causes[lang]}</h4>
            <h5>{data.treatment.reversible_causes.h_causes[lang]}</h5>
            <ul>
              {data.treatment.reversible_causes.h_causes.items.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul> 
            <h5>{data.treatment.reversible_causes.t_causes[lang]}</h5>
            <ul>
              {data.treatment.reversible_causes.t_causes.items.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul> 

          </div>
        </div>  


      </div>
    </div>  
  )
}  