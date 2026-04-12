# How to Create a Search Bar in React

A search bar that filters a list of items in real time using React state.

## Overview

The search bar works in 3 steps:

1. Store the user's input in state (`useState`)
2. Filter the data array based on the input
3. Render only the filtered results

## Step 1: Set Up State

```jsx
import { useState } from 'react'

const [search, setSearch] = useState('')
```

- `search` holds the current text the user has typed
- `setSearch` updates that text whenever the input changes

## Step 2: Create the Input Element

```jsx
<input
  className="home-search"
  type="text"
  placeholder="Search topics..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

- `value={search}` — binds the input to our state (controlled component)
- `onChange` — fires on every keystroke, updating `search` with the new value
- `placeholder` — greyed-out hint text shown when the input is empty

## Step 3: Filter the Data

```jsx
const query = search.toLowerCase()

const filtered = query
  ? categories.filter(cat =>
      cat.title.en.toLowerCase().includes(query) ||
      cat.title.zh.includes(query) ||
      cat.summary.en.toLowerCase().includes(query) ||
      cat.tabs.some(tab =>
        tab.label.en.toLowerCase().includes(query) ||
        tab.label.zh.includes(query)
      )
    )
  : categories
```

How it works:

- If `query` is empty (user hasn't typed anything), show all `categories`
- If `query` has text, keep only categories where **any** of these match:
  - The category title (English or Chinese)
  - The category summary
  - Any tab label within that category
- `.toLowerCase()` makes the search case-insensitive
- `.includes(query)` checks if the search text appears anywhere in the string
- `.some()` returns `true` if at least one tab label matches

## Step 4: Render the Filtered Results

```jsx
<div className="home-cards">
  {filtered.map((cat) => (
    <div key={cat.title.en} className="home-card">
      <h2>{cat.title[lang]}</h2>
      <p>{cat.summary[lang]}</p>
    </div>
  ))}

  {filtered.length === 0 && (
    <p className="no-results">No matching topics found.</p>
  )}
</div>
```

- `filtered.map(...)` — loops over the filtered array (not the original)
- When nothing matches, `filtered.length === 0` shows a "no results" message

## Step 5: Style the Search Bar (CSS)

```css
.home-search {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid rgba(44, 62, 80, 0.15);
  border-radius: 8px;
  outline: none;
  margin-bottom: 1.25rem;
  transition: border-color 0.2s ease;
}

.home-search:focus {
  border-color: #3498db;
}
```

- `width: 100%` — stretches to fill the container
- `border-radius: 8px` — rounded corners
- `outline: none` — removes the default browser focus outline
- `transition` + `:focus` — smoothly changes border color when the user clicks into the input

## How It All Connects

```
User types "ventri"
        |
        v
onChange fires --> setSearch("ventri")
        |
        v
Component re-renders --> query = "ventri"
        |
        v
filter runs --> keeps "Tachyarrhythmias" (has "Ventricular Tachycardia" and "Ventricular Fibrillation")
        |
        v
Only matching cards are displayed
```

## Key Concepts

| Concept | What it does |
|---------|-------------|
| `useState` | Creates a reactive variable that triggers re-render when changed |
| Controlled input | `value` + `onChange` keeps React in control of the input |
| `.filter()` | Creates a new array with only the items that pass the test |
| `.includes()` | Checks if a string contains a substring |
| `.some()` | Returns true if any element in an array passes the test |
| `.toLowerCase()` | Makes comparison case-insensitive |
