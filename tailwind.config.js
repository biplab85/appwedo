/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          50: '#ECEAFD',
          100: '#D9D5FB',
          200: '#B3ABF7',
          300: '#8D81F3',
          400: '#6757EF',
          500: '#4F46E5',
          600: '#2A1FD1',
          700: '#2018A3',
          800: '#171275',
          900: '#0E0B47',
        },
        secondary: {
          DEFAULT: '#10B981',
          50: '#E6FBF4',
          100: '#CCF7E9',
          200: '#99EFD3',
          300: '#66E7BD',
          400: '#33DFA7',
          500: '#10B981',
          600: '#0D9668',
          700: '#0A724F',
          800: '#074D35',
          900: '#03291C',
        },
        dark: {
          DEFAULT: '#1F2937',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FEF9E7',
          100: '#FDF3CF',
          200: '#FBE79F',
          300: '#F9DB6F',
          400: '#F7CF3F',
          500: '#F59E0B',
          600: '#C47F09',
          700: '#936007',
          800: '#624004',
          900: '#312002',
        },
      },
      fontFamily: {
        primary: ['Comfortaa', 'cursive'],
        sans: ['Comfortaa', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
