# Drug-card and detail-grid: the labeled-data patterns

This codebase uses two composable CSS classes for presenting structured key-value medical data: **`.detail-grid`** (a labeled key/value layout) and **`.drug-card`** (a wrapper that adds chrome around a detail-grid). Together they replace the bullet-list / bold-prefix-paragraph approach that was used originally.

This doc covers: what each class does, when to use which composition, the required HTML/JSX structure, label conventions, and where they're used.

For the deep technical explanation of how CSS Grid interacts with conditional JSX rows, see [css-grid-and-react-fragments.md](css-grid-and-react-fragments.md).

---

## The two classes

### `.detail-grid` — the layout primitive

A two-column CSS Grid that renders labeled key/value rows. The label column auto-sizes to its widest label, the value column takes the rest. All labels in a given grid align vertically regardless of which is longest.

```html
<dl class="detail-grid">
  <dt>Rate</dt>      <dd>150–250 bpm</dd>
  <dt>Rhythm</dt>    <dd>Regular</dd>
  <dt>QRS</dt>       <dd>Narrow (&lt; 120 ms)</dd>
</dl>
```

**Key CSS properties** (defined in [src/index.css](../src/index.css)):

```css
.detail-grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.4rem 0.9rem;
}

.detail-grid dt {
  font-size: 0.7rem;
  font-weight: 700;
  color: #6b7a8a;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  /* ... */
}

.detail-grid dd {
  font-size: 0.9rem;
  line-height: 1.55;
  color: #2c3e50;
}
```

The labels render as small uppercase slate-gray text. The values render as normal-sized dark navy text. The size and color difference visually subordinates the labels so they read as "field names" not "headings."

### `.drug-card` — the wrapper with chrome

A container that wraps a `.detail-grid` (and optionally a `.drug-name` header) with visual chrome: soft background, gray left border, rounded right edges, padding.

```html
<div class="drug-card">
  <div class="drug-name">Verapamil</div>
  <dl class="detail-grid">
    <!-- ... -->
  </dl>
</div>
```

**Key CSS properties**:

```css
.drug-card {
  background: #fafbfc;
  border-left: 3px solid #cbd5dd;
  border-radius: 0 6px 6px 0;
  padding: 0.7rem 1rem 0.8rem 1rem;
}

.drug-card .drug-name {
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

/* When a drug-card holds a detail-grid, kill the grid's own margin
   since the card already provides padding. */
.drug-card .detail-grid {
  margin: 0;
}
```

Why a separate class instead of one combined one: the chrome (background, border, header) is for "named entity" content (drugs, structures), but the grid layout is generic — it's also useful for non-entity labeled data like ECG characteristics. Splitting them lets each be used independently.

---

## Three composition modes

### Mode 1: bare `.detail-grid` (no wrapper)

Use when the labeled data is **not an entity with a name** — it's just a list of facts about the surrounding section.

```jsx
<h4>{data.ecg_characteristics[lang]}</h4>
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
```

No card chrome, no border, no background. Just the grid sitting under the section heading. The `<h4>` above provides all the context the grid needs.

**Real example**: ECG characteristics block in [src/pages/SVT.jsx](../src/pages/SVT.jsx) (Tab 1, ECG & Pathophysiology).

### Mode 2: `.drug-card` with `.drug-name` header

Use when you have **multiple named entities** sharing a common parent heading. Each entity becomes its own card with its own name header.

```jsx
<h6>Non-Dihydropyridine Calcium Channel Blockers</h6>
{agents.map((item) => (
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
```

Renders as multiple stacked cards (Verapamil, Diltiazem, etc.), each with its own drug name as a header inside the card. The category heading above (`<h6>`) groups them.

**Real examples**:

- Second-line drugs in [src/pages/SVT.jsx](../src/pages/SVT.jsx) (Tab 2, Acute) — Verapamil, Diltiazem, Metoprolol, Esmolol
- Pharmacotherapy agents in [src/pages/SVT.jsx](../src/pages/SVT.jsx) (Tab 3, Prevention)
- Class I subclasses (Ia, Ib, Ic) in [src/pages/CardiacElectro.jsx](../src/pages/CardiacElectro.jsx) (Tab 2, Antiarrhythmic Drugs)
- Conduction structures (SA Node, AV Node, etc.) in CardiacElectro Tab 0
- Action potential phases (Phase 0–4) in CardiacElectro Tab 1

### Mode 3: `.drug-card` **without** `.drug-name` header

Use when you have **a single named entity** that's already identified by the surrounding heading. The card chrome groups the data, but the name lives one level up.

