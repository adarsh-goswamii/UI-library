import { createContext, useContext } from 'react'

export type ThemeMode = 'dark' | 'light'

export interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (ctx === null) {
    throw new Error('[useTheme] must be used inside <ThemeProvider>.')
  }
  return ctx
}
