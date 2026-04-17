import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync } from 'fs'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@radix-ui/themes', 'tailwindcss'],
  esbuildOptions(options) {
    options.loader = { ...options.loader, '.svg': 'dataurl' }
  },
  onSuccess: async () => {
    // Copy static CSS files
    copyFileSync('src/theme.css', 'dist/theme.css')
    copyFileSync('src/tailwind.config.css', 'dist/tailwind.config.css')

    // Copy brand assets
    mkdirSync('dist/assets', { recursive: true })
    copyFileSync('src/assets/logo.svg', 'dist/assets/logo.svg')
    copyFileSync('src/assets/logo-mark.svg', 'dist/assets/logo-mark.svg')
    copyFileSync('src/assets/favicon.svg', 'dist/assets/favicon.svg')
  },
})
