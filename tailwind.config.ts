import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f7ebe5',
          200: '#f0d5c9',
          300: '#e4b8a4',
          400: '#d49577',
          500: '#c47a56',
          600: '#b66648',
          700: '#97533c',
          800: '#7a4535',
          900: '#643b2f',
        },
        accent: {
          50: '#f5f7f0',
          100: '#e8eddc',
          200: '#d3debb',
          300: '#b5c791',
          400: '#96ae6a',
          500: '#78934d',
          600: '#5d753b',
          700: '#485b30',
          800: '#3b4a29',
          900: '#333f25',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
