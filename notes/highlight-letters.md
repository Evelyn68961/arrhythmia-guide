# How to Highlight Specific Letters in React

Highlight specific characters in a string by wrapping them in styled `<span>` elements.

## The Problem

Given the text "Supraventricular Tachycardia", we want to highlight the letters that form the abbreviation **SVT** — the **S**, the **v**, and the **T**.

These letters are at specific positions in the string, so we need to tell React exactly which characters to highlight.

## Step 1: Define the Data with Highlight Indices

Each item includes a `highlight` array with the character indices (starting from 0) to highlight:

```jsx
const tabs = [
  {
    label: 'Supraventricular Tachycardia',
    highlight: [0, 5, 17]
    //          S  v   T
  },
  {
    label: 'Atrial Fibrillation',
    highlight: [0, 7]
    //          A  F
  },
  {
    label: 'Ventricular Tachycardia',
    highlight: [0, 12]
    //          V   T
  }
]
```

### How to Count the Index

Count each character starting from 0, including spaces:

```
S u p r a v e n t r i  c  u  l  a  r     T  a  c  h  y  c  a  r  d  i  a
0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27
          ^                               ^
          |                               |
        index 5 (v)                    index 17 (T)
```

So `highlight: [0, 5, 17]` highlights **S**(0), **v**(5), **T**(17) --> **SVT**.

## Step 2: Create the Highlight Function

```jsx
function highlightAt(text, indices) {
  return text.split('').map((char, i) =>
    indices.includes(i)
      ? <span key={i} className="abbr-letter">{char}</span>
      : char
  )
}
```

How it works:

1. `text.split('')` — splits the string into an array of individual characters
   ```
   'SVT' --> ['S', 'V', 'T']
   ```

2. `.map((char, i) => ...)` — loops over each character with its index

3. `indices.includes(i)` — checks if this character's index is in the highlight list

4. If yes: wrap it in a `<span>` with a CSS class for styling
   ```jsx
   <span className="abbr-letter">S</span>
   ```

5. If no: return the plain character as-is

6. `key={i}` — React requires a unique key for each element in a list

### What the Function Returns

For `highlightAt('Atrial Fibrillation', [0, 7])`:

```jsx
[
  <span className="abbr-letter">A</span>,  // index 0 - highlighted
  't',                                      // index 1 - plain
  'r',                                      // index 2 - plain
  'i',                                      // index 3 - plain
  'a',                                      // index 4 - plain
  'l',                                      // index 5 - plain
  ' ',                                      // index 6 - plain
  <span className="abbr-letter">F</span>,  // index 7 - highlighted
  'i',                                      // index 8 - plain
  ...
]
```

React renders this array as: **A**trial **F**ibrillation

## Step 3: Use It in JSX

```jsx
{tabs.map((tab) => (
  <Link key={tab.to} to={tab.to} className="home-tab">
    {tab.highlight.length > 0
      ? highlightAt(tab.label, tab.highlight)
      : tab.label}
  </Link>
))}
```

- If `highlight` has indices, call `highlightAt` to render with highlights
- If `highlight` is empty (`[]`), render the plain label text

## Step 4: Style the Highlighted Letters (CSS)

```css
.abbr-letter {
  color: #3498db;
  font-weight: 700;
}
```

- `color: #3498db` — blue color to stand out
- `font-weight: 700` — bold to make it more visible

### Handle Hover State

If the parent element changes color on hover (e.g., a button that turns blue), make the highlighted letters match:

```css
.home-tab:hover .abbr-letter {
  color: white;
}
```

Without this, the blue letters would become invisible against a blue background on hover.

## Complete Example

```jsx
function highlightAt(text, indices) {
  return text.split('').map((char, i) =>
    indices.includes(i)
      ? <span key={i} className="abbr-letter">{char}</span>
      : char
  )
}

const tabs = [
  { label: 'Supraventricular Tachycardia', highlight: [0, 5, 17] },  // SVT
  { label: 'Atrial Fibrillation',          highlight: [0, 7] },       // AF
  { label: 'Ventricular Tachycardia',      highlight: [0, 12] },      // VT
  { label: 'Ventricular Fibrillation',     highlight: [0, 12] },      // VF
  { label: 'Sinus Node Dysfunction',       highlight: [0, 6, 11] },   // SND
  { label: 'AV Block',                     highlight: [0, 1] },       // AV
  { label: 'ECG Interpretation',           highlight: [0, 1, 2] },    // ECG
  { label: 'Cardiac Electrophysiology',    highlight: [] },           // no abbreviation
]

// Render
{tabs.map((tab, i) => (
  <span key={i} className="home-tab">
    {tab.highlight.length > 0
      ? highlightAt(tab.label, tab.highlight)
      : tab.label}
  </span>
))}
```

## Key Concepts

| Concept | What it does |
|---------|-------------|
| `split('')` | Breaks a string into an array of characters |
| `map((char, i) => ...)` | Loops with both the character and its index |
| `includes(i)` | Checks if the current index is in the highlight list |
| `<span>` wrapper | Allows styling individual characters with CSS |
| `key={i}` | Required by React for list rendering |