```jsx
<h5>{data.treatment.stable_treatment.first_line_drug[lang]}</h5>
<p>{data.treatment.stable_treatment.first_line_drug.description[lang]}</p>

{/* No .drug-name header — Adenosine is named in the h5 above. */}
<div className="drug-card">
  <dl className="detail-grid">
    <dt>{lang === 'en' ? 'Dose' : '劑量'}</dt>
    <dd>{first_line_drug.dosing.initial[lang]}</dd>

    <dt>{lang === 'en' ? 'Repeat' : '後續'}</dt>
    <dd>{first_line_drug.dosing.subsequent[lang]}</dd>

    {/* ... more rows ... */}
  </dl>
</div>
```

Renders as a single card directly under the section heading. Adding a `.drug-name` "Adenosine" inside would duplicate what the `<h5>` already says.

**Real examples**:

- First-line drug (Adenosine) in [src/pages/SVT.jsx](../src/pages/SVT.jsx) (Tab 2, Acute)
- Class II / III / IV in [src/pages/CardiacElectro.jsx](../src/pages/CardiacElectro.jsx) (Tab 2, Antiarrhythmic Drugs) — each class is the entity, the h4 names it

---

## Decision rule: which mode do I use?

| Question | Answer |
|---|---|
| Is the data describing an entity (drug, structure, phase) with a name? | If no → **Mode 1** (bare detail-grid). Done. |
| Are there multiple entities sharing a common section heading? | If yes → **Mode 2** (card with .drug-name header). |
| Is there only one entity, and is it already named in the heading immediately above? | If yes → **Mode 3** (card without .drug-name header). |

**Heuristic for the "named in the heading" question**: read the heading above out loud. If the entity's name is in that sentence (e.g. "First-Line Drug: **Adenosine**"), use Mode 3. If not (e.g. "Non-Dihydropyridine **Calcium Channel Blockers**" — names the category, not the drugs), use Mode 2 with each drug naming itself.

---

## The caution variant (amber)

For warning / caution / contraindication rows, add `className="caution"` to **both** the `<dt>` and the `<dd>`:

```jsx
<dt className="caution">{lang === 'en' ? 'Caution' : '注意'}</dt>
<dd className="caution">{item.cautions[lang]}</dd>
```

This switches both the label and the value to amber:

- Label: `#b8860b` (darker amber)
- Value: `#7a5a08` (deep amber, also slightly bolder)

The amber treatment is for **safety-critical info that should catch the eye when skimming** — typically:

- `cautions` / `warnings` (drug warnings, when to be careful)
- `contraindications` (drugs/conditions where this drug is forbidden)

**Don't** use amber for:

- Generic notes / considerations / clinical pearls — too soft for amber
- Common side effects — those are expected, not warnings
- Anything that would cause "amber fatigue" if used too liberally

The amber is rare on purpose. If every other row is amber, nothing is amber.

### Nested `<ul>` inside a caution `<dd>`

If a caution has multiple bullet points (e.g. Adenosine has 5 separate caution items in the JSON), nest a `<ul>` inside the `<dd>`:

```jsx
<dt className="caution">{lang === 'en' ? 'Cautions' : '注意'}</dt>
<dd className="caution">
  <ul>
    {first_line_drug.cautions.items.map((s, i) => (
      <li key={i}>{s[lang]}</li>
    ))}
  </ul>
</dd>
```

The CSS handles this — `.detail-grid dd > ul` is styled to fit inside the grid cell with tight margins, and `.detail-grid dd.caution > ul > li` cascades the amber color to each bullet.

---

## Required structure / gotchas

### Conditional rows need React fragments

Inside a `.detail-grid`, every dt/dd must remain a **direct child of the `<dl>`** for CSS Grid to apply. If you have a conditional row, wrap the dt+dd in `<>...</>` (a React fragment), not a `<div>`:

```jsx
{/* WRONG — div breaks the grid */}
{condition && (
  <div>
    <dt>Optional</dt>
    <dd>{value}</dd>
  </div>
)}

{/* CORRECT — fragment is invisible, dt/dd stay direct children */}
{condition && (
  <>
    <dt>Optional</dt>
    <dd>{value}</dd>
  </>
)}
```

For the full explanation of why this matters, see [css-grid-and-react-fragments.md](css-grid-and-react-fragments.md).

### Description paragraphs go *outside* the `<dl>`, not inside

If your card needs a longer narrative paragraph in addition to the labeled rows, put the `<p>` **after** `</dl>` but still **inside** `.drug-card`:

```jsx
<div className="drug-card">
  <div className="drug-name">SA Node</div>
  <dl className="detail-grid">
    <dt>Role</dt><dd>Primary pacemaker</dd>
    <dt>Rate</dt><dd>60–100 bpm</dd>
  </dl>
  {/* The <p> is a sibling of the <dl>, child of .drug-card. */}
  {item.description && <p>{item.description[lang]}</p>}
</div>
```

The `<p>` sits inside the card's padding and reads as part of the entity, but it doesn't enter the grid context. Don't try to put `<p>` inside the `<dl>` — it's invalid HTML and breaks grid alignment.

### `drug-name` is a `<div>`, not an `<h6>`

