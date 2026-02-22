import { useState } from 'react'
import data from '../data/af.json'
import introImg from '../assets/images/AF-intro.png'
import classImg from '../assets/images/AF-clinc-class.png'
import treatImg from '../assets/images/AF-treat.png'

export default function AF({ lang }) {
  const [activeTab, setActiveTab] = useState(0)
  const [careTab, setCareTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Clinical Profile', zh: '臨床表徵 & 分類' }, img: classImg },
    { label: { en: 'Management', zh: '治療策略' }, img: treatImg },
  ]

  const careSubtabs = [
    { key: 'C', label: { en: 'Comorbidities', zh: '共病管理' } },
    { key: 'A', label: { en: 'Anticoagulation', zh: '抗凝治療' } },
    { key: 'R', label: { en: 'Rate & Rhythm', zh: '心率與節律控制' } },
    { key: 'E', label: { en: 'Evaluation', zh: '評估與追蹤' } },
  ]

  return (
        <div className="content">

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
          
            {/* CARE subtabs - only show when Management tab is active */}
            {activeTab === 2 && (
              <div className="care-subtabs">
                {careSubtabs.map((subtab, index) => (
                  <button
                    key={subtab.key}
                    className={careTab === index ? 'active' : ''}
                    onClick={() => setCareTab(index)}
                  >
                    {subtab.key}: {subtab.label[lang]}
                  </button>
                ))}
              </div>
            )}  
        </div>         
                  




          {/* Two Column Layout */}
          <div className="two-column">
            <div className="column-left">
              <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
                <img src={introImg} alt="AF Overview" />
              </div>
              <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <img src={classImg} alt="AF Clinical Profile" />
              </div>
              <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
                <img src={treatImg} alt="AF Treatment" />
              </div>
              <div className="references">
                <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
                <ul>
                  <li>
                    <a href="https://www.msdmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/atrial-fibrillation" target="_blank" rel="noopener noreferrer">
                      MSD Manual - Atrial Fibrillation
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK526072/" target="_blank" rel="noopener noreferrer">
                      NCBI - Atrial Fibrillation
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
                <h4>{data.ecg_characteristics[lang]}</h4>
                <h5>{data.ecg_characteristics.hallmarks[lang]}</h5>
                <ul>
                  {data.ecg_characteristics.hallmarks.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.ecg_characteristics.ventricular_rate.title[lang]}</h5>
                <p>{data.ecg_characteristics.ventricular_rate.content[lang]}</p>
                <h5>{data.ecg_characteristics.fibrillatory_waves[lang]}</h5>
                {data.ecg_characteristics.fibrillatory_waves.types.map((item) => (
                  <div key={item.type} >
                    <h5>{item.name[lang]}</h5>
                    <p>{item.description[lang]}</p>
                  </div>
                ))}
                <hr />
                <h4>{data.pathophysiology[lang]}</h4>
                <h5>{data.pathophysiology.triggers[lang]}</h5>
                <p>{data.pathophysiology.triggers.description[lang]}</p>
                <h6>{data.pathophysiology.triggers.pulmonary_veins[lang]}</h6>
                <p>{data.pathophysiology.triggers.pulmonary_veins.description[lang]}</p>
                <h6>{data.pathophysiology.triggers.other_sites[lang]}</h6>
                <ul>
                  {data.pathophysiology.triggers.other_sites.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.pathophysiology.substrate[lang]}</h5>
                <h6>{data.pathophysiology.substrate.structural_remodeling[lang]}</h6>
                <p>{data.pathophysiology.substrate.structural_remodeling.description[lang]}</p>
                <h6>{data.pathophysiology.substrate.electrical_remodeling[lang]}</h6>
                <p>{data.pathophysiology.substrate.electrical_remodeling.description[lang]}</p>
                <h5>{data.pathophysiology.modulators[lang]}</h5>
                <h6>{data.pathophysiology.modulators.autonomic[lang]}</h6>
                <p>{data.pathophysiology.modulators.autonomic.description[lang]}</p>
                <h6>{data.pathophysiology.modulators.ganglionated_plexi[lang]}</h6>
                <p>{data.pathophysiology.modulators.ganglionated_plexi.description[lang]}</p>
              </div>

              {/* Tab 1: Clinical Profile */}
              <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <h3>{data.clinical_presentation[lang]}</h3>
                <h4>{data.clinical_presentation.asymptomatic[lang]}</h4>
                <p>{data.clinical_presentation.asymptomatic.description[lang]}</p>
                <h4>{data.clinical_presentation.symptoms[lang]}</h4>
                <ul>
                  {data.clinical_presentation.symptoms.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h4>{data.clinical_presentation.serious_presentations[lang]}</h4>
                <ul>
                  {data.clinical_presentation.serious_presentations.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <hr />
                <h3>{data.classification[lang]}</h3>
                <p>{data.classification.staging_overview[lang]}</p>
                <h4>{data.classification.stages[lang]}</h4>
                {data.classification.stages.map((stage) => (
                <div key={stage.stage}>
                  <h4>{stage.name[lang]}</h4>
                  <p>{stage.description[lang]}</p>

                  {/* Only renders if this stage has risk_factors */}
                  {stage.risk_factors && (
                    <>
                      <h5>{stage.risk_factors.modifiable[lang]}</h5>
                      <ul>
                        {stage.risk_factors.modifiable.items.map((item, index) => (
                          <li key={index}>{item[lang]}</li>
                        ))}
                      </ul>
                      <h5>{stage.risk_factors.nonmodifiable[lang]}</h5>
                      <ul>
                        {stage.risk_factors.nonmodifiable.items.map((item, index) => (
                          <li key={index}>{item[lang]}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Only renders if this stage has substages */}
                  {stage.substages && (
                    <>
                      {stage.substages.map((sub) => (
                      <p key={sub.substage}>
                        <strong>{sub.name[lang]}</strong> — {sub.description[lang]}
                      </p>
                      ))}
                    </>
                  )}
                </div>
              ))}
              </div>

              {/* Tab 2: Management */}
              <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
                <h3>{data.treatment[lang]}</h3>
                <h6>{data.treatment.overview[lang]}</h6>
                <p>{data.treatment.overview.description[lang]}</p>
                <hr />
              
                {careTab === 0 && (
                  <div>
                    <h4>{data.treatment.comorbidity_management[lang]}</h4>
                    {data.treatment.comorbidity_management.targets.map((item) => (
                      <div key={item.condition} >
                        <h5>{item.name[lang]}</h5>
                        <p>{item.target[lang]}</p>
                      </div>
                    ))}
                  </div>
                )}                  

                {careTab === 1 && (
                  <div>
                    <h4>{data.treatment.anticoagulation[lang]}</h4>
                    <h5>{data.treatment.anticoagulation.risk_assessment[lang]}</h5>
                    <h6>{data.treatment.anticoagulation.risk_assessment.acc_aha_2023[lang]}</h6>
                    <p>{data.treatment.anticoagulation.risk_assessment.acc_aha_2023.description[lang]}</p>
                    <h6>{data.treatment.anticoagulation.risk_assessment.esc_2024[lang]}</h6>
                    <p>{data.treatment.anticoagulation.risk_assessment.esc_2024.description[lang]}</p>
                    <h5>{data.treatment.anticoagulation.anticoagulant_choice[lang]}</h5>
                    <h6>{data.treatment.anticoagulation.anticoagulant_choice.doacs[lang]}</h6>
                    <ul>
                      {data.treatment.anticoagulation.anticoagulant_choice.doacs.agents.map((s, index) => (
                        <li key={index}>
                          {s}
                        </li>
                      ))}
                    </ul> 
                    <h6>{data.treatment.anticoagulation.anticoagulant_choice.warfarin[lang]}</h6>
                    <p>{data.treatment.anticoagulation.anticoagulant_choice.warfarin.description[lang]}</p>
                    <h5>{data.treatment.anticoagulation.key_points[lang]}</h5>
                    <ul>
                      {data.treatment.anticoagulation.key_points.items.map((s, index) => (
                        <li key={index}>
                          {s[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}                    

                {careTab === 2 && (
                  <div>
                    <h4>{data.treatment.rate_control[lang]}</h4>
                    <p>{data.treatment.rate_control.goal[lang]}</p>
                    <h6>
                      {data.treatment.rate_control.agents.beta_blockers[lang]}
                      <span style={{ fontWeight: 'normal', fontStyle: 'italic', marginLeft: '0.5rem', fontSize: '0.9em' }}>
                        — {data.treatment.rate_control.agents.beta_blockers.caution[lang]}
                      </span>
                    </h6>                    
                    <ul>
                      {data.treatment.rate_control.agents.beta_blockers.drugs.map((item, index) => (
                        <li key={index}>
                          {item.drug}
                        </li>
                      ))}
                    </ul> 
                    <h6>
                      {data.treatment.rate_control.agents.non_dhp_ccbs[lang]}
                      <span style={{ fontWeight: 'normal', fontStyle: 'italic', marginLeft: '0.5rem', fontSize: '0.9em' }}>
                        — {data.treatment.rate_control.agents.non_dhp_ccbs.contraindication[lang]}
                      </span>
                    </h6>                      
                    <ul>
                      {data.treatment.rate_control.agents.non_dhp_ccbs.drugs.map((item, index) => (
                        <li key={index}>
                          {item.drug}
                        </li>
                      ))}
                    </ul>  
                    <h6>{data.treatment.rate_control.agents.digoxin[lang]}</h6>
                    <p>{data.treatment.rate_control.agents.digoxin.description[lang]}</p>
                    <hr />
                    <hr />

                    <h4>{data.treatment.rhythm_control[lang]}</h4>
                    <p>{data.treatment.rhythm_control.goal[lang]}</p>
                    <h5>{data.treatment.rhythm_control.catheter_ablation[lang]}</h5>
                    <p>{data.treatment.rhythm_control.catheter_ablation.description[lang]}</p>
                    <hr />
                    <h5>{data.treatment.rhythm_control.antiarrhythmic_drugs[lang]}</h5>
                    {data.treatment.rhythm_control.antiarrhythmic_drugs.by_condition.map((condition) => (
                      <div key={condition.condition}>
                        <h6>{condition.name[lang]}</h6>
                        <ul>
                          {condition.drugs.map((drug, index) => (
                            <li key={index}>
                              <p><strong>{drug.drug}</strong> — {drug.notes[lang]}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <hr />   
                    <h5>{data.treatment.rhythm_control.acute_cardioversion[lang]}</h5>
                    <h6>{data.treatment.rhythm_control.acute_cardioversion.stable_no_shd[lang]}</h6>
                    <p>{data.treatment.rhythm_control.acute_cardioversion.stable_no_shd.drugs[lang]}</p>
                    <h6>{data.treatment.rhythm_control.acute_cardioversion.pill_in_pocket[lang]}</h6>
                    <p>{data.treatment.rhythm_control.acute_cardioversion.pill_in_pocket.description[lang]}</p>
                    <h6>{data.treatment.rhythm_control.acute_cardioversion.with_shd_or_hf[lang]}</h6>
                    <p>{data.treatment.rhythm_control.acute_cardioversion.with_shd_or_hf.drugs[lang]}</p>
                  </div>
                )} 
                
                {careTab === 3 && (
                  <div>
                    <h4>{data.monitoring.evaluation[lang]}</h4>
                    <p>{data.monitoring.evaluation.timeline[lang]}</p>
                    <h5>{data.monitoring.evaluation.assessment_items[lang]}</h5>
                    <ul>
                      {data.monitoring.evaluation.assessment_items.items.map((item, index) => (
                        <li key={index}>
                          {item[lang]}
                        </li>
                      ))}
                    </ul> 
                    <h4>{data.monitoring.key_principles[lang]}</h4>
                    <ul>
                      {data.monitoring.key_principles.items.map((item, index) => (
                        <li key={index}>
                          {item[lang]}
                        </li>
                      ))}
                    </ul> 
                  </div>
               
                )}
              </div>


            </div>
          </div>
        </div>
      )           
}
