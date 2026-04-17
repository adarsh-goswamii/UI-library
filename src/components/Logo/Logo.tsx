export type AgMarkVariant = 'dark' | 'glow' | 'light'

export interface AgMarkProps {
  size?: number
  variant?: AgMarkVariant
}

export function AgMark({ size = 64, variant = 'dark' }: AgMarkProps) {
  const aPrimary = variant === 'light' ? '#4A3FCC' : variant === 'glow' ? '#9B8FFB' : '#7C6EFA'
  const gPrimary = variant === 'light' ? '#0A0A0B' : '#F0EEF8'
  const bgFill   = variant === 'light' ? '#F0EEF8' : variant === 'glow' ? 'url(#agGlowGrad)' : '#111113'

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {variant === 'glow' && (
        <defs>
          <radialGradient id="agGlowGrad" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#1A1630" />
            <stop offset="100%" stopColor="#0D0C1A" />
          </radialGradient>
        </defs>
      )}
      <rect width="64" height="64" rx="14" fill={bgFill} />
      <path d="M14 46 L24 20 L34 46" stroke={aPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="37" x2="30" y2="37" stroke={aPrimary} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 28 C38 23 42 20 47 20 C52 20 55 23 55 28 L55 32 L49 32 L49 29" stroke={gPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 28 C38 33 38 38 38 40 C38 43.5 42 46 47 46 C52 46 55 43.5 55 40 L55 32" stroke={gPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AgWordmark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg viewBox="0 0 36 36" width="36" height="36" fill="none">
        <rect width="36" height="36" rx="8" fill="#18181C" />
        <path d="M6 26 L13 10 L20 26" stroke="#7C6EFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="9" y1="20.5" x2="17" y2="20.5" stroke="#7C6EFA" strokeWidth="2" strokeLinecap="round" />
        <path d="M23 16.5 C23 13.5 25.5 12 28 12 C30.5 12 32 13.5 32 16.5 L32 18.5 L28.5 18.5 L28.5 16.5" stroke="#F0EEF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 16.5 C23 19 23 21.5 23 23 C23 25 25.5 26 28 26 C30.5 26 32 25 32 23 L32 18.5" stroke="#F0EEF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'var(--brand-font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        Adarsh<span style={{ color: 'var(--accent)' }}>.</span>
      </span>
    </div>
  )
}
