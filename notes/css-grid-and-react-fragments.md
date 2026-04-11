# CSS Grid + React Fragments: when and why

A reference for a recurring pattern in this codebase: how the `.detail-grid` works, why some optional rows need `<>...</>` fragments, and why some don't.

The concrete example throughout this doc is the conduction-system card in [src/pages/CardiacElectro.jsx](../src/pages/CardiacElectro.jsx), but the same rule applies anywhere you mix CSS Grid (or Flexbox) with conditional content.

---

## The mental model: where the grid context starts and ends

A typical drug-card / detail-grid in this app has this DOM shape:

```
<div class="drug-card">                    ← block container
    <div class="drug-name">SA Node</div>   ← block child
    <dl class="detail-grid">               ← GRID CONTEXT STARTS HERE
        <dt>Role</dt>                      ← grid item (column 1)
        <dd>Primary pacemaker</dd>         ← grid item (column 2)
        <dt>Rate</dt>                      ← grid item (column 1)
        <dd>60–100 bpm</dd>                ← grid item (column 2)
    </dl>                                  ← GRID CONTEXT ENDS HERE
    <p>Located in the right atrium…</p>    ← block child (back to normal flow)
</div>
```

The crucial fact: **CSS Grid only applies to direct children of the grid container.**

When you write `display: grid` on `.detail-grid`, the only elements that become "grid items" are the elements that are *immediate* children of that `<dl>`. Anything nested inside one of those children is NOT a grid item — it's just regular content of whatever wraps it.

So in this tree:

- The four `<dt>`/`<dd>` elements **are** grid items (direct children of `<dl>`).
- The `<p>` after `</dl>` is **not** a grid item (it's a child of `.drug-card`, not `.dl`).

That distinction — *inside `<dl>` = grid universe, outside `<dl>` = block universe* — is the whole rule. Everything else follows from it.

---

## Why conditional dt/dd inside the dl need fragments

JSX has a hard rule: a conditional expression `{condition && (...)}` can return **one** element, not two.

If you write the obvious thing:

```jsx
{item.warning && (
  <dt>Warning</dt>
  <dd>{item.warning}</dd>
)}
```

The compiler rejects it. You need to wrap the two siblings in *something*. There are two options.

### Option A — wrapper div (broken)

```jsx
{item.warning && (
  <div>
    <dt>Warning</dt>
    <dd>{item.warning}</dd>
  </div>
)}
```

This compiles. But it breaks the grid. Here's what the DOM becomes:

```
<dl class="detail-grid">
    <dt>Role</dt>             ← grid item ✓
    <dd>Primary pacemaker</dd>← grid item ✓
    <div>                     ← grid item — the WHOLE div is one item, in column 1
        <dt>Warning</dt>      ← NOT a grid item, falls back to default <dt> styling
        <dd>...</dd>          ← NOT a grid item, falls back to default <dd> styling
    </div>
</dl>
```

The `<div>` becomes the grid item. It takes one column slot. Inside the div, the `<dt>` and `<dd>` are no longer in a grid context — they revert to default browser styling (essentially `<dt>` as a plain block with bold-ish text and `<dd>` as an indented block). The "Warning" row visually breaks the alignment of the rows above it.

### Option B — React fragment (correct)

```jsx
{item.warning && (
  <>
    <dt>Warning</dt>
    <dd>{item.warning}</dd>
  </>
)}
```

A fragment (`<>...</>`) is special: at render time, **it doesn't produce any DOM element at all**. It exists only in the JSX tree to satisfy "one return value." When React commits to the DOM, the fragment is unwrapped and its children become direct children of whatever element the fragment's parent was.

So the resulting DOM is:

```
<dl class="detail-grid">
    <dt>Role</dt>
    <dd>Primary pacemaker</dd>
    <dt>Warning</dt>          ← still a direct child of <dl> ✓
    <dd>{item.warning}</dd>   ← still a direct child of <dl> ✓
</dl>
```

Identical to having written the dt/dd unconditionally. The fragment exists in the source code but evaporates at render time. Grid sees four grid items, all aligned to its two columns.

### The rule for fragments

Use a fragment whenever you need to return multiple sibling elements from a conditional, *and* the parent context cares which elements are direct children. CSS Grid is the most common reason. Flexbox is another. Anywhere you have a layout that depends on direct-child relationships, fragments are the only safe way to insert conditional siblings.

---

## Why the description `<p>` doesn't need a fragment

The description paragraph isn't conditional in a way that returns multiple siblings — it's just one element:

```jsx
{item.description && <p>{item.description[lang]}</p>}
```

This is a conditional that returns a single `<p>` (or nothing). One element, no fragment needed. JSX is happy.

**More importantly**, the `<p>` lives **outside** the `<dl>`:

```jsx
<div className="drug-card">
  <div className="drug-name">{item.structure[lang]}</div>
  <dl className="detail-grid">
    <dt>Role</dt><dd>...</dd>
    {/* fragments only matter HERE, inside the <dl> */}
  </dl>
  {item.description && <p>{item.description[lang]}</p>}
  {/* ↑ this <p> is a sibling of the <dl>, child of .drug-card */}
</div>
```

The `<p>` is a child of `.drug-card`, not `.dl`. It never enters the grid context. It's just a normal block element living in normal block flow inside the card. CSS Grid doesn't care about it — Grid stops at `</dl>`.

So the `<p>` picks up:

- `.drug-card`'s padding (positions it inside the card)
- `.content p` styles (font-size, line-height, color from the global rules)
- Default block layout (sits on its own line, takes full width of its parent)

No fragment, no grid math, no special handling. It's just a `<p>` in the right place.

---

## What would happen if you tried to put the `<p>` inside the `<dl>`?

Two problems, one technical and one semantic.

**Technical**: the `<p>` would become a grid item. Without a `grid-column: 1 / -1` rule, it would land in the next available cell — column 1 of the next row, taking only the label column's width. It would render as a stub, not a full-width paragraph. You could fix it by adding `grid-column: 1 / -1` to a `.detail-grid > p` rule, but at that point you're inventing a new layout slot inside the grid for paragraph content. Cleaner to put the `<p>` outside.

**Semantic**: HTML's `<dl>` element is only allowed to contain `<dt>`, `<dd>`, `<script>`, `<template>`, and `<div>` (the last one was added in HTML5 to allow grouping). A `<p>` inside `<dl>` is invalid HTML. Browsers will tolerate it, but the validator complains and screen readers may handle it inconsistently. Putting the `<p>` after `</dl>` is correct on both counts.

---

## The rule, distilled

| Where the element sits | What you can use |
|---|---|
| Direct child of `<dl class="detail-grid">` | Only `<dt>` and `<dd>`. For conditional pairs, wrap in a fragment `<>...</>` so they stay direct children. |
| Anywhere else inside `.drug-card` | Anything. The block-flow universe. No fragments needed unless you have multiple-sibling conditionals. |
| Direct child of any flex/grid container | Same rule applies — use fragments to keep conditional siblings as direct children. |

The reason it works in our card: every dt/dd lives inside the `<dl>` (so grid math applies and fragments are mandatory for conditionals), and every paragraph or other block content lives outside the `<dl>` but inside `.drug-card` (so normal flow applies and fragments are unnecessary).

---

## A concrete contrast: three patterns in one card

Look at the conduction-system card and notice the three patterns side-by-side:

```jsx
<div className="drug-card">
  <div className="drug-name">{item.structure[lang]}</div>

  <dl className="detail-grid">
    {/* 1. Unconditional dt/dd — straight inline JSX, no wrapper, no fragment */}
    <dt>{lang === 'en' ? 'Role' : '角色'}</dt>
    <dd>{item.role[lang]}</dd>

    {/* 2. Conditional dt/dd inside the <dl> — needs a fragment because two
           siblings AND must remain direct children of the grid container */}
    {item.intrinsic_rate && (
      <>
        <dt>{lang === 'en' ? 'Rate' : '頻率'}</dt>
        <dd>{item.intrinsic_rate[lang]}</dd>
      </>
    )}
  </dl>

  {/* 3. Conditional single element outside the <dl> — bare conditional,
         no wrapper at all, because it's one element and not in grid context */}
  {item.description && <p>{item.description[lang]}</p>}
</div>
```

Three different patterns:

1. **Unconditional dt/dd** (Role) — straight inline JSX, no wrapper, no fragment.
2. **Conditional dt/dd inside the `<dl>`** (Rate) — wrapped in `<>...</>` because it's two siblings AND must remain direct children of the grid container.
3. **Conditional single element outside the `<dl>`** (description) — bare conditional, no wrapper at all, because it's one element and not in grid context.

That's the whole rule in one card. Once you internalize "fragments preserve direct-child relationships when JSX forces you to wrap siblings," you'll see when to use them everywhere — not just in this codebase.

---

## A diagnostic tip

If you ever convert a section to detail-grid and a row looks visually broken — labels not aligning to other rows, or the value column collapsing — open devtools, inspect the offending row, and check the parent.

If the parent is anything other than `<dl class="detail-grid">`, that's why grid isn't applying. Most often: someone wrapped a conditional in `<div>` or `<React.Fragment>` instead of `<>...</>`, and forgot grid only walks one level deep.

`React.Fragment` and `<>...</>` are identical — both produce no DOM. The shorthand `<>` is just the syntactic form. Use whichever you prefer; the behavior is the same.

---

## Where this pattern is used in the codebase

As of writing, the detail-grid + drug-card pattern lives in:

- [src/pages/SVT.jsx](../src/pages/SVT.jsx) — first-line drug (Adenosine), second-line drugs (CCBs, beta-blockers), pharmacotherapy agents, ECG characteristics (bare detail-grid, no card)
- [src/pages/CardiacElectro.jsx](../src/pages/CardiacElectro.jsx) — Vaughan-Williams classification (all 5 classes), conduction system structures, action potential phases
- [src/index.css](../src/index.css) — `.drug-card` and `.detail-grid` class definitions

When adding a new section that uses the same pattern, the rules above apply. The CSS is already in place — just structure your JSX to follow the three patterns above.
