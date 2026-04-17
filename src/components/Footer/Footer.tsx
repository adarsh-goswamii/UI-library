import type { CSSProperties } from 'react'
import { AgWordmark } from '../Logo'

export interface FooterProps {
  /** Overrides the copyright year. Defaults to current year. */
  year?: number
}

export function Footer({ year = new Date().getFullYear() }: FooterProps) {
  const mono: CSSProperties = { fontFamily: 'var(--brand-font-mono)' }

  return (
    <div style={{
      paddingTop: 'var(--sp-16)',
      paddingBottom: 'var(--sp-8)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--sp-4)',
    }}>
      <AgWordmark />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="6" cy="6" r="5.5" stroke="var(--border-soft)" />
          <path d="M8 4.5A2.5 2.5 0 1 0 8 7.5" stroke="var(--text-disabled)" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <span style={{ ...mono, fontSize: 11, color: 'var(--text-disabled)' }}>
          {year} Adarsh Goswami. All rights reserved.
        </span>
      </div>
    </div>
  )
}
