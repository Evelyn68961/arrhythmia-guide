import { useState } from 'react'
import data from '../data/cardiac_electrophysiology.json'
import conductionImg from '../assets/images/CardiacElectro-cardiac-conduction.png'
import actionPotentialImg from '../assets/images/CardiacElectro-action-potential.png'
import drugClassImg from '../assets/images/CardiacElectro-drug-classification.png'

export default function CardiacElectro({ lang }) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Conduction System', zh: '傳導系統' }, img: conductionImg },
    { label: { en: 'Action Potential & Ion Channels', zh: '動作電位與離子通道' }, img: actionPotentialImg },
    { label: { en: 'Antiarrhythmic Drugs', zh: '抗心律不整藥物' }, img: drugClassImg }
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
      </div>

      {/* Two Column Layout */}
      <div className="two-column">
        <div className="column-left">
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <img src={conductionImg} alt="Cardiac Conduction System" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={actionPotentialImg} alt="Action Potential Phases" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={drugClassImg} alt="Antiarrhythmic Drug Classification" />
          </div>
          <div className="references">
            <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
            <ul>
              <li>
                <a href="https://www.cvphysiology.com/Arrhythmias/A007" target="_blank" rel="noopener noreferrer">
                  CV Physiology - Cardiac Action Potentials
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK557438/" target="_blank" rel="noopener noreferrer">
                  NCBI - Cardiac Conduction System
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="column-right">
          {/* Tab 0: Conduction System */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <h3>{data.cardiac_conduction_system.title[lang]}</h3>
            <p>{data.cardiac_conduction_system.description[lang]}</p>
            <hr />

            <h4>{data.cardiac_conduction_system.conduction_pathway[lang]}</h4>
            {data.cardiac_conduction_system.conduction_pathway.sequence.map((item, index) => (
              <div key={index}>
                <h5>{item.structure[lang]}</h5>
                <p><strong>{lang === 'en' ? 'Role' : '角色'}:</strong> {item.role[lang]}</p>
                {item.intrinsic_rate && (
                  <p><strong>{lang === 'en' ? 'Intrinsic Rate' : '固有頻率'}:</strong> {item.intrinsic_rate[lang]}</p>
                )}
                <p>{item.description[lang]}</p>
              </div>
            ))}
            <hr />

            <h4>{data.cardiac_conduction_system.key_concept[lang]}</h4>
            <p>{data.cardiac_conduction_system.key_concept.description[lang]}</p>
          </div>

          {/* Tab 1: Action Potential & Ion Channels */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <h3>{data.action_potential_and_ion_channels.title[lang]}</h3>
            <p>{data.action_potential_and_ion_channels.description[lang]}</p>
            <hr />

            <h4>{data.action_potential_and_ion_channels.action_potential_phases[lang]}</h4>
            {data.action_potential_and_ion_channels.action_potential_phases.phases.map((phase, index) => (
              <div key={index}>
                <h5>{lang === 'en' ? 'Phase' : '相位'} {phase.phase}: {phase.name[lang]}</h5>
                <p><strong>{lang === 'en' ? 'Voltage' : '電壓'}:</strong> {phase.voltage[lang]}</p>
                <p><strong>{lang === 'en' ? 'Ion Movement' : '離子流動'}:</strong> {phase.ion_movement[lang]}</p>
                {phase.ecg_correlation && (
                  <p><strong>{lang === 'en' ? 'ECG Correlation' : 'ECG 對應'}:</strong> {phase.ecg_correlation[lang]}</p>
                )}
                {phase.clinical_significance && (
                  <p><strong>{lang === 'en' ? 'Clinical Significance' : '臨床意義'}:</strong> {phase.clinical_significance[lang]}</p>
                )}
                {phase.description && (
                  <p>{phase.description[lang]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Tab 2: Antiarrhythmic Drugs (Vaughan-Williams) */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <h3>{data.vaughan_williams_classification.title[lang]}</h3>
            <p>{data.vaughan_williams_classification.description[lang]}</p>
            <hr />

            {data.vaughan_williams_classification.classes.map((drugClass, index) => (
              <div key={index}>
                <h4>{drugClass.name[lang]}</h4>
                
                {/* For Class I with subclasses */}
                {drugClass.subclasses ? (
                  <>
                    <p>{drugClass.mechanism[lang]}</p>
                    {drugClass.subclasses.map((sub, subIndex) => (
                      <div key={subIndex}>
                        <h5>{lang === 'en' ? 'Class' : '類別'} {sub.subclass}</h5>
                        <p><strong>{lang === 'en' ? 'Mechanism' : '機轉'}:</strong> {sub.mechanism[lang]}</p>
                        <p><strong>{lang === 'en' ? 'Examples' : '藥物'}:</strong> {sub.examples[lang]}</p>
                        <p><strong>{lang === 'en' ? 'ECG Effect' : 'ECG 影響'}:</strong> {sub.ecg_effect[lang]}</p>
                        {sub.warning && (
                          <p><strong>{lang === 'en' ? 'Warning' : '警告'}:</strong> {sub.warning[lang]}</p>
                        )}
                      </div>
                    ))}
                  </>
                ) : drugClass.examples && Array.isArray(drugClass.examples) ? (
                  /* For Class V with array of drug examples */
                  <>
                    <p>{drugClass.description[lang]}</p>
                    {drugClass.examples.map((drug, drugIndex) => (
                      <div key={drugIndex}>
                        <h5>{drug.drug}</h5>
                        <p><strong>{lang === 'en' ? 'Mechanism' : '機轉'}:</strong> {drug.mechanism[lang]}</p>
                        <p><strong>{lang === 'en' ? 'Use' : '用途'}:</strong> {drug.use[lang]}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  /* For Classes II, III, IV */
                  <>
                    <p><strong>{lang === 'en' ? 'Mechanism' : '機轉'}:</strong> {drugClass.mechanism[lang]}</p>
                    <p><strong>{lang === 'en' ? 'Examples' : '藥物'}:</strong> {drugClass.examples[lang]}</p>
                    <p><strong>{lang === 'en' ? 'ECG Effect' : 'ECG 影響'}:</strong> {drugClass.ecg_effect[lang]}</p>
                    {drugClass.clinical_applications && (
                      <p><strong>{lang === 'en' ? 'Clinical Applications' : '臨床應用'}:</strong> {drugClass.clinical_applications[lang]}</p>
                    )}
                    {drugClass.warning && (
                      <p><strong>{lang === 'en' ? 'Warning' : '警告'}:</strong> {drugClass.warning[lang]}</p>
                    )}
                    {drugClass.special_note && (
                      <p><strong>{lang === 'en' ? 'Special Note' : '特別注意'}:</strong> {drugClass.special_note[lang]}</p>
                    )}
                    {drugClass.contraindications && (
                      <p><strong>{lang === 'en' ? 'Contraindications' : '禁忌症'}:</strong> {drugClass.contraindications[lang]}</p>
                    )}
                  </>
                )}
                <hr />
              </div>
            ))}

            {/* Summary Table */}
            <h4>{data.vaughan_williams_classification.summary_table[lang]}</h4>
            <table>
              <thead>
                <tr>
                  <th>{lang === 'en' ? 'Class' : '類別'}</th>
                  <th>{lang === 'en' ? 'Target' : '標的'}</th>
                  <th>{lang === 'en' ? 'ECG Effect' : 'ECG 影響'}</th>
                  <th>{lang === 'en' ? 'Clinical Use' : '臨床用途'}</th>
                </tr>
              </thead>
              <tbody>
                {data.vaughan_williams_classification.summary_table.table.map((row, index) => (
                  <tr key={index}>
                    <td>{row.class}</td>
                    <td>{row.target[lang]}</td>
                    <td>{row.primary_ecg_effect[lang]}</td>
                    <td>{row.clinical_use[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
