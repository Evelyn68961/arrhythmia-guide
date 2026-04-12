import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import data from '../data/vt.json'
import introImg from '../assets/images/VT-intro.png'
import etiImg from '../assets/images/VT-etiology.png'
import classImg from '../assets/images/VT-classification.png'
import treatImg from '../assets/images/VT-acute-treatment.png'
import preventImg from '../assets/images/VT-longterm-prevention.png'

export default function VT() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview',   zh: '概述' }, img: introImg },
    { label: { en: 'Etiology',   zh: '病因' }, img: etiImg },
    { label: { en: 'Types',      zh: '分類' }, img: classImg },
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
            <img src={introImg} alt="VT Overview" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={etiImg} alt="VT Etiology" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={classImg} alt="VT Classification" />
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
              {/* Opening definition paragraph — no heading, since the first
                  paragraph of an Overview tab is self-evidently the definition. */}
              <p>{data.definition[lang]}</p>

              <h4>{data.clinical_presentation[lang]}</h4>
              {/* Three clinical states as detail-grid rows. Labels are
                  hardcoded short forms to keep the label column narrow — the
                  full JSON labels ("Hemodynamically Stable", etc.) are too
                  wide for the grid. The Pulseless row gets amber caution
                  treatment because it's a cardiac arrest emergency. */}
              <dl className="detail-grid">
                <dt>{lang === 'en' ? 'Stable' : '穩定'}</dt>
                <dd>
                  <ul>
                    {data.clinical_presentation.hemodynamically_stable.symptoms.map((s, index) => (
                      <li key={index}>{s[lang]}</li>
                    ))}
                  </ul>
                </dd>

                <dt>{lang === 'en' ? 'Unstable' : '不穩定'}</dt>
                <dd>
                  <ul>
                    {data.clinical_presentation.hemodynamically_unstable.symptoms.map((s, index) => (
                      <li key={index}>{s[lang]}</li>
                    ))}
                  </ul>
                </dd>

                <dt className="caution">{lang === 'en' ? 'Pulseless' : '無脈搏'}</dt>
                <dd className="caution">
                  <strong>{data.clinical_presentation.pulseless_vt.warning[lang]}</strong>
                  <ul>
                    {data.clinical_presentation.pulseless_vt.signs.map((s, index) => (
                      <li key={index}>{s[lang]}</li>
                    ))}
                  </ul>
                </dd>
              </dl>

              <h4>{data.ecg_characteristics[lang]}</h4>
              {/* Bare detail-grid — no card wrapper because the h4 above heads
                  the block; these are just labeled observations, not an entity
                  with attributes. Same pattern as SVT's ECG characteristics. */}
              <dl className="detail-grid">
                <dt>{lang === 'en' ? 'Rate' : '心率'}</dt>
                <dd>{data.ecg_characteristics.general.rate[lang]}</dd>

                <dt>{lang === 'en' ? 'Rhythm' : '節律'}</dt>
                <dd>{data.ecg_characteristics.general.rhythm[lang]}</dd>

                <dt>QRS</dt>
                <dd>{data.ecg_characteristics.general.qrs_complex[lang]}</dd>
              </dl>
          </div>

          {/* Tab 1: Etiology & Pathophysiology */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
              <h4>{data.etiology[lang]}</h4>
              {/* Four etiology categories as detail-grid rows. Short labels
                  hardcoded so the label column stays narrow; the surrounding
                  h4 "Etiology" provides the context for interpretation. */}
              <dl className="detail-grid">
                <dt>{lang === 'en' ? 'Structural' : '結構性'}</dt>
                <dd>
                  <ul>
                    {data.etiology.structural_heart_disease.items.map((cause, index) => (
                      <li key={index}>{cause[lang]}</li>
                    ))}
                  </ul>
                </dd>

                <dt>{lang === 'en' ? 'Idiopathic' : '特發性'}</dt>
                <dd>
                  <ul>
                    {data.etiology.idiopathic_channelopathies.idiopathic_vt.items.map((cause, index) => (
                      <li key={index}>{cause[lang]}</li>
                    ))}
                  </ul>
                </dd>

                <dt>{lang === 'en' ? 'Channelopathy' : '離子通道病'}</dt>
                <dd>
                  <ul>
                    {data.etiology.idiopathic_channelopathies.channelopathies.items.map((cause, index) => (
                      <li key={index}>{cause[lang]}</li>
                    ))}
                  </ul>
                </dd>

                <dt>{lang === 'en' ? 'Reversible' : '可逆性'}</dt>
                <dd>
                  <ul>
                    {data.etiology.idiopathic_channelopathies.reversible_causes.items.map((cause, index) => (
                      <li key={index}>{cause[lang]}</li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <br />
              <h4>{data.pathophysiology[lang]}</h4>
              {data.pathophysiology.mechanisms.map((mech, index) => (
                <div key={index}>
                  <h5>{mech.name[lang]}</h5>
                  {mech.description && <p>{mech.description[lang]}</p>}
                  {/* Subtypes: 2-field (name + description) — use bold-inline
                      pattern rather than heavy h5+p blocks with inline style. */}
                  {mech.subtypes && mech.subtypes.map((sub, i) => (
                    <div key={i} className="drug-card">
                      <div className="drug-name">{sub.name[lang]}</div>
                      <dl className="detail-grid">
                        <dt>{lang === 'en' ? 'Description' : '描述'}</dt>
                        <dd>{sub.description[lang]}</dd>
                      </dl>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          {/* Tab 2: Classification */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
              {/* Temporal Classification: 2 types with asymmetric fields.
                  NSVT has definition + prognostic_value; Sustained VT has
                  definition + therapeutic_implications. The JSX renders
                  whichever optional field is present for each type. */}
              <h4>{data.classification.by_duration[lang]}</h4>
              <p className="section-subtitle">
                {data.classification.by_duration.subtitle[lang]}
              </p>
              {data.classification.by_duration.types.map((item) => (
                <div key={item.type} className="drug-card">
                  <div className="drug-name">{item.name[lang]}</div>
                  <dl className="detail-grid">
                    <dt>{lang === 'en' ? 'Definition' : '定義'}</dt>
                    <dd>{item.definition[lang]}</dd>

                    {item.prognostic_value && (
                      <>
                        <dt>{lang === 'en' ? 'Prognosis' : '預後意義'}</dt>
                        <dd>{item.prognostic_value[lang]}</dd>
                      </>
                    )}

                    {item.therapeutic_implications && (
                      <>
                        <dt>{lang === 'en' ? 'Implications' : '治療意義'}</dt>
                        <dd>{item.therapeutic_implications[lang]}</dd>
                      </>
                    )}
                  </dl>
                </div>
              ))}

              {/* Morphological Classification: 3 types with uniform fields
                  (characteristics + mechanism + implications). */}
              <h4>{data.classification.by_morphology[lang]}</h4>
              <p className="section-subtitle">
                {data.classification.by_morphology.subtitle[lang]}
              </p>
              {data.classification.by_morphology.types.map((item) => (
                <div key={item.type} className="drug-card">
                  <div className="drug-name">{item.name[lang]}</div>
                  <dl className="detail-grid">
                    <dt>{lang === 'en' ? 'Characteristics' : '特徵'}</dt>
                    <dd>{item.characteristics[lang]}</dd>

                    <dt>{lang === 'en' ? 'Mechanism' : '機轉'}</dt>
                    <dd>{item.mechanism[lang]}</dd>

                    <dt>{lang === 'en' ? 'Implications' : '意義'}</dt>
                    <dd>{item.implications[lang]}</dd>
                  </dl>
                </div>
              ))}
          </div>

          {/* Tab 3: Treatment */}
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
              {/* Opening paragraph — no h3 wrapper, matches the other VT tabs'
                  structure (Overview / Etiology / Types all open with prose
                  or h4 directly, no tab-level h3 heading). */}
              <p>{data.treatment.fundamental_principle[lang]}</p>

              {/* Pulseless or Unstable VT — merged from two previously
                  separate JSON branches (pulseless_or_unstable has the ACLS
                  protocol steps; pulseless_vt_acls has the pharmacotherapy).
                  Now rendered as one h4 section with two h5 subsections so
                  the actions and drugs for the same clinical scenario are
                  together. Moved to the top of the tab since this is the
                  emergency case readers need to find fastest. */}
              <h4>{data.treatment.pulseless_or_unstable[lang]}</h4>

              <h5>{data.treatment.pulseless_or_unstable.acls_protocol[lang]}</h5>
              <ul>
                {data.treatment.pulseless_or_unstable.acls_protocol.steps.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>

              <h5>{data.treatment.pulseless_vt_acls.pharmacotherapy[lang]}</h5>
              {/* Drug + dose only (1 labeled field) — bold-inline pattern.
                  Fixes the previously nested h4-in-h4 bug. */}
              {data.treatment.pulseless_vt_acls.pharmacotherapy.agents.map((item) => (
                <p key={item.drug}>
                  <strong>{item.drug}</strong> — {item.dose[lang]}
                </p>
              ))}
              <br />
              <h4>{data.treatment.stable_sustained_vt[lang]}</h4>
              <h5>{data.treatment.stable_sustained_vt.approach[lang]}</h5>
              {/* Drug + dose + notes (2 labeled fields) — drug-cards.
                  Fixes the previously nested h4-in-h4 bug. */}
              {data.treatment.stable_sustained_vt.agents.map((item) => (
                <div key={item.drug} className="drug-card">
                  <div className="drug-name">{item.drug}</div>
                  <dl className="detail-grid">
                    <dt>{lang === 'en' ? 'Dose' : '劑量'}</dt>
                    <dd>{item.dose[lang]}</dd>

                    <dt>{lang === 'en' ? 'Notes' : '備註'}</dt>
                    <dd>{item.notes[lang]}</dd>
                  </dl>
                </div>
              ))}
              <h4>{data.treatment.electrical_cardioversion[lang]}</h4>
              <p>{data.treatment.electrical_cardioversion.description[lang]}</p>
              <ul>
                {data.treatment.electrical_cardioversion.key_points.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
              <br />   
              <h4>{data.treatment.address_reversible_factors[lang]}</h4>
              <ul>
                {data.treatment.address_reversible_factors.critical_corrections.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
              <h5>{data.treatment.address_reversible_factors.drug_selection_considerations[lang]}</h5>
              <ul>
                {data.treatment.address_reversible_factors.drug_selection_considerations.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
          </div>

          {/* Tab 4: Prevention */}
          <div className={`tab-content ${activeTab === 4 ? 'active' : ''}`}>
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
            <br />

            <h4>{data.prevention.antiarrhythmic_drug_therapy[lang]}</h4>
            {data.prevention.antiarrhythmic_drug_therapy.agents.map((item) => (
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
            <br />
            <h4>{data.prevention.catheter_ablation[lang]}</h4>
            <p>{data.prevention.catheter_ablation.description[lang]}</p>
            <h5>{data.prevention.catheter_ablation.indications[lang]}</h5>
            <ul>
              {data.prevention.catheter_ablation.indications.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <br />
            <h4>{data.prevention.novel_refractory_management[lang]}</h4>

            {/* STAR and LCSD rendered as drug-cards. Each has:
                  MECHANISM row — the description (how the technique works)
                  INDICATIONS row — nested <ul> of clinical uses
                The two entities are stored as named objects (.star / .lcsd)
                rather than an array, so they're rendered with two explicit
                blocks rather than a map. */}
            <div className="drug-card">
              <div className="drug-name">
                {data.prevention.novel_refractory_management.star.name[lang]}
              </div>
              <dl className="detail-grid">
                <dt>{lang === 'en' ? 'Mechanism' : '機轉'}</dt>
                <dd>{data.prevention.novel_refractory_management.star.description[lang]}</dd>

                <dt>{lang === 'en' ? 'Indications' : '適應症'}</dt>
                <dd>
                  <ul>
                    {data.prevention.novel_refractory_management.star.indications.map((item, index) => (
                      <li key={index}>{item[lang]}</li>
                    ))}
                  </ul>
                </dd>
              </dl>
            </div>

            <div className="drug-card">
              <div className="drug-name">
                {data.prevention.novel_refractory_management.lcsd.name[lang]}
              </div>
              <dl className="detail-grid">
                <dt>{lang === 'en' ? 'Mechanism' : '機轉'}</dt>
                <dd>{data.prevention.novel_refractory_management.lcsd.description[lang]}</dd>

                <dt>{lang === 'en' ? 'Indications' : '適應症'}</dt>
                <dd>
                  <ul>
                    {data.prevention.novel_refractory_management.lcsd.indications.map((item, index) => (
                      <li key={index}>{item[lang]}</li>
                    ))}
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}