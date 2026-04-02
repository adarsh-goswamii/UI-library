# CLAUDE.md — @adarsh/brand

> This file is read automatically by Claude Code at the start of every session.
> Do not delete or move it. Update it whenever the project plan changes.
> Last updated: 2026-04-03 | Notion PRD: https://www.notion.so/334fe360e2d481e3b179f9f6633603f6 | Notion ADRs: https://www.notion.so/334fe360e2d4815fa1e0f3953338b177

---

## What is this project?

`@adarsh/brand` is a standalone npm package and the single source of truth for Adarsh Goswami's personal brand. It ships pre-themed Radix UI components with the AG brand applied — consuming apps install it, import components, and get fully branded UI out of the box. No Radix setup, no theme configuration, no copy-pasting tokens.

**North star: consuming apps assemble UIs, this package makes all design decisions.**

---

## What this package ships

- **Pre-themed Radix UI components** — curated subset, branded and ready to use
- **`dist/theme.css`** — all design tokens as CSS custom properties under `:root`, scoped to Radix UI Themes variable names
- **`dist/tailwind.preset.js`** — Tailwind CSS preset exposing brand tokens as utilities (extends Tailwind defaults)
- **`dist/assets/logo.svg`** — full wordmark
- **`dist/assets/logo-mark.svg`** — icon only
- **`dist/assets/favicon.svg`** — favicon variant
- Published to npm as `@adarsh/brand` (public)

---

## What is NOT in scope (v1)

- Custom React components built from scratch — use Radix primitives, themed via this package
- Storybook or component documentation site
- Design system landing page
- Dark/light mode switching — dark-first only
- Support for Vue, Angular, or any non-React framework
- Any consumer app code

---

## How it is consumed

### Install
```bash
npm install @adarsh/brand
```

### Setup in a React + Vite project
```tsx
// main.tsx
import '@adarsh/brand/dist/theme.css'
```

```js
// tailwind.config.js
const brandPreset = require('@adarsh/brand/dist/tailwind.preset')
module.exports = { presets: [brandPreset] }
```

```tsx
// App.tsx
import { Button, Card } from '@adarsh/brand'

export default function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

### Local development (npm link)
```bash
# In adarsh-brand/
npm link

