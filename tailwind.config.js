/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        purple: {
          800: '#6b2f91', // Ensure the purple-800 color is defined
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        fontSize: {
          base: '0.875rem', // 14px as the default size
          sm: '0.55rem', // 12px for small text
          lg: '1rem', // 16px for larger text
        },
        blue: {
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        green: {
          light: '#10B981',
          dark: '#047857',
        },
        red: {
          light: '#EF4444',
          dark: '#B91C1C',
        },
        yellow: {
          light: '#F59E0B',
          dark: '#B45309',
        },
      },
      fontFamily: {
        montserrat: ["'Montserrat'", 'sans-serif'],
        roboto: ["'Roboto'", 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        dialog: '0 10px 20px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
