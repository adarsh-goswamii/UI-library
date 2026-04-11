import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

// ── Token reader ──────────────────────────────────────────────────────────────

function useTokenMap(tokens: string[]): Record<string, string> {
  const [map, setMap] = useState<Record<string, string>>({})
  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    const result: Record<string, string> = {}
    for (const t of tokens) result[t] = style.getPropertyValue(t).trim()
    setMap(result)
  }, [])
  return map
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--brand-font-mono)',
      fontSize: 'var(--brand-text-xs)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: 'var(--text-muted)',
      margin: 'var(--sp-6) 0 var(--sp-3)',
    }}>
      {children}
    </p>
  )
}

function Section({ label, title, description, children, first }: {
  label: string
  title: string
  description?: string
  children: ReactNode
  first?: boolean
}) {
  return (
    <section style={{
      marginBottom: 'var(--sp-24)',
      paddingTop: first ? 0 : 'var(--sp-24)',
      borderTop: first ? 'none' : '1px solid var(--border-subtle)',
    }}>
      <div style={{ fontFamily: 'var(--brand-font-mono)', fontSize: 'var(--brand-text-xs)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--sp-2)' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--brand-font-display)', fontSize: 'var(--brand-text-2xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--sp-2)' }}>
        {title}
      </div>
      {description && (
        <div style={{ fontSize: 'var(--brand-text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--sp-8)', maxWidth: 480 }}>
          {description}
        </div>
      )}
      {children}
    </section>
  )
}

function ColorSwatch({ token, label, values }: { token: string; label: string; values: Record<string, string> }) {
  return (
    <div style={{ borderRadius: 'var(--brand-radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      <div style={{ height: 56, background: `var(${token})` }} />
      <div style={{ background: 'var(--bg-surface)', padding: '10px 12px 14px' }}>
        <div style={{ fontSize: 'var(--brand-text-xs)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontFamily: 'var(--brand-font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
          {token}
        </div>
        {values[token] && (
          <div style={{ fontFamily: 'var(--brand-font-mono)', fontSize: 10, color: 'var(--text-disabled)', marginTop: 1 }}>
            {values[token]}
          </div>
        )}
      </div>
    </div>
  )
}

function ColorGrid({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--sp-3)' }}>
      {children}
    </div>
  )
}

// ── Token data ────────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  '--bg-base', '--bg-surface', '--bg-raised', '--bg-overlay',
  '--border-subtle', '--border-soft', '--border-mid',
  '--text-primary', '--text-secondary', '--text-muted', '--text-disabled',
  '--accent', '--accent-bright', '--accent-dim',
  '--success', '--warning', '--error', '--info',
]

const TYPE_SCALE = [
  { token: '--brand-text-5xl',  label: 'text-5xl',  weight: 800, family: 'display' },
  { token: '--brand-text-4xl',  label: 'text-4xl',  weight: 700, family: 'display' },
  { token: '--brand-text-3xl',  label: 'text-3xl',  weight: 700, family: 'display' },
  { token: '--brand-text-2xl',  label: 'text-2xl',  weight: 700, family: 'display' },
  { token: '--brand-text-xl',   label: 'text-xl',   weight: 600, family: 'display' },
  { token: '--brand-text-lg',   label: 'text-lg',   weight: 400, family: 'body' },
  { token: '--brand-text-md',   label: 'text-md',   weight: 400, family: 'body' },
  { token: '--brand-text-base', label: 'text-base', weight: 400, family: 'body' },
  { token: '--brand-text-sm',   label: 'text-sm',   weight: 400, family: 'body' },
  { token: '--brand-text-xs',   label: 'text-xs',   weight: 500, family: 'mono' },
] as const

const SPACING = [
  { token: '--sp-1',  rem: '0.25rem', px: '4px' },
  { token: '--sp-2',  rem: '0.5rem',  px: '8px' },
  { token: '--sp-3',  rem: '0.75rem', px: '12px' },
  { token: '--sp-4',  rem: '1rem',    px: '16px' },
  { token: '--sp-5',  rem: '1.25rem', px: '20px' },
  { token: '--sp-6',  rem: '1.5rem',  px: '24px' },
  { token: '--sp-8',  rem: '2rem',    px: '32px' },
  { token: '--sp-10', rem: '2.5rem',  px: '40px' },
  { token: '--sp-12', rem: '3rem',    px: '48px' },
  { token: '--sp-16', rem: '4rem',    px: '64px' },
  { token: '--sp-20', rem: '5rem',    px: '80px' },
  { token: '--sp-24', rem: '6rem',    px: '96px' },
]

const RADII = [
  { token: '--brand-radius-sm',   label: 'sm',   value: '4px' },
  { token: '--brand-radius-md',   label: 'md',   value: '8px' },
  { token: '--brand-radius-lg',   label: 'lg',   value: '12px' },
  { token: '--brand-radius-xl',   label: 'xl',   value: '16px' },
  { token: '--brand-radius-2xl',  label: '2xl',  value: '24px' },
  { token: '--brand-radius-full', label: 'full', value: '9999px' },
]

const SHADOWS = [
  { token: '--brand-shadow-sm',     label: 'shadow-sm',     desc: 'Subtle lift' },
  { token: '--brand-shadow-md',     label: 'shadow-md',     desc: 'Card elevation' },
  { token: '--brand-shadow-lg',     label: 'shadow-lg',     desc: 'Modal / overlay' },
  { token: '--brand-shadow-accent', label: 'shadow-accent', desc: 'Accent glow' },
]

const DURATIONS = [
  { token: '--brand-duration-fast', label: 'fast', value: '120ms', use: 'Hover states, micro-interactions' },
  { token: '--brand-duration-base', label: 'base', value: '220ms', use: 'Most transitions' },
  { token: '--brand-duration-slow', label: 'slow', value: '400ms', use: 'Page-level, reveals' },
]

const FONT_FAMILIES = [
  { token: '--brand-font-display', cssFamily: 'var(--brand-font-display)', weight: 700, sample: 'Syne — Display' },
  { token: '--brand-font-body',    cssFamily: 'var(--brand-font-body)',    weight: 400, sample: 'DM Sans — Body' },
  { token: '--brand-font-mono',    cssFamily: 'var(--brand-font-mono)',    weight: 400, sample: 'DM Mono — Mono' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function fontFamilyVar(family: 'display' | 'body' | 'mono'): string {
  if (family === 'display') return 'var(--brand-font-display)'
  if (family === 'mono')    return 'var(--brand-font-mono)'
  return 'var(--brand-font-body)'
}

// ── ThemePage ─────────────────────────────────────────────────────────────────

export interface ThemePageProps {
  /** Package version shown in the hero. Pass `import pkg from '../package.json'` version field. */
  version?: string
}

export function ThemePage({ version }: ThemePageProps) {
  const colorValues = useTokenMap(COLOR_TOKENS)

  const mono: CSSProperties = { fontFamily: 'var(--brand-font-mono)' }
  const dot: CSSProperties  = { width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }

  return (
    <div style={{
      background: 'var(--bg-base)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--brand-font-body)',
      fontSize: 'var(--brand-text-base)',
      lineHeight: 1.6,
      WebkitFontSmoothing: 'antialiased',
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: 'var(--brand-layout-container-max)', margin: '0 auto', padding: 'var(--sp-16) var(--sp-8)' }}>

        {/* ── Hero ── */}
        <div style={{ paddingTop: 'var(--sp-20)', paddingBottom: 'var(--sp-16)', position: 'relative', overflow: 'hidden' }}>
          {/* Glow blob */}
          <div style={{
            position: 'absolute', top: -80, left: -120, width: 600, height: 400,
            background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ ...mono, fontSize: 'var(--brand-text-xs)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--sp-6)', display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', position: 'relative' }}>
            <span style={{ width: 24, height: 1, background: 'var(--border-mid)', display: 'inline-block' }} />
            @adarsh_goswami/brand
            {version && (
              <span style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', border: '1px solid var(--accent-border)', borderRadius: 'var(--brand-radius-sm)', padding: '2px 8px', fontSize: 10 }}>
                v{version}
              </span>
            )}
          </div>

          <div style={{ fontFamily: 'var(--brand-font-display)', fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 'var(--sp-6)', position: 'relative' }}>
            <span style={{ color: 'var(--text-primary)' }}>Design</span>
            <br />
            <span style={{ color: 'var(--accent)' }}>System</span>
          </div>

          <div style={{ fontSize: 'var(--brand-text-md)', color: 'var(--text-secondary)', fontWeight: 300, maxWidth: 420, lineHeight: 1.7, position: 'relative' }}>
            The single source of truth for all brand decisions — colors, typography, spacing, and motion.
          </div>

          <div style={{ ...mono, marginTop: 'var(--sp-10)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--sp-6)', fontSize: 'var(--brand-text-xs)', color: 'var(--text-muted)', letterSpacing: '0.06em', position: 'relative' }}>
            {['Radix UI', 'Tailwind CSS', 'TypeScript'].map(tech => (
              <span key={tech} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span style={dot} />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── 01 Colors ── */}
        <Section label="01 — Colors" title="Color Palette" description="All brand colors as CSS custom properties. Values resolve from theme.css and update automatically when the package updates." first>

          <SectionLabel>Backgrounds</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--bg-base"    label="Base"    values={colorValues} />
            <ColorSwatch token="--bg-surface" label="Surface" values={colorValues} />
            <ColorSwatch token="--bg-raised"  label="Raised"  values={colorValues} />
            <ColorSwatch token="--bg-overlay" label="Overlay" values={colorValues} />
          </ColorGrid>

          <SectionLabel>Borders</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--border-subtle" label="Subtle" values={colorValues} />
            <ColorSwatch token="--border-soft"   label="Soft"   values={colorValues} />
            <ColorSwatch token="--border-mid"    label="Mid"    values={colorValues} />
          </ColorGrid>

          <SectionLabel>Text</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--text-primary"   label="Primary"   values={colorValues} />
            <ColorSwatch token="--text-secondary" label="Secondary" values={colorValues} />
            <ColorSwatch token="--text-muted"     label="Muted"     values={colorValues} />
            <ColorSwatch token="--text-disabled"  label="Disabled"  values={colorValues} />
          </ColorGrid>

          <SectionLabel>Accent</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--accent"        label="Accent"  values={colorValues} />
            <ColorSwatch token="--accent-bright" label="Bright"  values={colorValues} />
            <ColorSwatch token="--accent-dim"    label="Dim"     values={colorValues} />
          </ColorGrid>

          <SectionLabel>Semantic</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--success" label="Success" values={colorValues} />
            <ColorSwatch token="--warning" label="Warning" values={colorValues} />
            <ColorSwatch token="--error"   label="Error"   values={colorValues} />
            <ColorSwatch token="--info"    label="Info"    values={colorValues} />
          </ColorGrid>
        </Section>

        {/* ── 02 Typography ── */}
        <Section label="02 — Typography" title="Type System" description="Three typefaces, a 10-step scale, and fluid hero sizing.">

          <SectionLabel>Families</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-8)' }}>
            {FONT_FAMILIES.map(({ token, cssFamily, weight, sample }) => (
              <div key={token} style={{ padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--brand-radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: cssFamily, fontWeight: weight, fontSize: 'var(--brand-text-lg)', color: 'var(--text-primary)' }}>
                  {sample}
                </span>
                <span style={{ ...mono, fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>{token}</span>
              </div>
            ))}
          </div>

          <SectionLabel>Scale</SectionLabel>
          <div>
            {TYPE_SCALE.map(({ token, label, weight, family }) => (
              <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-6)', padding: 'var(--sp-5) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ minWidth: 130, flexShrink: 0 }}>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em' }}>{token}</div>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
                </div>
                <div style={{ fontFamily: fontFamilyVar(family), fontSize: `var(${token})`, fontWeight: weight, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 03 Spacing ── */}
        <Section label="03 — Spacing" title="Spacing Scale" description="Consistent spacing tokens from 4px to 96px.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {SPACING.map(({ token, rem, px }) => (
              <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', minWidth: 70 }}>{token}</div>
                <div style={{ flex: 1, height: 24, display: 'flex', alignItems: 'center' }}>
                  <div style={{ height: 8, width: `var(${token})`, background: 'var(--accent)', borderRadius: 2, opacity: 0.7 }} />
                </div>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)', minWidth: 50 }}>{rem}</div>
                <div style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', minWidth: 40 }}>{px}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 04 Radius ── */}
        <Section label="04 — Radius" title="Border Radius" description="Six radius values from sharp to fully round.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 'var(--sp-4)' }}>
            {RADII.map(({ token, label, value }) => (
              <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)' }}>
                <div style={{ width: 64, height: 64, background: 'var(--bg-raised)', border: '1px solid var(--border-soft)', borderRadius: `var(${token})` }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--accent)' }}>{label}</div>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 05 Shadows ── */}
        <Section label="05 — Shadows" title="Elevation" description="Four shadow levels including an accent glow.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-6)' }}>
            {SHADOWS.map(({ token, label, desc }) => (
              <div key={token} style={{ padding: 'var(--sp-8)', background: 'var(--bg-surface)', borderRadius: 'var(--brand-radius-lg)', boxShadow: `var(${token})` }}>
                <div style={{ ...mono, fontSize: 10, color: 'var(--accent)', marginBottom: 'var(--sp-1)' }}>{token}</div>
                <div style={{ ...mono, fontSize: 10, color: 'var(--text-secondary)', marginBottom: 'var(--sp-1)' }}>{label}</div>
                <div style={{ fontSize: 'var(--brand-text-xs)', color: 'var(--text-muted)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 06 Motion ── */}
        <Section label="06 — Motion" title="Transitions" description="Duration and easing tokens for consistent, intentional animation.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-4)' }}>
            {DURATIONS.map(({ token, label, value, use }) => (
              <div key={token} style={{ padding: 'var(--sp-5)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--brand-radius-md)' }}>
                <div style={{ ...mono, fontSize: 10, color: 'var(--accent)', marginBottom: 'var(--sp-2)' }}>{token}</div>
                <div style={{ fontFamily: 'var(--brand-font-display)', fontSize: 'var(--brand-text-xl)', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
                <div style={{ ...mono, fontSize: 10, color: 'var(--text-muted)', marginTop: 'var(--sp-2)' }}>{label}</div>
                <div style={{ fontSize: 'var(--brand-text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--sp-2)' }}>{use}</div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}