# In the consuming project
npm link @adarsh/brand
```
Changes to the local package are instantly reflected — no publish cycle needed during development.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Component foundation | Radix UI (`@radix-ui/themes`) | Intentionally unstyled — handles only behaviour and a11y; brand theme applies cleanly |
| Language | TypeScript | Type-safe component APIs for consuming projects |
| CSS utilities | Tailwind CSS | Utility-first; brand tokens exposed as Tailwind utilities via preset |
| CSS tokens | Plain CSS custom properties | Zero runtime, zero dependency; `theme.css` is pure CSS |
| Build tool | tsup | Simple, zero-config bundler for component libraries; outputs CJS + ESM |
| Package manager | Bun | Fast installs, built-in TypeScript support |
| Package format | CommonJS + ESM | Dual exports via `package.json` exports map |
| Registry | npm (public) | Simple for v1 |
| Node requirement | ≥18 | — |

---

## Architecture decisions

Brief reference table — see Notion ADRs for full reasoning.

| # | Decision | Chosen | Rejected | Key reason |
|---|---|---|---|---|
| ADR-001 | Package structure | Standalone npm package (separate repo) | Monorepo with Turborepo | Clean independent git history per project; no tooling overhead for a solo developer |
| ADR-002 | npm dist-tags | Deferred — semver only for now | `dev`/`latest` channels, separate `@adarsh/brand-dev` package | Not enough active consumers to justify overhead; revisit at 4–5 projects |
| ADR-003 | Component strategy | Pre-themed Radix UI components | Custom React components from scratch | Owning accessibility and interaction for every component is an ongoing maintenance burden |
| ADR-004 | Component library | Radix UI | Material UI | Radix is unstyled by design; MUI fights back against brand overrides |
| ADR-005 | CSS utility layer | Tailwind CSS | CSS Modules, CSS-in-JS, plain CSS | Co-located styles, no leakage, brand preset makes tokens available as utilities automatically |
| ADR-006 | Project scaffolding | Fresh Vite setup + install `@adarsh/brand` | Clonable GitHub starter template | Templates drift; clones detach from the source and don't get future brand updates |
| ADR-007 | React | Peer dependency | Bundled inside package | Bundling React causes duplicate instances and hooks errors in consuming apps |

### Constraints Claude Code must respect

These decisions are FINAL for v1. Do not suggest alternatives unless explicitly asked:

- **No custom components built from scratch.** All components are Radix UI primitives with the AG brand theme applied. If a UI pattern is needed that Radix doesn't cover, use a Radix primitive directly in the consuming project.
- **No monorepo.** This repo is standalone. Do not suggest moving it into a Turborepo or workspace setup.
- **No dist-tags.** There is only one npm channel (`latest`).
- **No starter template.** Consuming projects are scaffolded fresh with Vite and install this package as a dependency.
- **Radix UI is the component foundation.** Do not suggest MUI, Chakra, shadcn/ui, or any other library.
- **Tailwind CSS is the utility layer.** Do not suggest CSS Modules, styled-components, or plain CSS as alternatives.
- **Tailwind preset extends defaults.** Do not replace Tailwind defaults — brand tokens are additive.
- **Dark-first only for v1.** Do not implement light mode or mode-switching logic.
- **React is a peer dependency.** Never bundle React inside the package.
- **SVG assets are plain URLs.** No SVGR. Consumers import SVGs as URLs, not as React components.
- **tsup is the build tool.** Do not introduce Vite, Rollup, esbuild directly, or any other bundler.

---

## File structure

```
adarsh-brand/
├── src/
│   ├── components/          ← pre-themed Radix UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   └── index.ts         ← barrel export for all components
│   ├── theme.css            ← all CSS custom property tokens
│   ├── tailwind.preset.js   ← Tailwind preset (extends defaults)
│   ├── assets/
│   │   ├── logo.svg
│   │   ├── logo-mark.svg
│   │   └── favicon.svg
│   └── index.ts             ← main package entry point
├── dist/                    ← built output (generated by tsup, committed)
│   ├── index.js             ← CJS
│   ├── index.mjs            ← ESM
│   ├── index.d.ts           ← TypeScript types
│   ├── theme.css
│   ├── tailwind.preset.js
│   └── assets/
│       ├── logo.svg
│       ├── logo-mark.svg
│       └── favicon.svg
├── package.json             ← exports map, peer deps, semver
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

---

## Component guidelines

- Components are a **curated subset** — only add a component when there is a real demand from a consuming project
- Each component wraps a Radix UI primitive with brand styles applied via Tailwind classes and CSS tokens
- Components must be fully accessible — behaviour and a11y are Radix's responsibility, not ours
- No component logic beyond what Radix provides — no custom state management inside components
- If the same UI pattern appears in 3+ consuming projects, that's the signal to extract it here

---

## Local development

```bash
# 1. Clone the repo
git clone <repo-url>
cd adarsh-brand

# 2. Install dependencies
bun install

# 3. Build the package
bun run build

# 4. Link globally for local dev consumption
npm link

# 5. In any consuming project
npm link @adarsh/brand

# 6. When done, unlink to restore normal npm resolution
# In consuming project:
npm unlink @adarsh/brand
# In adarsh-brand:
npm unlink
```

### Publishing

CI/CD handles publishing automatically via GitHub Actions (`.github/workflows/publish.yml`):

| Branch | Output | npm tag | Version format |
|---|---|---|---|
| `develop` | Prerelease | `dev` | `0.1.0-dev.{git-sha}` |
| `main` | Stable | `latest` | `0.1.0` |

Before merging to `main`, bump the version manually:
```bash
npm version patch   # or minor / major
```

Install the dev build in a consuming project:
```bash
npm install @adarsh/brand@dev
```

**Required:** Add `NPM_TOKEN` as a secret in the GitHub repo settings (Settings → Secrets → Actions).

### Semver rules
| Change | Bump |
|---|---|
| Token value tweak (color shade, spacing value) | `patch` |
| New component, asset, or token added | `minor` |
| Token renamed, removed, or breaking component API change | `major` |

---

## Milestones

| Milestone | Scope |
|---|---|
| v0.1 | Repo set up, CSS tokens, Tailwind preset, tsup build, published to npm |
| v0.2 | First component (Button) shipped and validated in a consuming project |
| v0.3 | SVG assets added (logo mark, wordmark, favicon) |
| v1.0 | Curated component set, README complete, consumed by at least one production project |
