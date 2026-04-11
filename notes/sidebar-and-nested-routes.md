# Sidebar layout with nested routes

This codebase uses a sticky-sidebar + content-area layout for the three top-level sections (Fundamentals, Tachyarrhythmias, Bradyarrhythmias). The sidebar shows sub-topics; clicking one swaps the content area while the sidebar stays mounted. URLs like `/tachyarrhythmias/svt` are deep-linkable.

This is built on **React Router layout routes** with `<Outlet />`. This doc covers: the architecture, the three layout files, the sidebar JSX shape, the CSS, how to add a new layout from scratch, and the design decisions baked in.

---

## The architecture in one picture

```
URL                              Component tree
/tachyarrhythmias/svt    →       <App>
                                   <Navbar />
                                   <TachyLayout>           ← layout route
                                     <aside>sidebar</aside>
                                     <Outlet>              ← placeholder
                                       <SVT />             ← child route fills it
                                     </Outlet>
                                   </TachyLayout>
                                 </App>

/tachyarrhythmias/af     →       same tree, but <Outlet> now contains <AF />
```

The key insight: **`TachyLayout` does not unmount when you click between SVT and AF.** Only the thing inside `<Outlet />` swaps. The sidebar stays put — no flash, no re-render — because React Router knows the parent layout still matches the URL.

This is the entire benefit of layout routes over flat routes: **shared chrome across sibling pages, with no manual state management**.

---

## The three layout files

The codebase has three layouts, all following the same shape:

| File | Section | Children |
|---|---|---|
| [src/pages/FundamentalsLayout.jsx](../src/pages/FundamentalsLayout.jsx) | `/fundamentals/*` | CardiacElectro, ECGInterpret, ArrhyOverview |
| [src/pages/TachyLayout.jsx](../src/pages/TachyLayout.jsx) | `/tachyarrhythmias/*` | SVT, AF, VT, VF |
| [src/pages/BradyLayout.jsx](../src/pages/BradyLayout.jsx) | `/bradyarrhythmias/*` | SND, AVBlock |

All three files are nearly identical structurally — they only differ in the `conditions` (or `topics`) array. If you understand one, you understand all three.

---

## The sidebar JSX shape

Here's the structural skeleton (simplified from [TachyLayout.jsx](../src/pages/TachyLayout.jsx)):

```jsx
import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function TachyLayout() {
  const { lang } = useLanguage()

  // Each entry has a path, an abbreviation, and a bilingual full name.
  const conditions = [
    {
      path: 'svt',
      abbr: 'SVT',
      full: { en: 'Supraventricular Tachycardia', zh: '上心室心搏過速' },
    },
    // ... more entries
  ]

  return (
    <div className="sidebar-layout">
      <aside className="condition-sidebar">
        <h2 className="sidebar-title">
          {lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}
        </h2>
        <nav>
          {conditions.map((c) => (
            <NavLink key={c.path} to={c.path} className="condition-link">
              <span className="condition-link__abbr">{c.abbr}</span>
              <span className="condition-link__full">{c.full[lang]}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="condition-content">
        <Outlet />
      </div>
    </div>
  )
}
```

Three things doing work here:

### `<NavLink>` instead of `<Link>`

`NavLink` is `Link` plus a free "is this me?" check. When the URL matches the `to` prop, React Router automatically adds an `active` class. No manual `activeTab` state, no click handlers to track which item is current. Just `<NavLink to="svt">` and the CSS handles the highlighting via `.condition-link.active`.

### `<Outlet />` — the placeholder

`<Outlet />` is where React Router renders the matching child route. The layout component itself has no idea which child will appear there — it just provides a slot. The router decides at runtime based on the URL.

This is what makes the sidebar persistent: the layout's JSX (sidebar + outlet wrapper) stays stable, only the contents of the outlet change.

### Relative paths in `to`

