import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { Theme } from '@radix-ui/themes'
import { ThemeContext } from './ThemeContext'
import type { ThemeMode } from './ThemeContext'

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeMode
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <Theme appearance={theme}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}
