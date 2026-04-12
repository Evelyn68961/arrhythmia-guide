# How Tab Links Navigate to the Correct Page

Using React Router's `<Link>` component to connect home page tabs to nested routes.

## Overview

The home page has clickable tab buttons (e.g., "Ventricular Tachycardia") that navigate directly to the correct subpage. This works by matching the `to` prop on each `<Link>` to a `<Route>` path defined in `App.jsx`.

## Step 1: Define Routes in App.jsx

Routes are defined as a nested structure in `App.jsx`:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/tachyarrhythmias" element={<TachyLayout />}>
      <Route index element={<Navigate to="svt" replace />} />
      <Route path="svt" element={<SVT />} />
      <Route path="af"  element={<AF />} />
      <Route path="vt"  element={<VT />} />
      <Route path="vf"  element={<VF />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### What Each Part Does

| Code | Purpose |
|------|---------|
| `path="/tachyarrhythmias"` | Parent route — matches the first part of the URL |
| `element={<TachyLayout />}` | Wrapper component (sidebar, shared UI) that renders for all child routes |
| `<Route index ...>` | Default child — redirects `/tachyarrhythmias` to `/tachyarrhythmias/svt` |
| `path="vt"` | Child route — combined with parent, matches `/tachyarrhythmias/vt` |
| `element={<VT />}` | The component to render when this route matches |

### Nested Route = Combined Path

Child routes inherit the parent's path:

```
Parent:  /tachyarrhythmias
Child:   vt
Full:    /tachyarrhythmias/vt
```

## Step 2: Define Tab Data with `to` Paths

In `Home.jsx`, each tab has a `to` property that matches a route path:

```jsx
const categories = [
  {
    title: { en: 'Tachyarrhythmias' },
    tabs: [
      { label: { en: 'Supraventricular Tachycardia' }, to: '/tachyarrhythmias/svt' },
      { label: { en: 'Atrial Fibrillation' },          to: '/tachyarrhythmias/af' },
      { label: { en: 'Ventricular Tachycardia' },      to: '/tachyarrhythmias/vt' },
      { label: { en: 'Ventricular Fibrillation' },     to: '/tachyarrhythmias/vf' },
    ]
  }
]
```

The `to` value must exactly match a route path defined in `App.jsx`.

## Step 3: Render with `<Link>`

```jsx
import { Link } from 'react-router-dom'

{tabs.map((tab) => (
  <Link key={tab.to} to={tab.to} className="home-tab">
    {tab.label[lang]}
  </Link>
))}
```

### `<Link>` vs `<a>`

| | `<a href="...">` | `<Link to="...">` |
|---|---|---|
| Navigation | Full page reload | Client-side (no reload) |
| Speed | Slow — re-downloads everything | Fast — only swaps the component |
| State | Lost — React app restarts | Preserved — app stays running |

`<Link>` renders an `<a>` tag in the HTML but intercepts the click to do client-side navigation instead.

## How It All Connects

```
Home.jsx tab data                     App.jsx routes
─────────────────                     ──────────────

to: '/tachyarrhythmias/vt'  ──────>  <Route path="/tachyarrhythmias">
                                       <Route path="vt" element={<VT />} />
                                     </Route>

User clicks tab
      |
      v
<Link to="/tachyarrhythmias/vt">
      |
      v
React Router matches URL to route
      |
      v
Renders <TachyLayout> with <VT /> inside
```

## The Layout Component

The parent route's `element` (e.g., `<TachyLayout />`) wraps all child routes. It uses `<Outlet />` to render whichever child route matches:

```jsx
import { Outlet } from 'react-router-dom'

function TachyLayout() {
  return (
    <div className="layout">
      <Sidebar />       {/* shared across all tachyarrhythmia pages */}
      <Outlet />         {/* <SVT />, <AF />, <VT />, or <VF /> goes here */}
    </div>
  )
}
```

`<Outlet />` is a placeholder that React Router fills with the matched child route's component.

## Adding a New Page

To add a new linked tab, you need two things:

1. **Add the route** in `App.jsx`:
   ```jsx
   <Route path="/tachyarrhythmias" element={<TachyLayout />}>
     ...existing routes...
     <Route path="aflutter" element={<AFlutter />} />   {/* new */}
   </Route>
   ```

2. **Add the tab** in `Home.jsx`:
   ```jsx
   tabs: [
     ...existing tabs...
     { label: { en: 'Atrial Flutter' }, to: '/tachyarrhythmias/aflutter' }  // new
   ]
   ```

The `to` path and the `Route path` must match — that's the only connection between them.

## Key Concepts

| Concept | What it does |
|---------|-------------|
| `<Route path="...">` | Declares a URL pattern and which component to render |
| `<Link to="...">` | Navigates to a route without full page reload |
| Nested routes | Child paths combine with parent paths (`/parent/child`) |
| `<Outlet />` | Placeholder in layout where child route components render |
| `index` route | Default child route when only the parent path is visited |
| `<Navigate to="..." replace />` | Redirects to another route (used for defaults) |
