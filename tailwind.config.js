/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fg-red': {
          primary: '#E51937',
          dark: '#C4162E',
          light: '#FF2D4A',
        },
        'fg-gray': {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#CCCCCC',
          400: '#999999',
          500: '#666666',
        },
        'fg-tan': '#F4EDE4',
        'fg-cream': '#FFF8F0',
        'fg-brown': '#8B6F47',
        'fg-success': '#2D8F3C',
        'fg-success-light': '#E8F5E9',
        'fg-warning': '#F9A825',
        'fg-warning-light': '#FFF9E1',
        'fg-error': '#E51937',
        'fg-error-light': '#FFEBEE',
        'fg-info': '#1976D2',
        'fg-info-light': '#E3F2FD',
      },
      fontFamily: {
        heading: ['Public Sans', 'sans-serif'],
        body: ['Public Sans', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 7vw, 6rem)',
        'display': 'clamp(2.5rem, 6vw, 4.5rem)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
