import { useState } from 'react'
import data from '../data/vt.json'
import introImg from '../assets/images/VT-intro.png'
import treatImg from '../assets/images/VT-acute-treatment.png'
import preventImg from '../assets/images/VT-longterm-prevention.png'

export default function VT() {
  const [lang, setLang] = useState('en')
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Etiology', zh: '病因' }, img: introImg },
    { label: { en: 'Classification', zh: '分類' }, img: introImg },
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
            <img src={introImg} alt="VT Overview" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={introImg} alt="VT Etiology" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={introImg} alt="VT Classification" />
          </div>
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <img src={treatImg} alt="VT Treatment" />
          </div>
          <div className={`tab-content ${activeTab === 4 ? 'active' : ''}`}>
            <img src={preventImg} alt="VT Prevention" />
          </div>
          <div className="references">
            <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
            <ul>
              <li>
                <a href="https://www.msdmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/ventricular-tachycardia-vt" target="_blank" rel="noopener noreferrer">
                  MSD Manual - Ventricular Tachycardia
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK532954/" target="_blank" rel="noopener noreferrer">
                  NCBI - Ventricular Tachycardia
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="column-right">
          {/* Tab 0: Overview */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
              <h3>{lang === 'zh' ? '定義' : 'Definition'}</h3>
              <p>{data.definition[lang]}</p>
              
              <h3>{data.clinical_presentation[lang]}</h3>
              <h4>{data.clinical_presentation.hemodynamically_stable[lang]}</h4>
              <ul>
                {data.clinical_presentation.hemodynamically_stable.symptoms.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>
              <h4>{data.clinical_presentation.hemodynamically_unstable[lang]}</h4>
              <ul>
                {data.clinical_presentation.hemodynamically_unstable.symptoms.map((s, index) => (
                  <li key={index}>
                    {s[lang]}
                  </li>
                ))}
              </ul>
              <h4>{data.clinical_presentation.pulseless_vt[lang]}</h4>
              <p>{data.clinical_presentation.pulseless_vt.warning[lang]}</p>
              <ul>
                {data.clinical_presentation.pulseless_vt.signs.map((s, index) => (
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
          </div>

          {/* Tab 1: Etiology & Pathophysiology */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
              <h3>{data.etiology[lang]}</h3>
              <h4>{data.etiology.structural_heart_disease[lang]}</h4>
              <ul>
                {data.etiology.structural_heart_disease.items.map((cause, index) => (
                  <li key={index}>{cause[lang]}</li>
                ))}
              </ul>
              <h4>{data.etiology.idiopathic_channelopathies.idiopathic_vt[lang]}</h4>
              <ul>
                {data.etiology.idiopathic_channelopathies.idiopathic_vt.items.map((cause, index) => (
                  <li key={index}>{cause[lang]}</li>
                ))}
              </ul>
              <h4>{data.etiology.idiopathic_channelopathies.channelopathies[lang]}</h4>
              <ul>
                {data.etiology.idiopathic_channelopathies.channelopathies.items.map((cause, index) => (
                  <li key={index}>{cause[lang]}</li>
                ))}
              </ul>
              <h4>{data.etiology.idiopathic_channelopathies.reversible_causes[lang]}</h4>
              <ul>
                {data.etiology.idiopathic_channelopathies.reversible_causes.items.map((cause, index) => (
                  <li key={index}>{cause[lang]}</li>
                ))}
              </ul>

              <h3>{data.pathophysiology[lang]}</h3>
              {data.pathophysiology.mechanisms.map((mech, index) => (
                <div key={index}>
                  <h4>{mech.name[lang]}</h4>
                  {mech.description && <p>{mech.description[lang]}</p>}
                  {mech.subtypes && mech.subtypes.map((sub, i) => (
                    <div key={i} style={{ marginLeft: '1rem' }}>
                      <strong>{sub.name[lang]}</strong>
                      <p>{sub.description[lang]}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          {/* Tab 2: Classification */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
              <h3>{data.classification.by_duration[lang]}</h3>
              {data.classification.by_duration.types.map((item) => (
                <div key={item.type} >
                  <h4>{item.name[lang]}</h4>
                  <p>{item.description[lang]}</p>
                </div>
              ))}
              <h3>{data.classification.by_morphology[lang]}</h3>
              {data.classification.by_morphology.types.map((item) => (
                <div key={item.type} >
                  <h4>{item.name[lang]}</h4>
                  <p>{item.description[lang]}</p>
                </div>
              ))}
          </div>

          {/* Tab 3: Treatment */}
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
          
              <h3>{data.treatment.overview[lang]}</h3>
              <p>{data.treatment.fundamental_principle[lang]}</p>

              <h4>{data.treatment.pulseless_or_unstable[lang]}</h4>
              <strong>{data.treatment.pulseless_or_unstable.acls_protocol[lang]}</strong>
              <ul>
                {data.treatment.pulseless_or_unstable.acls_protocol.steps.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>

              <h4>{data.treatment.stable_sustained_vt[lang]}</h4>
              <strong>{data.treatment.stable_sustained_vt.approach[lang]}</strong>
              {data.treatment.stable_sustained_vt.agents.map((item) => (
                <div key={item.drug} >
                  <h4>{item.drug}</h4>
                  <p>{item.dose[lang]}</p>
                  <p>{item.notes[lang]}</p>
                </div>
              ))}

              <h4>{data.treatment.electrical_cardioversion[lang]}</h4>
              <p>{data.treatment.electrical_cardioversion.description[lang]}</p>
              <ul>
                {data.treatment.electrical_cardioversion.key_points.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>

              <h4>{data.treatment.address_reversible_factors[lang]}</h4>
              <ul>
                {data.treatment.address_reversible_factors.critical_corrections.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
              <strong>{data.treatment.address_reversible_factors.drug_selection_considerations[lang]}</strong>
              <ul>
                {data.treatment.address_reversible_factors.drug_selection_considerations.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>   
              
              <h4>{data.treatment.pulseless_vt_acls[lang]}</h4>
              <strong>{data.treatment.pulseless_vt_acls.pharmacotherapy[lang]}</strong>
              {data.treatment.pulseless_vt_acls.pharmacotherapy.agents.map((item) => (
                <div key={item.drug} >
                  <h4>{item.drug}</h4>
                  <p>{item.dose[lang]}</p>
                </div>
              ))}              
          </div>

          {/* Tab 4: Prevention */}
          <div className={`tab-content ${activeTab === 4 ? 'active' : ''}`}>
            <h3>{data.prevention[lang]}</h3>
            
            <h4>{data.prevention.icd[lang]}</h4>
            <p>{data.prevention.icd.purpose[lang]}</p>
            <h5>{data.prevention.icd.primary_prevention[lang]}</h5>
            <ul>
              {data.prevention.icd.primary_prevention.indications.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>  
            <h5>{data.prevention.icd.secondary_prevention[lang]}</h5>
            <ul>
              {data.prevention.icd.secondary_prevention.indications.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul> 

            <h4>{data.prevention.antiarrhythmic_drug_therapy[lang]}</h4>
            {data.prevention.antiarrhythmic_drug_therapy.agents.map((item) => (
              <div key={item.drug} >
                <h4>{item.drug}</h4>
                <p>{item.role[lang]}</p>
                <p>{item.considerations[lang]}</p>
              </div>
            ))}  

            <h4>{data.prevention.catheter_ablation[lang]}</h4>
            <p>{data.prevention.catheter_ablation.description[lang]}</p>
            <strong>{data.prevention.catheter_ablation.indications[lang]}</strong>
            <ul>
              {data.prevention.catheter_ablation.indications.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul> 




          </div>
        </div>
      </div>
    </div>
  )
}