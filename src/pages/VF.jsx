import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import data from '../data/vf.json'
import introImg from '../assets/images/VF-intro.png'
import etiImg from '../assets/images/VF-etiology.png'
import treatImg from '../assets/images/VF-management.png'
import preventImg from '../assets/images/VF-prevention.png'

export default function VF() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview',   zh: '概述' }, img: introImg },
    { label: { en: 'Etiology',   zh: '病因' }, img: etiImg },
    { label: { en: 'Treatment',  zh: '治療' }, img: treatImg },
    { label: { en: 'Prevention', zh: '預防' }, img: preventImg }
  ]

  return (
    <div className="content">

      {/* Title + tabs in one row */}
      <div className="content-header">
        <h2>{data.topic[lang]}</h2>

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
      </div>

      {/* Two Column Layout */}
      <div className="two-column">
        <div className="column-left">
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <img src={introImg} alt="VF Overview" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={etiImg} alt="VF Etiology" />
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
              <p>{data.definition[lang]}</p>
              <hr />
              
              <h4>{data.clinical_presentation[lang]}</h4>
              <h5>{data.clinical_presentation.warning[lang]}</h5>
              <ul>
                {data.clinical_presentation.signs.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>
              <hr />

              <h4>{data.ecg_characteristics[lang]}</h4>
              <ul>
                <li>{data.ecg_characteristics.general.rate[lang]}</li>
                <li>{data.ecg_characteristics.general.rhythm[lang]}</li>
                <li>{data.ecg_characteristics.general.qrs_complex[lang]}</li>
              </ul>
              {data.ecg_characteristics.types.map((item) => (
                <div key={item.type} >
                  <p><strong>{item.name[lang]}</strong>{" — "}{item.description[lang]}</p>
                </div>
              ))}               
          </div> 

          {/* Tab 1: Etiology */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
              <h3>{data.etiology[lang]}</h3>
              <h4>{data.etiology.primary[lang]}</h4>
              <h5>{data.etiology.primary.category[lang]}</h5>
              <ul>
                {data.etiology.primary.items.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>
              <br />              
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
            <h3>{data.treatment.overview[lang]}</h3>
            <h4>{data.treatment.immediate_actions[lang]}</h4>
            <ul>
              {data.treatment.immediate_actions.steps.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul>              
            <br /> 

            <h4>{data.treatment.defibrillation[lang]}</h4>
            <div className='small-two-col'>
              <div>
                <h5>{data.treatment.defibrillation.energy_settings.title[lang]}</h5>
                <ul>
                  <li>{data.treatment.defibrillation.energy_settings.biphasic[lang]}</li>
                  <li>{data.treatment.defibrillation.energy_settings.monophasic[lang]}</li>
                </ul>
              </div>
              <div>
                <h5>{data.treatment.defibrillation.protocol.title[lang]}</h5>
                <ul>
                  {data.treatment.defibrillation.protocol.steps.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul>               
              </div>              
            </div>
            <br /> 
           
            <h4>{data.treatment.high_quality_cpr[lang]}</h4>
            <ul>
              {data.treatment.high_quality_cpr.parameters.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul> 
            <br />  
            
            <h4>{data.treatment.pharmacotherapy[lang]}</h4>
            {data.treatment.pharmacotherapy.agents.map((item) => (
              <div key={item.drug} className="drug-card">
                <div className="drug-name">{item.drug}</div>
                <dl className="detail-grid">
                  <dt>{lang === 'en' ? 'Dose' : '劑量'}</dt>
                  <dd>{item.dose[lang]}</dd>

                  <dt>{lang === 'en' ? 'Timing' : '時機'}</dt>
                  <dd>{item.timing[lang]}</dd>

                  {item.note && (
                    <>
                      <dt>{lang === 'en' ? 'Notes' : '備註'}</dt>
                      <dd>{item.note[lang]}</dd>
                    </>
                  )}
                </dl>
              </div>
            ))} 
            <br /> 
            
            <h4>{data.treatment.reversible_causes[lang]}</h4>
            <table className="info-table">
              <thead>
                <tr>
                  <th>{data.treatment.reversible_causes.h_causes[lang]}</th>
                  <th>{data.treatment.reversible_causes.t_causes[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(
                  data.treatment.reversible_causes.h_causes.items.length,
                  data.treatment.reversible_causes.t_causes.items.length
                ) }).map((_, i) => (
                  <tr key={i}>
                    <td>{data.treatment.reversible_causes.h_causes.items[i]?.[lang] ?? ''}</td>
                    <td>{data.treatment.reversible_causes.t_causes.items[i]?.[lang] ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tab 3: Prevention */}
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <h3>{data.prevention[lang]}</h3>
            <h4>{data.prevention.primary_prevention[lang]}</h4>
            <p>{data.prevention.primary_prevention.goal[lang]}</p>
            <h5>{data.prevention.primary_prevention.indications_for_icd.icd_role_title[lang]}</h5>
            <p>{data.prevention.primary_prevention.indications_for_icd.icd_role[lang]}</p>
            <h5>{data.prevention.primary_prevention.indications_for_icd[lang]}</h5>
            <ul>
              {data.prevention.primary_prevention.indications_for_icd.items.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul> 
            <br /> 

            <h4>{data.prevention.secondary_prevention[lang]}</h4>
            <p>{data.prevention.secondary_prevention.goal[lang]}</p>
            <h5>{data.prevention.secondary_prevention.strategies_title[lang]}</h5>
            <ul>
              {data.prevention.secondary_prevention.strategies.map((s, index) => (
                <li key={index}>
                  {s[lang]}
                </li>
              ))}
            </ul> 
            <br /> 

            <h4>{data.prevention.antiarrhythmic_therapy[lang]}</h4>
            <p>{data.prevention.antiarrhythmic_therapy.note[lang]}</p>
            {data.prevention.antiarrhythmic_therapy.agents.map((item) => (
              <div key={item.drug} className="drug-card">
                <div className="drug-name">{item.drug}</div>
                <dl className="detail-grid">
                  <dt>{lang === 'en' ? 'Role' : '角色'}</dt>
                  <dd>{item.role[lang]}</dd>

                  <dt>{lang === 'en' ? 'Efficacy' : '療效'}</dt>
                  <dd>{item.efficacy[lang]}</dd>

                  <dt>{lang === 'en' ? 'Notes' : '備註'}</dt>
                  <dd>{item.notes[lang]}</dd>
                </dl>
              </div>
            ))}  
            
          </div>
        </div>  


      </div>
    </div>  
  )
}  