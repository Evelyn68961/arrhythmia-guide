# First-letter emphasis: styling a single character of a label

A lightweight pattern for highlighting the first character of a text label without duplicating it. Used when you want a mnemonic letter, a drop-cap-style accent, or any "one character stands out from the rest" effect.

The concrete example in this codebase is the CARE subtabs in AF management (`Comorbidities` / `Anticoagulation` / `Rate & Rhythm` / `Evaluation`). The first letter of each label spells out the C-A-R-E mnemonic, and this pattern makes those letters visually pop without having to prefix them separately.

---

## The problem this solves

The original JSX tried to show the mnemonic by prefixing each subtab label:

```jsx
{subtab.key}: {subtab.label[lang]}
```

Which rendered:

```
C: Comorbidities
A: Anticoagulation
R: Rate & Rhythm
E: Evaluation
```

Two problems:

1. **The mnemonic letter appears twice** — once as the `C:` prefix, once as the first letter of `Comorbidities`. Visual duplication, ugly.
2. **It doesn't scale to bilingual** — in Chinese, the label `共病管理` doesn't start with "C", so "C: 共病管理" mixes alphabets for no reason.

The fix: style the first character of the label directly, and drop the separate prefix.

---

## The JSX technique

Wrap the first character in a `<span>` and render the rest as plain text:

```jsx
<button>
  <span className="care-letter">{subtab.label[lang].charAt(0)}</span>
  {subtab.label[lang].slice(1)}
</button>
```

Two string operations doing the work:

- **`charAt(0)`** returns the first character of the string. `"Comorbidities".charAt(0)` → `"C"`. Wrapping it in a `<span>` gives CSS a selector to target just that character.
- **`slice(1)`** returns everything from index 1 onward. `"Comorbidities".slice(1)` → `"omorbidities"`. This is the rest of the label, rendered as plain text outside the span.

Together, the DOM becomes `<span>C</span>omorbidities`. The browser renders it as one continuous word — the human eye sees "Comorbidities" — but CSS can style the span independently.

### Works for any language

For English, the first character is a Latin letter:

```
label = "Comorbidities"
→ <span>C</span>omorbidities
→ renders as "Comorbidities" with styled C
```

For Chinese, the first character is a Chinese character:

```
label = "共病管理"
→ <span>共</span>病管理
→ renders as "共病管理" with styled 共
```

No special-case logic needed. `charAt(0)` and `slice(1)` work on any string, and CSS doesn't care what character is inside the span.

The **semantic meaning** differs between languages — the English version spells out a mnemonic (CARE), while the Chinese version just emphasizes the first character without forming an acronym — but the visual treatment is consistent, which is the best you can do when acronyms don't translate.

---

## The CSS technique

```css
.care-subtabs button .care-letter {
  font-size: 1.15em;
  font-weight: 800;
  color: #1f4e79;
  margin-right: 0.04em;
}
```

Four properties doing the work, plus one gotcha (covered below).

### `font-size: 1.15em` — the `em` vs `rem` choice

**Always use `em` for relative typography inside a span like this**, not `rem`.

- `1rem` = root font size (usually 16px regardless of context).
- `1em` = this element's parent font size.

The button itself has `font-size: 0.85rem`. Using `1.15em` on the `.care-letter` means "15% bigger than the button's text size" → `0.85rem × 1.15 ≈ 0.98rem`. The letter scales **with** the button.

If you later change the button to `font-size: 0.9rem` (or add a size variant), the letter automatically scales too. You don't have to hunt down the `.care-letter` rule and update it.

If you'd written `1.15rem`, the letter would be locked to `18.4px` regardless of button size — bigger than the surrounding text by a disproportionate amount at smaller button sizes.

**Rule of thumb**: when styling a child to be relative to its parent's size, use `em`. When setting a fixed size anchored to the root, use `rem`. For drop-cap-style effects, always `em`.

### `font-weight: 800`

The letter needs to be noticeably heavier than the surrounding text. The button itself has `font-weight: 500`. Jumping to 800 (extra-bold) creates enough weight contrast that the letter reads as accented even when the size difference is only 15%.

### `color: #1f4e79`

The accent color. Any color that contrasts with the surrounding text works. In this codebase the letter uses a dark blue that sits between the light accent blue (`#3498db`) and the dark navy (`#2c3e50`) — distinctive without clashing.

### `margin-right: 0.04em`

A tiny visual gap between the letter and the rest of the word, scaled to the current font size. Without this, the `C` and `omorbidities` touch each other and look slightly crowded because of the weight contrast.

