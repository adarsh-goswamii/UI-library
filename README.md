# @adarsh_goswami/brand

Single source of truth for Adarsh Goswami's personal brand — pre-themed Radix UI components, CSS design tokens, and a Tailwind v4 theme config.

Any project that installs this package gets the full AG design system out of the box. No token copy-pasting, no manual Radix theme setup, no brand configuration.

---

## Install

```bash
npm install @adarsh_goswami/brand
```

**Peer dependencies** — install these in your project if you haven't already:

```bash
npm install @radix-ui/themes react react-dom tailwindcss
```

---

## Setup

### 1. Import the CSS tokens

In your entry file (e.g. `main.tsx`):

```tsx
import '@radix-ui/themes/styles.css'
import '@adarsh_goswami/brand/dist/theme.css'
```

### 2. Add the Tailwind theme config

In your main CSS file (e.g. `index.css`):

```css
@import "tailwindcss";
@import "@adarsh_goswami/brand/dist/theme.css";
@import "@adarsh_goswami/brand/dist/tailwind.config.css";
```

### 3. Wrap your app with Radix Theme

```tsx
import { Theme } from '@radix-ui/themes'

export default function App() {
  return (
    <Theme appearance="dark">
      {/* your app */}
    </Theme>
  )
}
```

No `accentColor` or `grayColor` props needed — the brand theme is applied automatically via CSS.

---

## What's included

| Export | Description |
|---|---|
| `dist/theme.css` | All CSS custom property tokens — colors, typography, spacing, shadows, radius, z-index |
| `dist/tailwind.config.css` | Tailwind v4 `@theme` block — brand tokens as Tailwind utilities |
| `dist/assets/logo.svg` | Full wordmark |
| `dist/assets/logo-mark.svg` | Icon only (AG monogram) |
| `dist/assets/favicon.svg` | 32×32 favicon variant |

---

## Design tokens

All tokens are CSS custom properties available globally after importing `theme.css`.

### Colors

```css
/* Backgrounds */
var(--bg-base)       /* #0A0A0B — page background */
var(--bg-surface)    /* #111113 — card/panel */
var(--bg-raised)     /* #18181C — elevated surface */
var(--bg-overlay)    /* #1F1F25 — modals, popovers */
var(--bg-hover)      /* #1A1A1F */
var(--bg-active)     /* #212127 */

/* Text */
var(--text-primary)    /* #F0EEF8 */
var(--text-secondary)  /* #9997AA */
var(--text-muted)      /* #5C5A6E */
var(--text-disabled)   /* #3A3848 */

/* Accent — electric violet-indigo */
var(--accent)          /* #7C6EFA */
var(--accent-bright)   /* #9B8FFB */
var(--accent-dim)      /* #4A3FCC */
var(--accent-hover)    /* #8D80FB */
var(--accent-active)   /* #6B5CE8 */
var(--accent-glow)     /* rgba(124,110,250,0.15) */
var(--accent-subtle)   /* rgba(124,110,250,0.08) */

/* Borders */
var(--border-subtle)   /* #1E1E24 */
var(--border-soft)     /* #2A2A34 */
var(--border-mid)      /* #3A3A48 */
var(--border-hover)    /* #454558 */
var(--border-focus)    /* #7C6EFA */

/* Semantic */
var(--success)   /* #3DD68C */
var(--warning)   /* #F5A623 */
var(--error)     /* #F2546A */
var(--info)      /* #4AA8FF */
```

### Typography

```css
/* Font families */
var(--brand-font-display)  /* Syne */
var(--brand-font-body)     /* DM Sans */
var(--brand-font-mono)     /* DM Mono */

/* Type scale */
var(--brand-text-xs)    /* 11px */
var(--brand-text-sm)    /* 13px */
var(--brand-text-base)  /* 15px */
var(--brand-text-md)    /* 17px */
var(--brand-text-lg)    /* 20px */
var(--brand-text-xl)    /* 24px */
var(--brand-text-2xl)   /* 32px */
var(--brand-text-3xl)   /* 44px */
var(--brand-text-4xl)   /* 60px */
var(--brand-text-5xl)   /* 80px */
```

**Required Google Fonts** — add to your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
```

### Tailwind utilities

After adding `tailwind.config.css`, all brand tokens are available as Tailwind classes:

```html
<!-- Colors -->
<div class="bg-bg-surface text-text-primary border border-border-soft">
<span class="text-accent">Accent text</span>

<!-- Typography -->
<h1 class="font-display text-3xl tracking-tight leading-tight">
<p class="font-body text-base leading-normal">

<!-- Radius -->
<div class="rounded-md">   <!-- 8px -->
<div class="rounded-lg">   <!-- 12px -->
<div class="rounded-full"> <!-- 9999px -->

<!-- Shadows -->
<div class="shadow-md">
<div class="shadow-accent">
```

---

## SVG assets

Import brand assets as URLs:

```tsx
import logoUrl from '@adarsh_goswami/brand/dist/assets/logo.svg'
import logoMarkUrl from '@adarsh_goswami/brand/dist/assets/logo-mark.svg'
import faviconUrl from '@adarsh_goswami/brand/dist/assets/favicon.svg'

<img src={logoUrl} alt="Adarsh Goswami" />
```

For Vite projects, add the type declaration if needed:

```ts
// vite-env.d.ts or global.d.ts
declare module '*.svg' {
  const url: string
  export default url
}
```

---

## Local development (npm link)

When working on this package and a consuming project simultaneously:

```bash
# In this repo
npm link

# In the consuming project
npm link @adarsh_goswami/brand
```

Changes are reflected instantly — no publish cycle needed.

When done:

```bash
# In consuming project
npm unlink @adarsh_goswami/brand

# In this repo
npm unlink
```

---

## Versioning

| Change | Bump |
|---|---|
| Token value tweak (color shade, spacing value) | `patch` |
| New component, asset, or token added | `minor` |
| Token renamed, removed, or breaking component API change | `major` |

CI/CD auto-publishes on every push:
- `develop` → `@adarsh_goswami/brand@x.x.x-dev` (npm tag `dev`)
- `main` → `@adarsh_goswami/brand@x.x.x` (npm tag `latest`)

To install the prerelease build:

```bash
npm install @adarsh_goswami/brand@dev
```
