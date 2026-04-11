import React from 'react'
import { Switch as RadixSwitch } from '@radix-ui/themes'

// ─── Types ────────────────────────────────────────────────────────────────────

type SwitchSize    = 'sm' | 'md' | 'lg'
type SwitchVariant = 'dark' | 'light'

export interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadixSwitch>,
    'size' | 'variant' | 'radius' | 'color'
  > {
  /**
   * Visual size of the switch.
   * Default: `'sm'` for light, `'md'` for dark (needs room for moon/star detail).
   */
  size?: SwitchSize
  /**
   * Theme variant — should match the surrounding page theme.
   * - `'dark'`  — cosmic: deep space track, moon thumb → glowing orb when on
   * - `'light'` — minimal: clean white track, no glow, soft accent when on
   *
   * Default: `'dark'` (brand is dark-first)
   */
  variant?: SwitchVariant
  /** Inline label rendered to the left of the switch */
  label?: string
  /** Supporting text rendered below the label */
  description?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const radixSizeMap: Record<SwitchSize, '1' | '2' | '3'> = {
  sm: '1',
  md: '2',
  lg: '3',
}

function resolveSize(size: SwitchSize | undefined, variant: SwitchVariant): SwitchSize {
  if (size) return size
  // Dark/cosmic needs md so moon craters + stars read clearly
  return variant === 'dark' ? 'md' : 'sm'
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * AG-branded Switch — variant mirrors the active page theme.
 *
 * @example
 * // Dark page — cosmic switch (default)
 * <Switch variant="dark" defaultChecked />
 *
 * @example
 * // Light page — minimal clean switch
 * <Switch variant="light" defaultChecked />
 *
 * @example
 * // Settings row with label + description
 * <Switch
 *   variant="light"
 *   label="Notifications"
 *   description="Receive activity updates"
 * />
 */
export function Switch({ size, variant = 'dark', label, description, ...props }: SwitchProps) {
  const resolvedSize = resolveSize(size, variant)

  const switchEl = (
    <RadixSwitch
      size={radixSizeMap[resolvedSize]}
      className={`ag-switch ag-switch-${variant}`}
      {...props}
    />
  )

  if (!label && !description) return switchEl

  return (
    <label
      className="ag-switch-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--sp-4)',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: props.disabled ? 0.5 : 1,
        transition: 'opacity var(--brand-duration-fast) var(--brand-ease-out)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {label && (
          <span
            style={{
              fontFamily: 'var(--brand-font-body)',
              fontSize: 'var(--brand-text-sm)',
              fontWeight: 'var(--brand-font-medium)',
              color: variant === 'light' ? '#1a1825' : 'var(--text-primary)',
              lineHeight: 'var(--brand-leading-tight)',
            }}
          >
            {label}
          </span>
        )}
        {description && (
          <span
            style={{
              fontFamily: 'var(--brand-font-body)',
              fontSize: 'var(--brand-text-xs)',
              color: variant === 'light' ? '#7a7890' : 'var(--text-muted)',
              lineHeight: 'var(--brand-leading-normal)',
            }}
          >
            {description}
          </span>
        )}
      </div>

      {switchEl}
    </label>
  )
}
