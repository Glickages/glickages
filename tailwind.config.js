/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'gewan-bg': '#000000',
        'gewan-dark': '#0f0f0f',
        'gewan-deep': '#032043',
        'gewan-blue': '#00377b',
        'gewan-cyan': '#1c7ed6',
        'gewan-bright': '#44c8f5',
        'gewan-text': '#ffffff',
        'gewan-muted': '#b2b2b2',
        'gewan-dim': '#666666',
        'gewan-card': 'rgba(58,77,102,0.43)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
      },
    },
  },
  plugins: [],
}