Note `to="svt"` not `to="/tachyarrhythmias/svt"`. When `<NavLink>` lives inside a route nested under `/tachyarrhythmias`, React Router resolves relative paths against the parent. Benefit: if you ever rename the parent route to `/fast-rhythms`, the layout file doesn't need to change — the relative paths still work.

---

## The route registration in App.jsx

Inside [src/App.jsx](../src/App.jsx), the layout routes are registered like this:

```jsx
<Route path="/tachyarrhythmias" element={<TachyLayout />}>
  <Route index element={<Navigate to="svt" replace />} />
  <Route path="svt" element={<SVT />} />
  <Route path="af"  element={<AF />} />
  <Route path="vt"  element={<VT />} />
  <Route path="vf"  element={<VF />} />
</Route>
```

Three things to notice:

### The parent has children

`<Route path="/tachyarrhythmias">` is the parent. Its `element={<TachyLayout />}` provides the shell. The nested `<Route>` children tell React Router what to render inside the parent's `<Outlet />` based on the URL suffix.

### `<Route index>` handles the bare URL

What happens when someone visits `/tachyarrhythmias` with no sub-path? Without an index route, the layout would render with an empty `<Outlet />` — just the sidebar next to a blank content area. The `index` route matches the parent URL exactly and provides a default.

```jsx
<Route index element={<Navigate to="svt" replace />} />
```

This says "when the URL is exactly `/tachyarrhythmias`, redirect to `/tachyarrhythmias/svt`." The user lands on a real condition instead of a blank page.

### `replace` prevents the back-button loop

The `<Navigate replace />` prop is critical. Without it:

1. User visits `/tachyarrhythmias` → redirects to `/tachyarrhythmias/svt`. History stack: `[..., /tachyarrhythmias, /tachyarrhythmias/svt]`
2. User clicks Back. Browser navigates to `/tachyarrhythmias`.
3. The Navigate redirects again to `/tachyarrhythmias/svt`. **The Back button is broken** — it just reloads SVT.

With `replace`, the redirect *replaces* the current history entry instead of adding a new one. Visiting `/tachyarrhythmias` only ever leaves `/tachyarrhythmias/svt` in history, and Back goes to wherever the user was *before* tachyarrhythmias.

**Always use `replace` on index-route redirects.** It's the difference between a working back button and a broken one.

---

## CSS classes used

All sidebar styles live in [src/index.css](../src/index.css). Key classes:

| Class | Purpose |
|---|---|
| `.sidebar-layout` | The 2-column grid wrapper. `grid-template-columns: 220px 1fr` |
| `.condition-sidebar` | The sticky `<aside>` card. Soft background, rounded, `position: sticky; top: 5rem` |
| `.sidebar-title` | The section name at the top of the sidebar |
| `.condition-link` | Each clickable link (the `<NavLink>` element itself) |
| `.condition-link__abbr` | Bold primary label inside the link |
| `.condition-link__full` | Muted secondary label, truncates with ellipsis |
| `.condition-link.active` | Auto-applied by NavLink when the route matches |
| `.condition-content` | The right-hand content column (where `<Outlet />` lives) |

### Why CSS Grid for the layout

```css
.sidebar-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 2rem;
  align-items: start;
}
```

Grid is the right tool for "fixed sidebar + flexible content." `1fr` means the content column takes whatever's left after the 220px sidebar and 2rem gap. Resize the browser → content rebalances, sidebar stays fixed. `align-items: start` keeps the sidebar anchored to the top instead of stretching to match the content's height.

### Why `position: sticky` on the sidebar

```css
.condition-sidebar {
  position: sticky;
  top: 5rem;
}
```

`sticky` is what makes the sidebar stay on screen as the user scrolls through long content. The `top: 5rem` matches the navbar height — without it, the sidebar would slide under the navbar and get clipped.

`sticky` is better than `fixed` here because it respects the parent column. If the page is short (no scrolling needed), `sticky` does nothing. If the page is long, `sticky` engages. `fixed` would always be glued to the viewport, which can look weird on short pages.

### Why `min-width: 0` on the content column

```css
.condition-content {
  min-width: 0;
  /* ... */
}
```

