import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue - 藍色深淺漸變
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Accent Orange - 僅用於 Lv8 和強調
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
        },
        // Neutral - 參考 Stripe 的灰階
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // 狀態色
        success: {
          light: '#ECFDF5',
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        warning: {
          light: '#FFFBEB',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        error: {
          light: '#FEF2F2',
          DEFAULT: '#EF4444',
          dark: '#DC2626',
        },
        // 保留舊的 brand 色彩供過渡期使用
        brand: {
          primary: '#2563EB',
          secondary: '#3B82F6',
        },
        // 保留舊的 text 色彩供過渡期使用
        text: {
          primary: '#171717',
          secondary: '#525252',
          muted: '#737373',
        },
        // 保留舊的 bg 色彩供過渡期使用
        bg: {
          primary: '#FAFAFA',
          secondary: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.75' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.35' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        card: '16px', // unified card radius
        button: '10px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.04)',
        md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        // Unified card shadows
        card: '0 1px 3px rgba(0, 0, 0, 0.06)',
        'card-elevated': '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04)',
        // Recommended plan glow (subtle brand tint)
        'card-recommended': '0 8px 32px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
        button: '0 4px 14px rgba(37, 99, 235, 0.25)',
      },
      spacing: {
        '4.5': '18px',
        '18': '72px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
