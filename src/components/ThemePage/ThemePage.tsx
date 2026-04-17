import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Footer } from '../Footer'
import { AgMark, AgWordmark } from '../Logo'
import { ThemeToggle } from '../Theme/ThemeToggle'
import pkg from '../../../package.json'

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
  '--accent', '--accent-bright', '--accent-dim', '--accent-glow',
  '--success', '--warning', '--error', '--info',
]

const TYPE_SCALE = [
  { token: '--brand-text-5xl',  label: 'text-5xl',  role: 'display',  weight: 800, family: 'display' as const },
  { token: '--brand-text-4xl',  label: 'text-4xl',  role: 'h1',       weight: 700, family: 'display' as const },
  { token: '--brand-text-3xl',  label: 'text-3xl',  role: 'h2',       weight: 700, family: 'display' as const },
  { token: '--brand-text-2xl',  label: 'text-2xl',  role: 'h3',       weight: 700, family: 'display' as const },
  { token: '--brand-text-xl',   label: 'text-xl',   role: 'h4',       weight: 600, family: 'display' as const },
  { token: '--brand-text-lg',   label: 'text-lg',   role: 'h5',       weight: 600, family: 'display' as const },
  { token: '--brand-text-md',   label: 'text-md',   role: 'body-lg',  weight: 400, family: 'body' as const },
  { token: '--brand-text-base', label: 'text-base', role: 'body',     weight: 400, family: 'body' as const },
  { token: '--brand-text-sm',   label: 'text-sm',   role: 'caption',  weight: 400, family: 'body' as const },
  { token: '--brand-text-xs',   label: 'text-xs',   role: 'mono',     weight: 500, family: 'mono' as const },
]

const TYPE_SPECIMENS: Record<string, string> = {
  '--brand-text-5xl':  'Adarsh.',
  '--brand-text-4xl':  'Build fast, ship clean.',
  '--brand-text-3xl':  'Personal infrastructure.',
  '--brand-text-2xl':  'Reusable services, zero rework.',
  '--brand-text-xl':   'Authentication · Payments · Notifications',
  '--brand-text-lg':   'Dark-first design, consistent everywhere.',
  '--brand-text-md':   'A minimal design system that scales across projects.',
  '--brand-text-base': 'Built on an 8px grid with consistent tokens for color, spacing, and type.',
  '--brand-text-sm':   'Last updated April 2026 · Version 1.0.0',
  '--brand-text-xs':   'npm install @adarsh_goswami/brand',
}

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

