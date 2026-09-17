# Occupify Design System (Professional Trust, Minimal Voltage)

Project: LinkedIn-Inspired Platform 
Name: Occupify 
Brand Color: #0A66C2  
Style Direction: Modern Minimal — warm beige canvas, high-contrast blue voltage, flat elevation

---

## 1) Design Principles

- **Trust first**: Every visual decision should reinforce credibility and professionalism. The UI never competes with the content.
- **Restrained voltage**: One brand color (#0A66C2) carries all primary actions, links, and brand marks — nothing else borrows this voltage.
- **Warm, not cold**: The canvas is warm beige (#F4F2EE), not gray — subtle but intentional. This differentiates the platform from generic enterprise UIs.
- **Density-conscious**: Comfortable density by default. Enough breathing room that users can read long posts without fatigue.
- **Accessible and inclusive**: Minimum 4.5:1 contrast on all body text. All interactive states must have visible focus indicators.
- **Motion with restraint**: Transitions are feedback signals only — 150ms fast, 250ms standard. Never decorative.

---

## 2) Color System

### Usage Ratio

- Neutrals (beige, white, black alphas): 80–90%
- Brand blue: 8–15%
- Semantic & tertiary (gold, green, red): 5% or less

### Core Palette

| Role | Token | Hex / Value | Usage |
|------|-------|-------------|-------|
| Brand Primary | `--color-primary-500` | `#0A66C2` | CTAs, links, wordmark, active nav |
| Brand Hover | `--color-primary-600` | `#084FA0` | Hover/pressed on primary elements |
| Brand Soft | `--color-primary-50` | `#EAF1FA` | Search bar background, chip hover tint |
| Canvas | `--bg-base` | `#F4F2EE` | App background (warm beige) |
| Subtle Surface | `--bg-subtle` | `#FAFAF8` | Sidebar, light section backgrounds |
| Elevated Surface | `--bg-elevated` | `#FFFFFF` | Cards, modals, dropdown panels |
| Text Primary | `--text-primary` | `rgba(0,0,0,0.90)` | Main content, headings |
| Text Secondary | `--text-secondary` | `rgba(0,0,0,0.60)` | Metadata, job titles, timestamps |
| Text Tertiary | `--text-tertiary` | `rgba(0,0,0,0.45)` | Captions, degree badges |
| Text Link | `--text-link` | `#0A66C2` | Inline anchor text |
| Text Disabled | `--text-disabled` | `rgba(0,0,0,0.30)` | Inactive states |
| Text on Brand | `--text-on-primary` | `#FFFFFF` | Text on blue surfaces |
| Border Default | `--border-default` | `rgba(0,0,0,0.08)` | Card separators, dividers |
| Border Subtle | `--border-subtle` | `rgba(0,0,0,0.04)` | Low-emphasis separators |
| Border Strong | `--border-strong` | `rgba(0,0,0,0.15)` | Input borders, modals |
| Border Focus | `--border-focus` | `#0A66C2` | Keyboard focus ring |
| Overlay | `--bg-overlay` | `rgba(0,0,0,0.55)` | Modal scrim backdrop |

### Full Primary Scale

| Token | Hex |
|-------|-----|
| `--color-primary-50` | `#EAF1FA` |
| `--color-primary-100` | `#C7D9EE` |
| `--color-primary-200` | `#94B4DE` |
| `--color-primary-300` | `#6190CE` |
| `--color-primary-400` | `#3675BD` |
| `--color-primary-500` | `#0A66C2` |
| `--color-primary-600` | `#084FA0` |
| `--color-primary-700` | `#06407F` |
| `--color-primary-800` | `#04305E` |
| `--color-primary-900` | `#021F3D` |

### Tertiary Identity Colors

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Premium Gold | `--color-secondary-500` | `#B07F00` | Premium badge, LinkedIn Gold UI |
| Open To Work | `--color-tertiary-500` | `#44712E` | "Open to Work" badge background |

### Semantic Colors

| Role | BG Token | BG Value | FG Token | FG Value |
|------|----------|----------|----------|----------|
| Success | `--color-success-bg` | `#E5F6E8` | `--color-success-fg` | `#057642` |
| Warning | `--color-warning-bg` | `#FFF4D6` | `--color-warning-fg` | `#915907` |
| Error | `--color-error-bg` | `#FBE2E2` | `--color-error-fg` | `#C03A2B` |
| Info | `--color-info-bg` | `#EAF1FA` | `--color-info-fg` | `#0A66C2` |

Semantic colors are for feedback states only. Do not use them as decorative accents in page layouts.

### Dark Mode Overrides

```css
[data-theme="dark"] {
  --bg-base:       #1B1F23;
  --bg-subtle:     #242A30;
  --bg-elevated:   #2C3338;
  --text-primary:  rgba(255,255,255,0.90);
  --text-secondary:rgba(255,255,255,0.65);
  --border-default:rgba(255,255,255,0.10);
}
```

---

## 3) Typography

### Font Pairing

- **Primary (Latin/UI)**: Source Sans 3 / Source Sans Pro — Adobe open license, used natively by LinkedIn
- **Fallback stack**: `'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- **CJK (Vietnamese / Korean / Japanese)**: Noto Sans or Pretendard for extended character coverage

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap');
```

### Type Scale

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|-------|------|-------------|--------|----------------|-------|
| `--text-display` | 32px | 1.20 | 700 | −0.02em |  H1 |
| `--text-h1` | 24px | 1.25 | 600 | −0.015em | Profile name, page titles |
| `--text-h2` | 20px | 1.30 | 600 | −0.01em | Section headings, card titles |
| `--text-h3` | 14px | 1.30 | 600 | −0.005em | Post author name, item headings |
| `--text-body-lg` | 16px | 1.55 | 400 | 0 | Intro paragraphs, profile summaries |
| `--text-body` | 14px | 1.50 | 400 | 0 | Feed posts, descriptions |
| `--text-body-sm` | 12px | 1.40 | 500 | 0 | Timestamps, metadata, subtitles |
| `--text-caption` | 11px | 1.40 | 600 | 0 | Degree badges, tiny labels |

### Font Assignment Rules

- Source Sans 3 is used for all text tiers — LinkedIn does not separate a heading family from a body family.
- Weight carries hierarchy: 700 for display, 600 for headings and CTAs, 400 for body copy.
- Never use decorative or serif fonts on professional content surfaces.

---

## 4) Spacing System

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon gap, tight inline spacing |
| `--space-sm` | 8px | Component inner padding, avatar gap |
| `--space-md` | 12px | Card inner padding (tight), nav item padding |
| `--space-lg` | 16px | Card default padding, section gap |
| `--space-xl` | 24px | Between major sections |
| `--space-2xl` | 40px | Page section gaps |
| `--space-3xl` | 56px | Large layout separators |

### Layout Grid

| Context | Max-width |
|---------|-----------|
| Mobile feed | 480px |
| Desktop feed column | 552px |
| 3-column desktop layout | 1128px |

---

## 5) Border Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0 | Flush table rows, dividers |
| `--radius-sm` | 4px | Inputs, search bar, small badges |
| `--radius-md` | 8px | Cards (LinkedIn signature radius) |
| `--radius-lg` | 12px | Large panels, modals |
| `--radius-xl` | 16px | Floating sheets, premium panels |
| `--radius-full` | 9999px | Avatars, all buttons, pill chips |

**Note**: All button shapes are pill (9999px). This is a core LinkedIn identity marker — never use square buttons.

---

## 6) Shadow / Elevation System

LinkedIn uses flat, minimal elevation. Depth is communicated primarily through `1px` border shadows rather than heavy drop shadows.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | `none` | Flat surfaces, canvas background |
| `--shadow-sm` | `0 0 0 1px rgba(0,0,0,0.08)` | Cards, nav bar — 1px border substitute |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Dropdowns, hover states, tooltips |
| `--shadow-lg` | `0 12px 28px rgba(0,0,0,0.14)` | Modals, sheets, popovers |
| `--shadow-focus` | `0 0 0 1px var(--border-focus)` | Keyboard focus ring on inputs |

---

## 7) Motion & Interaction

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Hover background, color switches |
| `--duration-base` | 250ms | Slide-in, expand, collapse |
| `--duration-slow` | 400ms | Full modal entrance, page transitions |

### Easing

```css
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Interaction Patterns

- **Hover state**: Background shifts to `--bg-base` or `--color-primary-50`. No transform lifts on cards.
- **Button press**: `opacity: 0.85` + instant (no delay).
- **Focus ring**: `box-shadow: 0 0 0 1px #0A66C2` — visually matches border treatment.
- **Transition default**: `transition: background 150ms ease, color 150ms ease, box-shadow 150ms ease`

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
  }
}
```

---

## 8) Iconography

- **Style**: Outline (Regular weight) as default; Filled variant for active/selected states
- **Stroke width**: 1.75px
- **Corner treatment**: Round caps and joins
- **Size grid**: 16px, 20px, 24px — never freeform sizes
- **Recommended library**: Phosphor Icons (closest public match to LinkedIn's icon language)
- **Color**: Inherits `--text-secondary` at rest; shifts to `--text-primary` on active/hover

---

## 9) Component-Level Rules

### Buttons

```css
.btn {
  font: 600 14px/1 'Source Sans 3', sans-serif;
  letter-spacing: -0.005em;
  border-radius: 9999px;
  padding: 9px 18px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 150ms ease;
  cursor: pointer;
}