This is a CSS Grid gotcha. By default, grid items won't shrink below their content's intrinsic minimum width. If a child of the content column has a long unbreakable string (URL, code block, wide image), it can blow out the column and break the layout. `min-width: 0` lets Grid enforce the `1fr` sizing regardless. **Always include this on the flexible side of a Grid layout** — it's a tax you pay to prevent overflow surprises.

---

## The abbr + full label pattern

Each sidebar entry renders two stacked spans:

```html
<a class="condition-link">
  <span class="condition-link__abbr">SVT</span>
  <span class="condition-link__full">Supraventricular Tachycardia</span>
</a>
```

CSS:

```css
.condition-link__abbr {
  display: block;
  font-size: 1rem;
  font-weight: 600;
}

.condition-link__full {
  display: block;
  font-size: 0.78rem;
  color: #7a8896;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

Three benefits of this pattern:

1. **Primary labels never wrap.** "SVT" is 3 characters, always one line. The full name might be too long for the sidebar, but it truncates with `…` instead of wrapping. So every sidebar row has the same height regardless of name length.
2. **Matches how clinicians think.** Doctors scan for "SVT" and "AF" not "Supraventricular Tachycardia." The abbreviation is the natural primary label.
3. **Discoverability for non-experts.** The full name is still there as a subtitle for anyone who doesn't know the abbreviation yet.

### When the "abbr" isn't really an abbreviation

For Fundamentals, the topics aren't medical abbreviations. They're just topics:

```jsx
{
  path: 'electrophysiology',
  abbr: 'Electrophysiology',
  full: { en: 'Cardiac Electrophysiology', zh: '心臟電生理學' },
},
```

The "abbr" field holds the **shortest meaningful primary label**, even if it's not a true abbreviation. Pattern stays the same — short primary label on top, longer descriptive label below. Don't try to invent abbreviations like "EP" or "OVW" if they wouldn't be recognized.

### Active state on a colored background

When a sidebar row is active, the background turns blue (`.condition-link.active`). The default `__full` color (slate gray `#7a8896`) becomes unreadable on blue. The CSS handles this:

```css
.condition-link.active .condition-link__full {
  color: rgba(255, 255, 255, 0.82);
}
```

Translucent white — readable but still clearly secondary to the bold abbreviation. This is the kind of detail that's easy to miss until you actually look at the active state.

---

## Bilingual labels

The `abbr` field is **language-neutral** — it's the same string regardless of language ("SVT" works in both English and Chinese contexts). The `full` field is bilingual:

```jsx
{
  path: 'svt',
  abbr: 'SVT',
  full: { en: 'Supraventricular Tachycardia', zh: '上心室心搏過速' },
},
```

When rendering, the layout calls `c.full[lang]` to get the right language's text:

```jsx
<span className="condition-link__full">{c.full[lang]}</span>
```

The `lang` value comes from `useLanguage()`, which reads from the global `LanguageContext`. When the user toggles language in the navbar, every sidebar across the app updates because they all subscribe to the same context. See the language context implementation in [src/context/LanguageContext.jsx](../src/context/LanguageContext.jsx).

---

## How to add a new layout from scratch

If you ever need a new top-level section (e.g., "Pediatric Arrhythmias"), here's the recipe.

### Step 1: Create the layout file

Copy [TachyLayout.jsx](../src/pages/TachyLayout.jsx) as a template. Change three things:

1. **Function name** and default export: `PediatricLayout`.
2. **`conditions` array**: replace with your section's child topics, each with `path`, `abbr`, and `full: { en, zh }`.
3. **`<h2 className="sidebar-title">` text**: the section title in both languages.

That's the whole file. No new CSS, no new JSX patterns.

### Step 2: Register the routes in App.jsx

Add a layout route block to [App.jsx](../src/App.jsx):

```jsx
<Route path="/pediatric" element={<PediatricLayout />}>
  <Route index element={<Navigate to="firstchild" replace />} />
  <Route path="firstchild" element={<FirstChild />} />
  <Route path="secondchild" element={<SecondChild />} />
  {/* ... */}
</Route>
```

