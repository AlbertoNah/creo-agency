import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        void: '#000000',
        amber: '#FF6820',
        'amber-soft': '#FFA060',
        // legacy (kept so old files don't break)
        gold: '#B8975A',
        teal: '#00F5D4',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'noise': 'noise 0.4s steps(2) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        noise: {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '20%': { transform: 'translate(2%, 2%)' },
          '30%': { transform: 'translate(-3%, 0%)' },
          '40%': { transform: 'translate(3%, -2%)' },
          '50%': { transform: 'translate(-2%, 3%)' },
          '60%': { transform: 'translate(2%, -3%)' },
          '70%': { transform: 'translate(-3%, 2%)' },
          '80%': { transform: 'translate(3%, 3%)' },
          '90%': { transform: 'translate(-2%, -3%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8975A 0%, #D4B98A 50%, #B8975A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #030303 0%, #0C0C0E 100%)',
      },
    },
  },
  plugins: [],
}

export default config
