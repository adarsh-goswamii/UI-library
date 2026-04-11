import { useState } from 'react'
import { useTheme } from './ThemeContext'

export interface ThemeToggleProps {
  'aria-label'?: string
}

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <line x1="12" y1="2"  x2="12" y2="5"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2"  y1="12" x2="5"  y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ThemeToggle({ 'aria-label': ariaLabel = 'Toggle theme' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const isLight = theme === 'light'

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '56px',
    height: '28px',
    borderRadius: 'var(--brand-radius-full)',
    padding: '0 7px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    border: '1px solid var(--border-soft)',
    backgroundColor: isLight ? 'var(--accent-subtle)' : 'var(--bg-overlay)',
    transition: `background-color var(--brand-duration-base) var(--brand-ease-in-out),
                 border-color var(--brand-duration-base) var(--brand-ease-in-out)`,
    outline: 'none',
    boxShadow: isFocused ? 'var(--focus-ring)' : 'none',
  }

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '20px',
    height: '20px',
    borderRadius: 'var(--brand-radius-full)',
    backgroundColor: isLight ? 'var(--accent)' : 'var(--text-secondary)',
    transform: isLight ? 'translateX(28px)' : 'translateX(0)',
    transition: `transform var(--brand-duration-base) var(--brand-ease-out),
                 background-color var(--brand-duration-base) var(--brand-ease-in-out)`,
    pointerEvents: 'none',
  }

  const iconBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14px',
    height: '14px',
    flexShrink: 0,
    pointerEvents: 'none',
    transition: `color var(--brand-duration-base) var(--brand-ease-in-out),
                 opacity var(--brand-duration-base) var(--brand-ease-in-out)`,
  }

  const sunStyle: React.CSSProperties = {
    ...iconBase,
    color: isLight ? 'var(--accent-contrast)' : 'var(--text-muted)',
    opacity: isLight ? 0 : 1,
  }

  const moonStyle: React.CSSProperties = {
    ...iconBase,
    color: isLight ? 'var(--text-muted)' : 'var(--accent-bright)',
    opacity: isLight ? 1 : 0,
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={ariaLabel}
      onClick={toggleTheme}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={trackStyle}
    >
      <span style={sunStyle}>
        <SunIcon />
      </span>
      <span style={thumbStyle} />
      <span style={moonStyle}>
        <MoonIcon />
      </span>
    </button>
  )
}