const EASINGS = [
  { token: '--brand-ease-out',    label: 'ease-out',    value: 'cubic-bezier(0.16, 1, 0.3, 1)',  use: 'Entrances, expansions' },
  { token: '--brand-ease-in-out', label: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)',   use: 'State transitions' },
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

// ── Components showcase ───────────────────────────────────────────────────────

function ComponentsSection() {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const mono: CSSProperties = { fontFamily: 'var(--brand-font-mono)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>

      {/* Buttons */}
      <div>
        <SectionLabel>Buttons</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
          <button style={btnStyle('primary')}>Deploy service</button>
          <button style={btnStyle('secondary')}>View source</button>
          <button style={btnStyle('ghost')}>Cancel</button>
          <button style={btnStyle('danger')}>Delete</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center' }}>
          <button style={{ ...btnStyle('primary'), ...btnSize('sm') }}>Small</button>
          <button style={btnStyle('primary')}>Default</button>
          <button style={{ ...btnStyle('primary'), ...btnSize('lg') }}>Large</button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <SectionLabel>Badges</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center' }}>
          {[
            { label: 'Default',  bg: 'var(--bg-overlay)',    color: 'var(--text-secondary)', border: 'var(--border-soft)' },
            { label: '● Live',   bg: 'var(--accent-subtle)', color: 'var(--accent-bright)',  border: 'var(--accent-border)' },
            { label: '● Active', bg: 'var(--success-bg)',    color: 'var(--success)',         border: 'var(--success-border)' },
            { label: '● Degraded', bg: 'var(--warning-bg)', color: 'var(--warning)',          border: 'var(--warning-border)' },
            { label: '● Offline', bg: 'var(--error-bg)',    color: 'var(--error)',            border: 'var(--error-border)' },
          ].map(b => (
            <span key={b.label} style={{ ...mono, fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 'var(--brand-radius-sm)', background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div>
        <SectionLabel>Cards</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-4)' }}>
          {[
            { icon: '🔐', title: 'Auth Service',    body: 'JWT-based auth with refresh tokens, OAuth2, and session management.' },
            { icon: '💳', title: 'Payments',        body: 'Stripe-powered billing with webhooks, subscriptions, and invoicing.' },
            { icon: '📨', title: 'Notifications',   body: 'Email, push, and in-app notification service with templates.' },
          ].map(card => (
            <div key={card.title} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--brand-radius-xl)', padding: 'var(--sp-6)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 'var(--brand-radius-md)', background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-4)', fontSize: 16 }}>
                {card.icon}
              </div>
              <div style={{ fontFamily: 'var(--brand-font-display)', fontSize: 'var(--brand-text-md)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--sp-2)' }}>
                {card.title}
              </div>
              <div style={{ fontSize: 'var(--brand-text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {card.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Inputs */}
      <div>
        <SectionLabel>Form Inputs</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', maxWidth: 400 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <label style={labelStyle}>Project name</label>
            <input readOnly style={inputStyle()} placeholder="my-awesome-app" defaultValue="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <label style={labelStyle}>API Key</label>
            <input readOnly style={{ ...inputStyle(), ...mono, fontSize: 13 }} defaultValue="ag_live_••••••••••••3fa2" />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Keep this secret. Rotate from the dashboard.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <label style={labelStyle}>Status</label>
            <input readOnly style={inputStyle('error')} defaultValue="invalid-slug!" />
            <span style={{ fontSize: 11, color: 'var(--error)' }}>Only lowercase letters, numbers, and hyphens.</span>
          </div>
        </div>
      </div>

      {/* Code Block */}
      <div>
        <SectionLabel>Code Block</SectionLabel>
        <div style={{ ...mono, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--brand-radius-lg)', padding: 'var(--sp-5) var(--sp-6)', fontSize: 'var(--brand-text-sm)', color: 'var(--text-secondary)', lineHeight: 1.8, overflowX: 'auto' as const }}>
          <span style={{ color: 'var(--text-disabled)' }}>{'// Initialize AG Auth'}</span>{'\n'}
          <span style={{ color: 'var(--accent-bright)' }}>import</span>{' { createClient } '}
          <span style={{ color: 'var(--accent-bright)' }}>from</span>{' '}
          <span style={{ color: 'var(--success)' }}>'@ag/auth'</span>{'\n\n'}
          <span style={{ color: 'var(--accent-bright)' }}>const</span>{' auth = '}
          <span style={{ color: 'var(--info)' }}>createClient</span>{'({\n'}
          {'  projectId: '}<span style={{ color: 'var(--success)' }}>'proj_xxxxxxxx'</span>{',\n'}
          {'  secret:    process.env.'}<span style={{ color: 'var(--info)' }}>AG_SECRET</span>{',\n'}
          {'  ttl:       '}<span style={{ color: 'var(--warning)' }}>3600</span>{',\n'}
          {'})\n\n'}
          <span style={{ color: 'var(--accent-bright)' }}>export default</span>{' auth'}
        </div>
      </div>

      {/* Navigation */}
      <div>
        <SectionLabel>Navigation</SectionLabel>
        <div style={{ background: 'rgba(10,10,11,0.8)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--brand-radius-xl)', padding: 'var(--sp-3) var(--sp-5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--brand-font-display)', fontSize: 'var(--brand-text-md)', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M4 18 L9 6 L14 18" stroke="#7C6EFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="6" y1="14" x2="12" y2="14" stroke="#7C6EFA" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 10C16 8 17.5 7 19 7C20.5 7 22 8 22 10L22 12L19.5 12" stroke="#F0EEF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10C16 12 16 14 16 15C16 16.5 17.5 17 19 17C20.5 17 22 16.5 22 15L22 12" stroke="#F0EEF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Adarsh
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-6)', listStyle: 'none' } as CSSProperties}>
            {['Work', 'Services', 'Blog', 'Contact'].map((link, i) => (
              <span key={link} style={{ fontSize: 'var(--brand-text-sm)', color: i === 0 ? 'var(--accent-bright)' : 'var(--text-secondary)', cursor: 'pointer' }}>
                {link}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <ThemeToggle />
            <button style={{ ...btnStyle('primary'), ...btnSize('sm') }}>Hire me</button>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <div>
        <SectionLabel>Tooltip</SectionLabel>
        <div style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <button style={btnStyle('secondary')}>Hover me</button>
          {tooltipVisible && (
            <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-overlay)', border: '1px solid var(--border-soft)', borderRadius: 'var(--brand-radius-md)', padding: 'var(--sp-2) var(--sp-3)', fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', boxShadow: 'var(--brand-shadow-md)', zIndex: 10, pointerEvents: 'none' }}>
              Triggers on hover · 120ms delay
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div>
        <SectionLabel>Tags</SectionLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
          {['typescript', 'react', 'node.js', 'postgres', 'redis', 'docker'].map(tag => (
            <span key={tag} style={{ ...mono, fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-overlay)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: 'var(--brand-radius-sm)', display: 'inline-block' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

// ── Shared style helpers ──────────────────────────────────────────────────────

function btnStyle(variant: 'primary' | 'secondary' | 'ghost' | 'danger'): CSSProperties {
  const base: CSSProperties = {
    fontFamily: 'var(--brand-font-body)',
    fontSize: 'var(--brand-text-sm)',
    fontWeight: 500,
    padding: 'var(--sp-3) var(--sp-5)',
    borderRadius: 'var(--brand-radius-md)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--sp-2)',
    letterSpacing: '0.01em',
    lineHeight: 1,
  }
  if (variant === 'primary')   return { ...base, background: 'var(--accent)',    color: '#fff' }
  if (variant === 'secondary') return { ...base, background: 'var(--bg-raised)', color: 'var(--text-primary)', border: '1px solid var(--border-soft)' }
  if (variant === 'ghost')     return { ...base, background: 'transparent',      color: 'var(--text-secondary)', border: '1px solid transparent' }
  return { ...base, background: 'var(--error-bg)', color: 'var(--error)', border: '1px solid var(--error-border)' }
}

function btnSize(size: 'sm' | 'lg'): CSSProperties {
  if (size === 'sm') return { fontSize: 11,                        padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--brand-radius-sm)' }
  return              { fontSize: 'var(--brand-text-base)' as string, padding: 'var(--sp-4) var(--sp-8)', borderRadius: 'var(--brand-radius-lg)' }
}

const labelStyle: CSSProperties = {
  fontSize: 'var(--brand-text-xs)',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  letterSpacing: '0.03em',
}

function inputStyle(state?: 'error'): CSSProperties {
  return {
    fontFamily: 'var(--brand-font-body)',
    fontSize: 'var(--brand-text-sm)',
    color: 'var(--text-primary)',
    background: 'var(--bg-raised)',
    border: `1px solid ${state === 'error' ? 'var(--error)' : 'var(--border-soft)'}`,
    borderRadius: 'var(--brand-radius-md)',
    padding: 'var(--sp-3) var(--sp-4)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }
}

// ── ThemePage ─────────────────────────────────────────────────────────────────

export interface ThemePageProps {
  /** Overrides the version shown in the hero. Defaults to the package's own version. */
  version?: string
}

export function ThemePage({ version = pkg.version }: ThemePageProps) {
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

        {/* ── 01 Identity ── */}
        <Section label="01 — Identity" title="Logo & Mark" description="The AG monogram is built from geometric forms — two interlocked letterforms on a contained grid." first>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-4)' }}>

            <div style={logoCardStyle('dark')}>
              <AgMark size={64} variant="dark" />
              <span style={logoLabelStyle('dark')}>Primary — Dark</span>
            </div>

            <div style={logoCardStyle('glow')}>
              <AgMark size={64} variant="glow" />
              <span style={logoLabelStyle('dark')}>Glow Variant</span>
            </div>

            <div style={logoCardStyle('light')}>
              <AgMark size={64} variant="light" />
              <span style={logoLabelStyle('light')}>Light Variant</span>
            </div>

            <div style={{ ...logoCardStyle('dark'), justifyContent: 'center' }}>
              <AgWordmark />
              <span style={logoLabelStyle('dark')}>Wordmark</span>
            </div>

          </div>
        </Section>

        {/* ── 02 Colors ── */}
        <Section label="02 — Color" title="Color System" description="Dark-first palette anchored by a violet-indigo accent. All values resolve from theme.css.">

          <SectionLabel>Accent</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--accent-bright" label="Bright" values={colorValues} />
            <ColorSwatch token="--accent"        label="Base"   values={colorValues} />
            <ColorSwatch token="--accent-dim"    label="Dim"    values={colorValues} />
            <ColorSwatch token="--accent-glow"   label="Glow"   values={colorValues} />
          </ColorGrid>

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

          <SectionLabel>Semantic</SectionLabel>
          <ColorGrid>
            <ColorSwatch token="--success" label="Success" values={colorValues} />
            <ColorSwatch token="--warning" label="Warning" values={colorValues} />
            <ColorSwatch token="--error"   label="Error"   values={colorValues} />
            <ColorSwatch token="--info"    label="Info"    values={colorValues} />
          </ColorGrid>
        </Section>

        {/* ── 03 Typography ── */}
        <Section label="03 — Typography" title="Type System" description="Syne for display and headings. DM Sans for body. DM Mono for code, labels, and data.">

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
            {TYPE_SCALE.map(({ token, label, role, weight, family }) => (
              <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-6)', padding: 'var(--sp-5) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ minWidth: 130, flexShrink: 0 }}>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--accent)', letterSpacing: '0.08em' }}>{token}</div>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--text-disabled)', marginTop: 1 }}>{role}</div>
                </div>
                <div style={{ fontFamily: fontFamilyVar(family), fontSize: `var(${token})`, fontWeight: weight, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {TYPE_SPECIMENS[token]}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 04 Spacing ── */}
        <Section label="04 — Spacing" title="Spacing Scale" description="8px base grid. All values are multiples of 4px for sub-grid alignment.">
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

        {/* ── 05 Shape ── */}
        <Section label="05 — Shape" title="Border Radius" description="Consistent corner radii for a cohesive, modern feel across all components.">
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

        {/* ── 06 Elevation ── */}
        <Section label="06 — Elevation" title="Shadows" description="Four shadow levels including an accent glow.">
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

        {/* ── 07 Components ── */}
        <Section label="07 — Components" title="UI Components" description="Core interactive elements built from the token system above.">
          <ComponentsSection />
        </Section>

        {/* ── 08 Motion ── */}
        <Section label="08 — Motion" title="Animation Tokens" description="Subtle, purposeful motion. Never decorative — always communicates state or hierarchy.">

          <SectionLabel>Easing</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
            {EASINGS.map(({ token, label, value, use }) => (
              <div key={token} style={{ padding: 'var(--sp-5)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--brand-radius-md)' }}>
                <div style={{ ...mono, fontSize: 10, color: 'var(--accent)', marginBottom: 'var(--sp-2)' }}>{token}</div>
                <div style={{ fontFamily: 'var(--brand-font-display)', fontSize: 'var(--brand-text-md)', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
                <div style={{ ...mono, fontSize: 10, color: 'var(--text-muted)', marginTop: 'var(--sp-2)' }}>{value}</div>
                <div style={{ fontSize: 'var(--brand-text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--sp-2)' }}>{use}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Duration</SectionLabel>
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

        {/* ── Footer ── */}
        <Footer />

      </div>
    </div>
  )
}

// ── Logo card style helpers ───────────────────────────────────────────────────

function logoCardStyle(bg: 'dark' | 'glow' | 'light'): CSSProperties {
  const backgrounds = {
    dark:  'var(--bg-overlay)',
    glow:  '#0D0C1A',
    light: '#F0EEF8',
  }
  const borders = {
    dark:  'var(--border-subtle)',
    glow:  'rgba(124,110,250,0.2)',
    light: 'rgba(0,0,0,0.08)',
  }
  return {
    background: backgrounds[bg],
    border: `1px solid ${borders[bg]}`,
    borderRadius: 'var(--brand-radius-lg)',
    padding: 'var(--sp-8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--sp-4)',
  }
}

function logoLabelStyle(bg: 'dark' | 'light'): CSSProperties {
  return {
    fontFamily: 'var(--brand-font-mono)',
    fontSize: 'var(--brand-text-xs)',
    color: bg === 'light' ? '#5C5A6E' : 'var(--text-muted)',
    letterSpacing: '0.08em',
  }
}