/* Primary — blue fill */
.btn-primary {
  background: var(--color-primary-500);
  color: #fff;
}
.btn-primary:hover { background: var(--color-primary-600); }

/* Secondary — blue outline */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}
.btn-secondary:hover { background: var(--color-primary-50); }

/* Tertiary — dark outline (e.g. "More" actions) */
.btn-tertiary {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--text-primary);
}

/* Text only — low emphasis */
.btn-text {
  background: transparent;
  color: var(--text-secondary);
  padding: 9px 12px;
  border: none;
}

/* Connect — compact variant */
.btn-connect {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  padding: 6px 14px;
  font-size: 13px;
}
```

### Cards

All cards share the same base rules:

- Background: `--bg-elevated` (`#FFFFFF`)
- Border radius: `--radius-md` (8px)
- Shadow: `--shadow-sm`
- Inner padding: 14–16px

```css
/* Post card */
.post-card {
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 8px;
}

/* Profile sidebar card */
.profile-card {
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.profile-card .cover {
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary-300), var(--color-primary-700));
}

.profile-card .avatar {
  width: 64px;
  height: 64px;
  border: 3px solid #fff;
  border-radius: 9999px;
  margin-top: -32px;
}
```

### Inputs

```css
/* Standard text input */
.input {
  background: #fff;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  padding: 9px 12px;
  font: 500 14px/1.4 'Source Sans 3', sans-serif;
  color: var(--text-primary);
  width: 100%;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: var(--shadow-focus);
}

.input::placeholder { color: var(--text-tertiary); }

/* Search input — tinted background */
.input-search {
  background: var(--color-primary-50);
  border: none;
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font: 500 13px/1.4 inherit;
  color: var(--text-primary);
}
```

