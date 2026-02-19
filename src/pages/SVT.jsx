import { useState } from 'react'
import data from '../data/svt.json'
import introImg from '../assets/images/SVT-intro.png'
import ecgImg from '../assets/images/SVT-ecg-path.png'
import treatImg from '../assets/images/SVT-treatment.png'
import preventImg from '../assets/images/SVT-prevention.png'

export default function SVT() {
  const [lang, setLang] = useState('en')
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'ECG & Pathophysiology', zh: '心電圖 & 病因' }, img: ecgImg },
    { label: { en: 'Acute Management', zh: '緊急處置' }, img: treatImg },
    { label: { en: 'Long-term Prevention', zh: '長期預防' }, img: preventImg }
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
                <img src={introImg} alt="SVT Overview" />
              </div>
              <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <img src={ecgImg} alt="SVT ECG" />
              </div>
              <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
                <img src={treatImg} alt="SVT Treatment" />
              </div>
              <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
                <img src={preventImg} alt="SVT Prevention" />
              </div>
              <div className="references">
                <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
                <ul>
                  <li>
                    <a href="https://www.msdmanuals.com/home/heart-and-blood-vessel-disorders/abnormal-heart-rhythms/paroxysmal-supraventricular-tachycardia-svt-psvt" target="_blank" rel="noopener noreferrer">
                      MSD Manual - Supraventricular Tachycardia
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK441972/" target="_blank" rel="noopener noreferrer">
                      NCBI - Supraventricular Tachycardia
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
                <hr />
                
                <h4>{data.clinical_presentation[lang]}</h4>
                <h5>{data.clinical_presentation.demographics[lang]}</h5>
                <ul>
                  {data.clinical_presentation.demographics.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.clinical_presentation.symptoms[lang]}</h5>
                <ul>
                  {data.clinical_presentation.symptoms.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.clinical_presentation.red_flags[lang]}</h5>
                <ul>
                  {data.clinical_presentation.red_flags.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <hr />
                
                <h4>{data.classification.by_mechanism[lang]}</h4>
                {data.classification.by_mechanism.types.map((item) => (
                  <div key={item.type} >
                    <h5>{item.name[lang]}</h5>
                    <p>{item.description[lang]}</p>
                  </div>
                ))}
                <hr />

                <h4>{data.etiology[lang]}</h4>
                <h5>{data.etiology.predisposing_factors[lang]}</h5>
                <ul>
                  {data.etiology.predisposing_factors.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.etiology.common_triggers[lang]}</h5>
                <ul>
                  {data.etiology.common_triggers.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul>
              </div> 

              {/* Tab 1: ECG & Pathophysiology */}
              <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <h3>{lang === 'zh' ? '心電圖 & 病因' : 'ECG & Pathophysiology'}</h3>
                <h4>{data.ecg_characteristics[lang]}</h4>
                <ul>
                  <li>{data.ecg_characteristics.general.rate[lang]}</li>
                  <li>{data.ecg_characteristics.general.rhythm[lang]}</li>
                  <li>{data.ecg_characteristics.general.qrs_complex[lang]}</li>
                  <li>{data.ecg_characteristics.general.p_waves[lang]}</li>
                </ul>
                <hr />
                <h4>{data.ecg_characteristics.ecg_by_type.title[lang]}</h4>
                {data.ecg_characteristics.ecg_by_type.items.map((item) => (
                  <div key={item.type} >
                    <h5>{item.name[lang]}</h5>
                    <p>{item.description[lang]}</p>
                  </div>
                ))}
                <hr />

                <h4>{data.pathophysiology[lang]}</h4>
                {data.pathophysiology.mechanisms.map((item) => (
                  <div key={item.type} >
                    <h5>{item.name[lang]}</h5>
                    <p>{item.description[lang]}</p>
                  </div>
                ))}
              </div>

              {/* Tab 2: Acute Management */}
              <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
                <h3>{data.treatment.overview[lang]}</h3>
                <h4>{data.treatment.hemodynamic_assessment[lang]}</h4>
                <h5>{data.treatment.hemodynamic_assessment.unstable_signs[lang]}</h5>
                <ul>
                  {data.treatment.hemodynamic_assessment.unstable_signs.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul>
                <h5>{data.treatment.hemodynamic_assessment.unstable_treatment[lang]}</h5>
                <p>{data.treatment.hemodynamic_assessment.unstable_treatment.action[lang]}</p>
                <hr />
                <h4>{data.treatment.stable_treatment[lang]}</h4>
                <h5>{data.treatment.stable_treatment.vagal_maneuvers[lang]}</h5>
                {data.treatment.stable_treatment.vagal_maneuvers.methods.map((item) => (
                  <div key={item.method} >
                    <h6>{item.name[lang]}</h6>
                    <p>{item.description[lang]}</p>
                  </div>
                ))}
                <hr />

                <h5>{data.treatment.stable_treatment.first_line_drug[lang]}</h5>
                <p>{data.treatment.stable_treatment.first_line_drug.description[lang]}</p>
                <h6>{data.treatment.stable_treatment.first_line_drug.dosing.title[lang]}</h6>
                <ul>
                  <li>{data.treatment.stable_treatment.first_line_drug.dosing.initial[lang]}</li>
                  <li>{data.treatment.stable_treatment.first_line_drug.dosing.subsequent[lang]}</li>
                </ul>
                <h6>{data.treatment.stable_treatment.first_line_drug.administration.title[lang]}</h6>
                <p>{data.treatment.stable_treatment.first_line_drug.administration[lang]}</p>
                <h6>{data.treatment.stable_treatment.first_line_drug.expected_effects.title[lang]}</h6>
                <p>{data.treatment.stable_treatment.first_line_drug.expected_effects[lang]}</p>
                <h6>{data.treatment.stable_treatment.first_line_drug.cautions.title[lang]}</h6>
                <ul>
                  {data.treatment.stable_treatment.first_line_drug.cautions.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul>
                <hr />

                <h5>{data.treatment.stable_treatment.second_line_drugs[lang]}</h5>
                <h6>{data.treatment.stable_treatment.second_line_drugs.calcium_channel_blockers[lang]}</h6>
                {data.treatment.stable_treatment.second_line_drugs.calcium_channel_blockers.agents.map((item) => (
                  <div key={item.drug} >
                    <strong>{item.drug}</strong>
                    <ul>
                      <li>{item.dose[lang]}</li>
                      <li>{item.further_dosing[lang]}</li>
                      <li>{item.cautions[lang]}</li>
                    </ul>
                  </div>
                ))}
                <h6>{data.treatment.stable_treatment.second_line_drugs.beta_blockers[lang]}</h6>
                {data.treatment.stable_treatment.second_line_drugs.beta_blockers.agents.map((item) => (
                  <div key={item.drug} >
                    <strong>{item.drug}</strong>
                    <ul>
                      <li>{item.dose[lang]}</li>
                      <li>{item.further_dosing[lang]}</li>
                      <li>{item.cautions[lang]}</li>
                    </ul>
                  </div>
                ))}
                <hr />

                <h5>{data.treatment.stable_treatment.cardioversion[lang]}</h5>
                <p>{data.treatment.stable_treatment.cardioversion.description[lang]}</p>







              </div>

            </div>
          </div>
        </div>
      )
} 