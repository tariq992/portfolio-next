// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          card: '#14141e',
          border: '#2a2a3a',
        },
        light: {
          bg: '#f8f9fa',
          card: '#ffffff',
          border: '#e5e7eb',
        }
      }
    },
  },
  plugins: [],
}
export default config