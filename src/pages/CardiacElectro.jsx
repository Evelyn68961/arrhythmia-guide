import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import data from '../data/cardiac_electrophysiology.json'
import conductionImg from '../assets/images/CardiacElectro-cardiac-conduction.png'
import actionPotentialImg from '../assets/images/CardiacElectro-action-potential.png'
import drugClassImg from '../assets/images/CardiacElectro-drug-classification.png'

export default function CardiacElectro() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Conduction System', zh: '傳導系統' }, img: conductionImg },
    { label: { en: 'Action Potential & Ion Channels', zh: '動作電位與離子通道' }, img: actionPotentialImg },
    { label: { en: 'Antiarrhythmic Drugs', zh: '抗心律不整藥物' }, img: drugClassImg }
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
              <div key={index} className="drug-card">
                <div className="drug-name">{item.structure[lang]}</div>
                <dl className="detail-grid">
                  <dt>{lang === 'en' ? 'Role' : '角色'}</dt>
                  <dd>{item.role[lang]}</dd>

                  {item.intrinsic_rate && (
                    <>
                      <dt>{lang === 'en' ? 'Rate' : '頻率'}</dt>
                      <dd>{item.intrinsic_rate[lang]}</dd>
                    </>
                  )}
                </dl>
                {item.description && <p>{item.description[lang]}</p>}
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
              <div key={index} className="drug-card">
                <div className="drug-name">
                  {lang === 'en' ? 'Phase' : '相位'} {phase.phase}: {phase.name[lang]}
                </div>
                <dl className="detail-grid">
                  <dt>{lang === 'en' ? 'Voltage' : '電壓'}</dt>
                  <dd>{phase.voltage[lang]}</dd>

                  <dt>{lang === 'en' ? 'Ions' : '離子'}</dt>
                  <dd>{phase.ion_movement[lang]}</dd>

                  {phase.ecg_correlation && (
                    <>
                      <dt>{lang === 'en' ? 'ECG' : '心電圖'}</dt>
                      <dd>{phase.ecg_correlation[lang]}</dd>
                    </>
                  )}

                  {phase.clinical_significance && (
                    <>
                      <dt>{lang === 'en' ? 'Clinical' : '臨床'}</dt>
                      <dd>{phase.clinical_significance[lang]}</dd>
                    </>
                  )}
                </dl>
                {phase.description && <p>{phase.description[lang]}</p>}
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

                {/* Branch 1: Class I with subclasses (Ia / Ib / Ic).
                    Intro paragraph, then one drug-card per subclass. */}
                {drugClass.subclasses ? (
                  <>
                    <p>{drugClass.mechanism[lang]}</p>
                    {drugClass.subclasses.map((sub, subIndex) => (
                      <div key={subIndex} className="drug-card">
                        <div className="drug-name">
                          {lang === 'en' ? 'Class' : '類別'} {sub.subclass}
                        </div>
                        <dl className="detail-grid">
                          <dt>{lang === 'en' ? 'Mechanism' : '機轉'}</dt>
                          <dd>{sub.mechanism[lang]}</dd>

                          <dt>{lang === 'en' ? 'Drugs' : '藥物'}</dt>
                          <dd>{sub.examples[lang]}</dd>

                          <dt>{lang === 'en' ? 'ECG' : '心電圖'}</dt>
                          <dd>{sub.ecg_effect[lang]}</dd>

                          {sub.warning && (
                            <>
                              <dt className="caution">{lang === 'en' ? 'Warning' : '警告'}</dt>
                              <dd className="caution">{sub.warning[lang]}</dd>
                            </>
                          )}
                        </dl>
                      </div>
                    ))}
                  </>
                ) : drugClass.examples && Array.isArray(drugClass.examples) ? (
                  /* Branch 2: Class V with an array of drug examples.
                     Intro paragraph, then one drug-card per drug. */
                  <>
                    <p>{drugClass.description[lang]}</p>
                    {drugClass.examples.map((drug, drugIndex) => (
                      <div key={drugIndex} className="drug-card">
                        <div className="drug-name">{drug.drug}</div>
                        <dl className="detail-grid">
                          <dt>{lang === 'en' ? 'Mechanism' : '機轉'}</dt>
                          <dd>{drug.mechanism[lang]}</dd>

                          <dt>{lang === 'en' ? 'Use' : '用途'}</dt>
                          <dd>{drug.use[lang]}</dd>
                        </dl>
                      </div>
                    ))}
                  </>
                ) : (
                  /* Branch 3: Classes II / III / IV — the class itself is the
                     entity. Drug-card without a .drug-name header since the
                     h4 above already identifies the class. */
                  <div className="drug-card">
                    <dl className="detail-grid">
                      <dt>{lang === 'en' ? 'Mechanism' : '機轉'}</dt>
                      <dd>{drugClass.mechanism[lang]}</dd>

                      <dt>{lang === 'en' ? 'Drugs' : '藥物'}</dt>
                      <dd>{drugClass.examples[lang]}</dd>

                      <dt>{lang === 'en' ? 'ECG' : '心電圖'}</dt>
                      <dd>{drugClass.ecg_effect[lang]}</dd>

                      {drugClass.clinical_applications && (
                        <>
                          <dt>{lang === 'en' ? 'Use' : '用途'}</dt>
                          <dd>{drugClass.clinical_applications[lang]}</dd>
                        </>
                      )}

                      {drugClass.special_note && (
                        <>
                          <dt>{lang === 'en' ? 'Note' : '備註'}</dt>
                          <dd>{drugClass.special_note[lang]}</dd>
                        </>
                      )}

                      {drugClass.warning && (
                        <>
                          <dt className="caution">{lang === 'en' ? 'Warning' : '警告'}</dt>
                          <dd className="caution">{drugClass.warning[lang]}</dd>
                        </>
                      )}

                      {drugClass.contraindications && (
                        <>
                          <dt className="caution">{lang === 'en' ? 'Avoid' : '禁用'}</dt>
                          <dd className="caution">{drugClass.contraindications[lang]}</dd>
                        </>
                      )}
                    </dl>
                  </div>
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