Use a plain `<div className="drug-name">` for the card's name header, not a heading element. Reasons:

1. The card name isn't part of the page's heading hierarchy — it's a card label, not a document section.
2. Using `<h6>` would inherit the global `.content h6` slate styling and make the drug name look muted, which is the opposite of what we want (the drug name should be prominent inside its card).
3. The `.drug-name` class explicitly overrides to dark navy, bold, slightly larger.

The `<h6>` element above the card (the *category* heading like "Calcium Channel Blockers") IS still a heading in the hierarchy. Only the drug name *inside* the card uses a div.

---

## Label conventions

Keep labels short and uppercase. The CSS applies `text-transform: uppercase` and `font-size: 0.7rem`, so labels render as compact small-caps. Long labels widen the label column unnecessarily and push every value rightward.

### Standard labels used across the codebase

Try to reuse these before inventing new ones — consistency helps the reader build a mental shorthand.

| EN label | ZH label | Purpose | Amber? |
|---|---|---|---|
| `Dose` | `劑量` | Initial dose, dosing | no |
| `Repeat` | `後續` | Follow-up dose, repeat dose | no |
| `Admin` | `給藥` | Administration method | no |
| `Effects` | `效果` | Expected effects | no |
| `Mechanism` | `機轉` | Mechanism of action | no |
| `Drugs` | `藥物` | Example drugs in a class | no |
| `ECG` | `心電圖` | ECG effect or correlation | no |
| `Use` | `用途` | Clinical use, indication | no |
| `Note` | `備註` | General note, special note | no |
| `Role` | `角色` | Functional role (e.g. SA Node = primary pacemaker) | no |
| `Rate` | `頻率` | Intrinsic rate, firing rate | no |
| `Voltage` | `電壓` | Voltage range (action potential) | no |
| `Ions` | `離子` | Ion movement / current | no |
| `Clinical` | `臨床` | Clinical significance | no |
| `Caution` | `注意` | Single caution (drug-specific warning) | **yes** |
| `Cautions` | `注意` | Multiple cautions (use nested `<ul>`) | **yes** |
| `Warning` | `警告` | Strong warning (general) | **yes** |
| `Avoid` | `禁用` | Contraindications, "do not give to" | **yes** |

### Renaming guideline

If the JSON field name is verbose (`clinical_applications`, `further_dosing`, `examples`), rename to a shorter label in the JSX. The label should be **how a clinician would think of the field**, not how a database schema names it.

Examples of renames already in the codebase:

- `examples` → `Drugs`
- `ecg_effect` → `ECG`
- `clinical_applications` → `Use`
- `contraindications` → `Avoid`
- `further_dosing` → `Repeat`
- `intrinsic_rate` → `Rate`
- `ion_movement` → `Ions`
- `clinical_significance` → `Clinical`

### Label ordering for safety-critical cards

When a card has both factual rows and amber caution rows, **put neutral info first, warnings last**. Example ordering for Branch 3 of Vaughan-Williams:

```
MECHANISM    (what does it do)
DRUGS        (which ones)
ECG          (what to look for)
USE          (when to use it)
NOTE         (general caveat)
WARNING      (amber — pay attention)
AVOID        (amber — don't give to these patients)
```

This way the reader scans factual data top-to-bottom and hits the amber safety rows just before making a decision. Putting WARNING above MECHANISM would fire the alarm before the reader knows what the drug even is.

---

## Where these patterns are used

As of writing:

- [src/pages/SVT.jsx](../src/pages/SVT.jsx)
  - Tab 1 (ECG & Pathophysiology): bare detail-grid for ECG characteristics
  - Tab 2 (Acute): drug-card without header (Adenosine), drug-cards with headers (Verapamil, Diltiazem, Metoprolol, Esmolol)
  - Tab 3 (Prevention): drug-cards with headers (4 pharmacotherapy agents)
- [src/pages/CardiacElectro.jsx](../src/pages/CardiacElectro.jsx)
  - Tab 0 (Conduction System): drug-cards with headers (each conduction structure)
  - Tab 1 (Action Potential): drug-cards with headers (each phase)
  - Tab 2 (Antiarrhythmic Drugs): all three branches of Vaughan-Williams (cards with headers for Class I subclasses + Class V drugs, cards without headers for Classes II/III/IV)
- [src/index.css](../src/index.css): `.detail-grid`, `.drug-card`, `.drug-name`, `.detail-grid dt.caution`, `.detail-grid dd.caution` class definitions

When adding new sections elsewhere (AF, VT, VF, AVBlock, SND, ECGInterpret, ArrhyOverview), check whether the data shape fits this pattern before reaching for bullet lists or bold-prefix paragraphs.

---

## See also

- [css-grid-and-react-fragments.md](css-grid-and-react-fragments.md) — deep dive on why CSS Grid + conditional JSX rows requires fragments instead of div wrappers
- [src/index.css](../src/index.css) — full CSS source for all the classes mentioned here