**Note this is also `em`, not `px` or `rem`** — same reasoning: the gap scales with the letter's size.

---

## The conflicting-background-state gotcha

Any time you give an element a static color, check if any **parent state change** might introduce a background that conflicts.

The button has two states where its background becomes `#3498db` (the same blue family as the letter):

```css
.care-subtabs button:hover     { background: #3498db; color: white; }
.care-subtabs button.active    { background: #3498db; color: white; }
```

Without an override, the letter would stay dark blue on a blue background — partially invisible on hover and active states. Fix:

```css
.care-subtabs button.active .care-letter,
.care-subtabs button:hover .care-letter {
  color: white;
}
```

Both states flip the letter to white, matching the rest of the button's text.

**General CSS rule to remember**: whenever you add a decorative color to a child element, think through every parent state (`:hover`, `:focus`, `:active`, `.active`, `:disabled`, `[aria-selected]`, etc.) and check if any of them introduce a background color that collides. If so, add an override for each.

This is five seconds of forethought that saves hours of "why is my button partially broken" debugging.

---

## Why span-wrapping instead of CSS `::first-letter`?

CSS has a native pseudo-element for styling the first letter:

```css
.care-subtabs button::first-letter {
  font-size: 1.15em;
  /* ... */
}
```

No JSX change needed, and it looks cleaner on paper. But `::first-letter` has several quirks that make it unreliable for this use case:

1. **Definition of "letter" is fuzzy.** Punctuation and whitespace before the first actual letter can be tricky. If a label starts with a space or a symbol, `::first-letter` might include it or skip it, and browsers sometimes disagree.

2. **Limited property support.** `::first-letter` only accepts a subset of CSS properties (font, color, background, margin, padding, border, text-transform, line-height, and a few others). You can't use every property you'd want. For simple effects it's fine; for anything fancier it breaks.

3. **No access from React.** You can't add classes or interactive behavior to a `::first-letter` pseudo-element from JavaScript. With a span, you could later add a click handler, a tooltip, an animation — anything interactive. The pseudo-element is render-only.

4. **Fragile with mixed content.** If the label ever contains an emoji or special character at position 0, `::first-letter` behavior across browsers is inconsistent. `charAt(0)` is deterministic.

For the arrhythmia guide's use case, span-wrapping is the right call — it costs one extra `<span>` in the DOM per button (~4 spans total) and buys deterministic cross-browser behavior plus future flexibility.

**When `::first-letter` is fine**: classic drop-cap effects in long prose paragraphs, where the content is stable text and the styling is purely decorative (no JS interaction). For anything else, prefer the span.

---

## When to use this pattern

**Good fits:**

- Mnemonics (CARE, SOAP, FAST, ABCDE) where the first letters spell a memorable acronym.
- Drop-cap accents at the start of a section heading, paragraph, or card.
- Visual indexing where the first character groups similar items (e.g., a glossary where "A" items share a styled "A").
- Any case where you want one character to visually stand out from the rest of a word.

**Skip when:**

- You want to style the first *word*, not the first character. (Use a different span structure for that — `label.split(' ')[0]` etc.)
- The "first character" depends on locale or script direction in ways that are hard to predict (right-to-left languages, combining characters, ligatures). For those cases, the content author should mark the intended character explicitly rather than rely on `charAt(0)`.
- The decoration is purely cosmetic and doesn't need state handling — bold + the existing font-weight difference may be enough without a span.

---

## Where this pattern is used

As of writing:

- [src/pages/AF.jsx](../src/pages/AF.jsx) — CARE subtabs in the Management tab (C-A-R-E mnemonic for Comorbidities, Anticoagulation, Rate & Rhythm, Evaluation)
- [src/index.css](../src/index.css) — `.care-subtabs button .care-letter` class and its active/hover overrides

If you ever add another mnemonic section (e.g., R-R-P-Q-I for Rate, Rhythm, P waves, QRS width, Intervals — which could be an expansion target in the ECG Interpretation tab), the same pattern applies with a different class name.

---

## See also

- [drug-card-and-detail-grid.md](drug-card-and-detail-grid.md) — another reusable content pattern used across the codebase
- [sidebar-and-nested-routes.md](sidebar-and-nested-routes.md) — the layout and routing pattern the sidebar uses
- [css-grid-and-react-fragments.md](css-grid-and-react-fragments.md) — deep dive on CSS Grid + conditional JSX
