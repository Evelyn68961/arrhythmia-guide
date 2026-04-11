import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import data from '../data/svt.json'
import introImg from '../assets/images/SVT-intro.png'
import ecgImg from '../assets/images/SVT-ecg-path.png'
import treatImg from '../assets/images/SVT-treatment.png'
import preventImg from '../assets/images/SVT-prevention.png'

export default function SVT() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview',   zh: '概述' }, img: introImg },
    { label: { en: 'ECG',        zh: '心電圖' }, img: ecgImg },
    { label: { en: 'Acute',      zh: '緊急處置' }, img: treatImg },
    { label: { en: 'Prevention', zh: '預防' }, img: preventImg }
  ]

  return (
        <div className="content">

          {/* Title + tabs in one row — frees up the top-right whitespace */}
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
                {/* Topic title removed — already shown in .content-header above. */}
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
                {/* Bare .detail-grid (no .drug-card wrapper) — this isn't an
                    entity with attributes, it's just labeled ECG characteristics.
                    The h4 above already provides the section heading. */}
                <dl className="detail-grid">
                  <dt>{lang === 'en' ? 'Rate' : '心率'}</dt>
                  <dd>{data.ecg_characteristics.general.rate[lang]}</dd>

                  <dt>{lang === 'en' ? 'Rhythm' : '節律'}</dt>
                  <dd>{data.ecg_characteristics.general.rhythm[lang]}</dd>

                  <dt>QRS</dt>
                  <dd>{data.ecg_characteristics.general.qrs_complex[lang]}</dd>

                  <dt>{lang === 'en' ? 'P waves' : 'P 波'}</dt>
                  <dd>{data.ecg_characteristics.general.p_waves[lang]}</dd>
                </dl>
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
                {/* Drug-card without a .drug-name header — Adenosine is already
                    identified in the h5 above; adding the name again inside the
                    card would duplicate. */}
                <div className="drug-card">
                  <dl className="detail-grid">
                    <dt>{lang === 'en' ? 'Dose' : '劑量'}</dt>
                    <dd>{data.treatment.stable_treatment.first_line_drug.dosing.initial[lang]}</dd>

                    <dt>{lang === 'en' ? 'Repeat' : '後續'}</dt>
                    <dd>{data.treatment.stable_treatment.first_line_drug.dosing.subsequent[lang]}</dd>

                    <dt>{lang === 'en' ? 'Admin' : '給藥'}</dt>
                    <dd>{data.treatment.stable_treatment.first_line_drug.administration[lang]}</dd>

                    <dt>{lang === 'en' ? 'Effects' : '效果'}</dt>
                    <dd>{data.treatment.stable_treatment.first_line_drug.expected_effects[lang]}</dd>

                    <dt className="caution">{lang === 'en' ? 'Cautions' : '注意'}</dt>
                    <dd className="caution">
                      <ul>
                        {data.treatment.stable_treatment.first_line_drug.cautions.items.map((s, index) => (
                          <li key={index}>{s[lang]}</li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                </div>
                <hr />

                <h5>{data.treatment.stable_treatment.second_line_drugs[lang]}</h5>

                <h6>{data.treatment.stable_treatment.second_line_drugs.calcium_channel_blockers[lang]}</h6>
                {data.treatment.stable_treatment.second_line_drugs.calcium_channel_blockers.agents.map((item) => (
                  <div key={item.drug} className="drug-card">
                    <div className="drug-name">{item.drug}</div>
                    <dl className="detail-grid">
                      <dt>{lang === 'en' ? 'Dose' : '劑量'}</dt>
                      <dd>{item.dose[lang]}</dd>

                      <dt>{lang === 'en' ? 'Repeat' : '後續'}</dt>
                      <dd>{item.further_dosing[lang]}</dd>

                      <dt className="caution">{lang === 'en' ? 'Caution' : '注意'}</dt>
                      <dd className="caution">{item.cautions[lang]}</dd>
                    </dl>
                  </div>
                ))}

                <h6>{data.treatment.stable_treatment.second_line_drugs.beta_blockers[lang]}</h6>
                {data.treatment.stable_treatment.second_line_drugs.beta_blockers.agents.map((item) => (
                  <div key={item.drug} className="drug-card">
                    <div className="drug-name">{item.drug}</div>
                    <dl className="detail-grid">
                      <dt>{lang === 'en' ? 'Dose' : '劑量'}</dt>
                      <dd>{item.dose[lang]}</dd>

                      <dt>{lang === 'en' ? 'Repeat' : '後續'}</dt>
                      <dd>{item.further_dosing[lang]}</dd>

                      <dt className="caution">{lang === 'en' ? 'Caution' : '注意'}</dt>
                      <dd className="caution">{item.cautions[lang]}</dd>
                    </dl>
                  </div>
                ))}
                <hr />

                <h5>{data.treatment.stable_treatment.cardioversion[lang]}</h5>
                <p>{data.treatment.stable_treatment.cardioversion.description[lang]}</p>
              </div>

              {/* Tab 3: Long-term Prevention */}
              <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
                <h3>{data.prevention[lang]}</h3>
                <h4>{data.prevention.catheter_ablation[lang]}</h4>
                <p>{data.prevention.catheter_ablation.description[lang]}</p>
                <h5>{data.prevention.catheter_ablation.techniquesTitle[lang]}</h5>
                {data.prevention.catheter_ablation.techniques.map((item, index) => (
                  <p key={index}>
                    <strong>{item.name[lang]}</strong> — {item.description[lang]}
                  </p>
                ))}
                <h5>{data.prevention.catheter_ablation.indicationsTitle[lang]}</h5>
                <ul>
                  {data.prevention.catheter_ablation.indications.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul>
                <h5>{data.prevention.catheter_ablation.complications.title[lang]}</h5>
                <p>{data.prevention.catheter_ablation.complications.content[lang]}</p>
                <h4>{data.prevention.pharmacotherapy[lang]}</h4>
                <p>{data.prevention.pharmacotherapy.note[lang]}</p>
                {data.prevention.pharmacotherapy.agents.map((item) => (
                  <div key={item.drug} className="drug-card">
                    <div className="drug-name">{item.drug}</div>
                    <dl className="detail-grid">
                      <dt>{lang === 'en' ? 'Role' : '角色'}</dt>
                      <dd>{item.role[lang]}</dd>

                      <dt>{lang === 'en' ? 'Notes' : '備註'}</dt>
                      <dd>{item.considerations[lang]}</dd>
                    </dl>
                  </div>
                ))}

                <h3>{data.special_considerations.title[lang]}</h3>
                <h4>{data.special_considerations.wpw_and_preexcited_af[lang]}</h4>
                <p>{data.special_considerations.wpw_and_preexcited_af.definition[lang]}</p>
                <p>{data.special_considerations.wpw_and_preexcited_af.danger[lang]}</p>
                <h5>{data.special_considerations.wpw_and_preexcited_af.management.title[lang]}</h5>
                <ul>
                  {data.special_considerations.wpw_and_preexcited_af.management.items.map((s, index) => (
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