### Navigation Bar

```css
.navbar {
  background: #fff;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar .logo {
  width: 34px;
  height: 34px;
  background: var(--color-primary-500);
  border-radius: var(--radius-sm);
  color: #fff;
  display: grid;
  place-items: center;
  font: 900 18px/1 inherit;
}

.navbar .nav-item {
  padding: 6px 12px;
  font: 600 12px/1.3 'Source Sans 3', sans-serif;
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border-radius: var(--radius-sm);
}

.navbar .nav-item.active {
  color: var(--text-primary);
  border-bottom: 2px solid var(--text-primary);
}

.navbar .nav-item:hover { background: var(--bg-base); }
```

### Badges & Tags

```css
.badge {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font: 600 11px/1.5 'Source Sans 3', sans-serif;
  display: inline-block;
}

/* Connection degree (1st, 2nd, 3rd) */
.badge-degree    { background: transparent; color: var(--text-tertiary); }

/* LinkedIn Premium */
.badge-premium   { background: var(--color-warning-bg); color: var(--color-warning-fg); }

/* Open To Work */
.badge-opentowork { background: var(--color-tertiary-500); color: #fff; }

/* Hiring */
.badge-hiring    { background: var(--color-success-bg); color: var(--color-success-fg); }
```

### Alerts

