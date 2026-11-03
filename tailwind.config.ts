import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        editorial: {
          bg: '#0C0D0E',
          surface: '#131417',
          elevated: '#191B1F',
          border: '#22252A',
          rule: '#2D3139',
          text: '#F4F4F6',
          muted: '#8B909A',
          subtle: '#555B66',
          accent: '#F59E0B',
          accentMuted: 'rgba(245, 158, 11, 0.12)',
        },
        devlink: {
          canvas: 'var(--dl-canvas)',
          panel: 'var(--dl-panel)',
          elevated: 'var(--dl-elevated)',
          hover: 'var(--dl-hover)',
          border: {
            subtle: 'var(--dl-border-subtle)',
            strong: 'var(--dl-border-strong)',
            focus: 'var(--dl-border-focus)',
          },
          primary: {
            DEFAULT: 'var(--dl-primary)',
            hover: 'var(--dl-primary-hover)',
            active: 'var(--dl-accent-active)',
          },
          cyan: 'var(--dl-cyan)',
          amber: '#F59E0B',
          text: {
            primary: 'var(--dl-text-primary)',
            secondary: 'var(--dl-text-secondary)',
            muted: 'var(--dl-text-muted)',
            disabled: 'var(--dl-text-disabled)',
          },
          status: {
            success: 'var(--dl-status-success)',
            warning: 'var(--dl-status-warning)',
            danger: 'var(--dl-status-danger)',
            info: 'var(--dl-status-info)',
          },
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
