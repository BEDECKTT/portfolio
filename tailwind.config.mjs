import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg:          'var(--color-bg)',
        surface:     'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border:      'var(--color-border)',
        text:        'var(--color-text)',
        muted:       'var(--color-text-muted)',
        accent:      'var(--color-accent)',
        'accent-2':  'var(--color-accent-2)',
      },
      animation: {
        wave: 'wave 4s linear infinite',
      },
      keyframes: {
        wave: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [typography],
};