```css
.alert {
  padding: 12px 14px;
  border-radius: var(--radius-md);
  font: 400 14px/1.5 'Source Sans 3', sans-serif;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.alert-success { background: var(--color-success-bg); color: var(--color-success-fg); }
.alert-warning { background: var(--color-warning-bg); color: var(--color-warning-fg); }
.alert-error   { background: var(--color-error-bg);   color: var(--color-error-fg);   }
.alert-info    { background: var(--color-info-bg);    color: var(--color-info-fg);    }
```

### Avatar

```css
.avatar {
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid var(--bg-elevated);
}

/* Size variants */
.avatar-sm  { width: 32px; height: 32px; }
.avatar-md  { width: 48px; height: 48px; }   /* Post author */
.avatar-lg  { width: 64px; height: 64px; }   /* Profile card */
.avatar-xl  { width: 96px; height: 96px; }   /* Profile page */
```

---

## 10) Anti-Patterns

1. **Do not use gray canvas (#F0F2F5)** — that is Facebook's palette. LinkedIn's canvas is warm beige `#F4F2EE`.
2. **Never use square buttons** — pill shape (9999px) is a core LinkedIn identity marker; square CTAs break brand recognition.
3. **Do not use Premium Gold as body text or decorative accents** — gold is reserved exclusively for Premium badge UI.
4. **Do not use high-saturation cyan or teal** — they conflict with the trust tone and introduce false brand signals.
5. **Do not exceed 8px card border radius** — `--radius-md` (8px) is the signature; 12px+ reads as a different product category.
6. **Do not stack multiple semantic colors in one viewport area** — one semantic state per section maximum.
7. **Do not use brand blue as a background fill** — only for inline elements, text, and CTAs. Never paint sections blue.
8. **Do not rely on color alone to communicate state** — always pair color with icon or text label.

---

## 11) CSS Variable Quick Reference

```css
:root {
  /* Brand */
  --color-primary-50:  #EAF1FA;
  --color-primary-500: #0A66C2;
  --color-primary-600: #084FA0;

  /* Surfaces */
  --bg-base:     #F4F2EE;
  --bg-subtle:   #FAFAF8;
  --bg-elevated: #FFFFFF;
  --bg-overlay:  rgba(0,0,0,0.55);

  /* Text */
  --text-primary:    rgba(0,0,0,0.90);
  --text-secondary:  rgba(0,0,0,0.60);
  --text-tertiary:   rgba(0,0,0,0.45);
  --text-link:       #0A66C2;
  --text-on-primary: #FFFFFF;
  --text-disabled:   rgba(0,0,0,0.30);

  /* Borders */
  --border-default: rgba(0,0,0,0.08);
  --border-strong:  rgba(0,0,0,0.15);
  --border-focus:   #0A66C2;

  /* Shadows */
  --shadow-sm: 0 0 0 1px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 28px rgba(0,0,0,0.14);

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* Spacing */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  12px;
  --space-lg:  16px;
  --space-xl:  24px;
  --space-2xl: 40px;
  --space-3xl: 56px;

  /* Motion */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 12) Quick Implementation Notes

- This file documents the **inspired-by** system for a LinkedIn-adjacent product. Adapt brand colors and identity elements as needed for your project.
- The canonical source for actual LinkedIn brand guidelines is [brand.linkedin.com](https://brand.linkedin.com/).
- If a page-specific override exists in `design-system/linkedin/pages`, it takes precedence over this master file.
- Otherwise, this file is the source of truth for all LinkedIn-inspired UI decisions.
