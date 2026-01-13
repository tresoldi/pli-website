/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './*.html',
        './en/*.html',
        './es/*.html',
        './js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                // Earthy warm palette
                terra: {
                    50: '#FDF8F3',
                    100: '#F9EEE3',
                    200: '#F3DCC7',
                    300: '#E8C49F',
                    400: '#D9A66D',
                    500: '#C4854D',
                    600: '#A86B3A',
                    700: '#8B5A2B',
                    800: '#6B4423',
                    900: '#4A2C14',
                    950: '#2D1A0C',
                },
                // Vivid red-orange accent
                ember: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#E63946',
                    600: '#C41E3A',
                    700: '#A31830',
                    800: '#861326',
                    900: '#6B1020',
                },
                // Forest green secondary
                forest: {
                    50: '#F0FDF4',
                    100: '#DCFCE7',
                    200: '#BBF7D0',
                    300: '#86EFAC',
                    400: '#4ADE80',
                    500: '#22C55E',
                    600: '#2D6A4F',
                    700: '#1B4332',
                    800: '#14532D',
                    900: '#052E16',
                },
                // Ink for text
                ink: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#404040',
                    800: '#262626',
                    900: '#1A1A1A',
                    950: '#0D0D0D',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
            fontSize: {
                'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
                'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'display-sm': ['1.875rem', { lineHeight: '1.25' }],
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-warm': 'linear-gradient(135deg, var(--tw-gradient-stops))',
                'pattern-weave': "url('/assets/patterns/weave.svg')",
                'pattern-diamond': "url('/assets/patterns/diamond-grid.svg')",
            },
            boxShadow: {
                'warm': '0 4px 20px -2px rgba(196, 133, 77, 0.15)',
                'warm-lg': '0 10px 40px -4px rgba(196, 133, 77, 0.2)',
                'ember': '0 4px 20px -2px rgba(230, 57, 70, 0.25)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '128': '32rem',
                '144': '36rem',
            },
        },
    },
    plugins: [],
};
