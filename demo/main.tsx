import '@radix-ui/themes/styles.css'
import '../src/theme.css'
import { ThemePage, ThemeProvider } from '../src'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemePage />
    </ThemeProvider>
  </StrictMode>
)
