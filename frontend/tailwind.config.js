/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        olive: {
          50: '#f4f5f0',
          100: '#e6e8dd',
          200: '#ced3be',
          300: '#b0b89a',
          400: '#929c76',
          500: '#758156',
          600: '#5a6442',
          700: '#485036',
          800: '#3a412c',
          900: '#323727',
          950: '#1a1d13',
        }
      },
      spacing: {
        '4': '1rem',    // 16px
        '8': '2rem',    // 32px
        '12': '3rem',   // 48px
        '16': '4rem',   // 64px
        '24': '6rem',   // 96px
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      }
    },
  },
  plugins: [],
}