Don't forget to import the layout component and all child components at the top of App.jsx.

### Step 3: Add a link to the navbar

In [src/components/Navbar.jsx](../src/components/Navbar.jsx), add a `<NavLink>` for the new section:

```jsx
<NavLink to="/pediatric">
  {lang === 'en' ? 'Pediatric' : '兒科'}
</NavLink>
```

### Step 4: Make sure each child component uses `useLanguage()`

Each child route component (the leaf pages) must call `useLanguage()` to get the current language from context. They cannot rely on the layout passing `lang` as a prop, because nested routes don't pass props through `<Outlet />`. The layout and its children share state through React Context, not props.

Quick template for a leaf component:

```jsx
import { useLanguage } from '../context/LanguageContext'

export default function FirstChild() {
  const { lang } = useLanguage()
  // ... rest of the component
}
```

That's it. The shell, the sticky sidebar, the active highlighting, the index redirect, the bilingual labels, the language sync — all of it falls out of following the pattern.

---

## Design decisions baked in

A few choices that aren't obvious from reading the code:

### Sidebar width: 220px

Wide enough to fit the longest abbr label ("Electrophysiology" at ~17 characters) plus padding, narrow enough to leave the content column with adequate space. Originally 260px, dialed back when the abbr+full pattern made the sidebar shorter.

If you ever add an entry with a longer abbr label, either shorten the abbr or widen the sidebar. Don't let it wrap to two lines — that breaks the equal-row-height invariant.

### Sticky `top: 5rem`

Matches the navbar height. If you change the navbar's height, update this value to match — otherwise the sidebar will either tuck under the navbar (if too small) or float below it (if too large).

### Same Layout structure for all three sections

The three layout files (Tachy/Brady/Fundamentals) are nearly identical. There's no shared `<SidebarLayout>` component that they all import — each one defines its own JSX structure with its own data array.

This is **intentional**. Three layouts × ~50 lines each = 150 lines of code. Extracting a shared component would save maybe 60 lines but require:

- A `props` interface to pass the title, conditions array, and Chinese title
- Dealing with the slight differences (Fundamentals uses "topics" semantically vs "conditions")
- An extra layer of indirection when reading the code

For three callers, the duplication is cheaper than the abstraction. **If a fourth or fifth layout shows up**, that's the time to consider extracting a shared component. Not before.

### `conditions` vs `topics` array name

Tachy and Brady use `conditions` (because SND, AV Block, SVT, AF are clinical conditions). Fundamentals uses `topics` (because Cardiac Electrophysiology, ECG, Overview are educational topics, not conditions). Small naming difference, intentional honesty.

---

## Where it's used

- [src/App.jsx](../src/App.jsx) — all three layout routes registered
- [src/pages/TachyLayout.jsx](../src/pages/TachyLayout.jsx) — Tachyarrhythmias sidebar
- [src/pages/BradyLayout.jsx](../src/pages/BradyLayout.jsx) — Bradyarrhythmias sidebar
- [src/pages/FundamentalsLayout.jsx](../src/pages/FundamentalsLayout.jsx) — Fundamentals sidebar
- [src/index.css](../src/index.css) — `.sidebar-layout`, `.condition-sidebar`, `.condition-link*` rules
- [src/context/LanguageContext.jsx](../src/context/LanguageContext.jsx) — the shared `lang` state that all three sidebars subscribe to

---

## See also

- [drug-card-and-detail-grid.md](drug-card-and-detail-grid.md) — content patterns used inside the leaf components that the sidebar routes to
- [css-grid-and-react-fragments.md](css-grid-and-react-fragments.md) — deep dive on CSS Grid + React Fragments (relevant because `.sidebar-layout` is itself a Grid)
- [React Router docs on layout routes](https://reactrouter.com/en/main/start/concepts#layout-routes) — official reference for the `<Outlet />` pattern
