import { useTheme } from './ThemeContext'
import { Switch } from '@radix-ui/themes'

export interface ThemeToggleProps {
  'aria-label'?: string
}

/**
 * The one opinionated switch in this package.
 * Toggles between dark and light theme via ThemeContext.
 * Must be inside <ThemeProvider>.
 *
 * Dark mode: cosmic — star field track, moon thumb → glowing orb
 * Light mode: minimal — clean gray track, accent fill
 *
 * @example
 * <ThemeToggle />
 */
export function ThemeToggle({ 'aria-label': ariaLabel = 'Toggle theme' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Switch
      size="2"
      className="ag-theme-toggle"
      checked={theme === 'light'}
      onCheckedChange={() => toggleTheme()}
      aria-label={ariaLabel}
    />
  )
}
