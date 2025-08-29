import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            },
        },
        extend: {

            // ===== ADMIN PANEL VARIABLES =====
            fontFamily: {
                outfit: ['var(--font-outfit)'],
            },
            screens: {
                '2xsm': '375px',
                'xsm': '425px',
                '3xl': '2000px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            fontSize: {
                'title-2xl': ['var(--text-title-2xl)', { lineHeight: 'var(--text-title-2xl--line-height)' }],
                'title-xl': ['var(--text-title-xl)', { lineHeight: 'var(--text-title-xl--line-height)' }],
                'title-lg': ['var(--text-title-lg)', { lineHeight: 'var(--text-title-lg--line-height)' }],
                'title-md': ['var(--text-title-md)', { lineHeight: 'var(--text-title-md--line-height)' }],
                'title-sm': ['var(--text-title-sm)', { lineHeight: 'var(--text-title-sm--line-height)' }],
                'theme-xl': ['var(--text-theme-xl)', { lineHeight: 'var(--text-theme-xl--line-height)' }],
                'theme-sm': ['var(--text-theme-sm)', { lineHeight: 'var(--text-theme-sm--line-height)' }],
                'theme-xs': ['var(--text-theme-xs)', { lineHeight: 'var(--text-theme-xs--line-height)' }],
            },
            // ====== ADMIN PANEL VARIABLES ======


            colors: {
                // ==== ADMIN THEME COLORS ====
                current: 'var(--color-current)',
                transparent: 'var(--color-transparent)',
                white: 'var(--color-white)',
                black: 'var(--color-black)',

                brand: {
                    25: 'var(--color-brand-25)',
                    50: 'var(--color-brand-50)',
                    100: 'var(--color-brand-100)',
                    200: 'var(--color-brand-200)',
                    300: 'var(--color-brand-300)',
                    400: 'var(--color-brand-400)',
                    500: 'var(--color-brand-500)',
                    600: 'var(--color-brand-600)',
                    700: 'var(--color-brand-700)',
                    800: 'var(--color-brand-800)',
                    900: 'var(--color-brand-900)',
                    950: 'var(--color-brand-950)',
                },
                'blue-light': {
                    25: 'var(--color-blue-light-25)',
                    50: 'var(--color-blue-light-50)',
                    100: 'var(--color-blue-light-100)',
                    200: 'var(--color-blue-light-200)',
                    300: 'var(--color-blue-light-300)',
                    400: 'var(--color-blue-light-400)',
                    500: 'var(--color-blue-light-500)',
                    600: 'var(--color-blue-light-600)',
                    700: 'var(--color-blue-light-700)',
                    800: 'var(--color-blue-light-800)',
                    900: 'var(--color-blue-light-900)',
                    950: 'var(--color-blue-light-950)',
                },
                gray: {
                    25: 'var(--color-gray-25)',
                    50: 'var(--color-gray-50)',
                    100: 'var(--color-gray-100)',
                    200: 'var(--color-gray-200)',
                    300: 'var(--color-gray-300)',
                    400: 'var(--color-gray-400)',
                    500: 'var(--color-gray-500)',
                    600: 'var(--color-gray-600)',
                    700: 'var(--color-gray-700)',
                    800: 'var(--color-gray-800)',
                    900: 'var(--color-gray-900)',
                    950: 'var(--color-gray-950)',
                    dark: 'var(--color-gray-dark)',
                },
                orange: {
                    25: 'var(--color-orange-25)',
                    50: 'var(--color-orange-50)',
                    100: 'var(--color-orange-100)',
                    200: 'var(--color-orange-200)',
                    300: 'var(--color-orange-300)',
                    400: 'var(--color-orange-400)',
                    500: 'var(--color-orange-500)',
                    600: 'var(--color-orange-600)',
                    700: 'var(--color-orange-700)',
                    800: 'var(--color-orange-800)',
                    900: 'var(--color-orange-900)',
                    950: 'var(--color-orange-950)',
                },
                success: {
                    25: 'var(--color-success-25)',
                    50: 'var(--color-success-50)',
                    100: 'var(--color-success-100)',
                    200: 'var(--color-success-200)',
                    300: 'var(--color-success-300)',
                    400: 'var(--color-success-400)',
                    500: 'var(--color-success-500)',
                    600: 'var(--color-success-600)',
                    700: 'var(--color-success-700)',
                    800: 'var(--color-success-800)',
                    900: 'var(--color-success-900)',
                    950: 'var(--color-success-950)',
                },
                error: {
                    25: 'var(--color-error-25)',
                    50: 'var(--color-error-50)',
                    100: 'var(--color-error-100)',
                    200: 'var(--color-error-200)',
                    300: 'var(--color-error-300)',
                    400: 'var(--color-error-400)',
                    500: 'var(--color-error-500)',
                    600: 'var(--color-error-600)',
                    700: 'var(--color-error-700)',
                    800: 'var(--color-error-800)',
                    900: 'var(--color-error-900)',
                    950: 'var(--color-error-950)',
                },
                warning: {
                    25: 'var(--color-warning-25)',
                    50: 'var(--color-warning-50)',
                    100: 'var(--color-warning-100)',
                    200: 'var(--color-warning-200)',
                    300: 'var(--color-warning-300)',
                    400: 'var(--color-warning-400)',
                    500: 'var(--color-warning-500)',
                    600: 'var(--color-warning-600)',
                    700: 'var(--color-warning-700)',
                    800: 'var(--color-warning-800)',
                    900: 'var(--color-warning-900)',
                    950: 'var(--color-warning-950)',
                },
                'theme-pink': {
                    500: 'var(--color-theme-pink-500)',
                },
                'theme-purple': {
                    500: 'var(--color-theme-purple-500)',
                },


                // ==== WWW THEME COLORS ====
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                // Custom color palette
                happy_hearts: "#d6665d",
                bite_tongue: "#dd796b",
                copper_coin: "#dd845b",
                golden_nugget: "#db8b40",
                packing_paper: "#b99b61",
                succulent: "#8fa781",
                estragon: "#a7ad77",
                motherland: "#beb26c",
                luxurious: "#d4b35f",
            },

            // ===== ADMIN PANEL VARIABLES =====
            boxShadow: {
                'theme-md': 'var(--shadow-theme-md)',
                'theme-lg': 'var(--shadow-theme-lg)',
                'theme-sm': 'var(--shadow-theme-sm)',
                'theme-xs': 'var(--shadow-theme-xs)',
                'theme-xl': 'var(--shadow-theme-xl)',
                'datepicker': 'var(--shadow-datepicker)',
                'focus-ring': 'var(--shadow-focus-ring)',
                'slider-navigation': 'var(--shadow-slider-navigation)',
                'tooltip': 'var(--shadow-tooltip)',
                '4xl': 'var(--drop-shadow-4xl)',
            },
            zIndex: {
                1: 'var(--z-index-1)',
                9: 'var(--z-index-9)',
                99: 'var(--z-index-99)',
                999: 'var(--z-index-999)',
                9999: 'var(--z-index-9999)',
                99999: 'var(--z-index-99999)',
                999999: 'var(--z-index-999999)',
            },
            // ====== ADMIN PANEL VARIABLES ======

            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "click-scale": {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "click-scale": 'clickScale 0.2s ease-in-out', // might be useful
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("tailwind-scrollbar"),
        require('@tailwindcss/typography'),

        // ADMIN PANEL PLUGIN
        plugin(function ({ addUtilities, addComponents, addBase, theme }) {
            // 1. Base styles (@layer base)
            addBase({
                '*, ::after, ::before, ::backdrop, ::file-selector-button': {
                    borderColor: theme('colors.gray.200', 'currentColor'),
                },
                'button:not(:disabled), [role="button"]:not(:disabled)': {
                    cursor: 'pointer',
                },
                'body': {
                    position: 'relative',
                    fontWeight: '400', // font-normal
                    fontFamily: theme('fontFamily.outfit').join(','),
                    zIndex: '1',
                    backgroundColor: theme('colors.gray.50'),
                },
            });

            // 2. Custom utilities (@layer utilities)
            addUtilities({
                // no-scrollbar
                '.no-scrollbar::-webkit-scrollbar': {
                    display: 'none',
                },
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',  // IE and Edge
                    'scrollbar-width': 'none',     // Firefox
                },

                // custom-scrollbar
                '.custom-scrollbar::-webkit-scrollbar': {
                    width: theme('spacing.1.5'),
                    height: theme('spacing.1.5'),
                },
                '.custom-scrollbar::-webkit-scrollbar-track': {
                    borderRadius: theme('borderRadius.full'),
                },
                '.custom-scrollbar::-webkit-scrollbar-thumb': {
                    backgroundColor: theme('colors.gray.200'),
                    borderRadius: theme('borderRadius.full'),
                },
                '.dark .custom-scrollbar::-webkit-scrollbar-thumb': {
                    backgroundColor: theme('colors.gray.700'),
                },

                // input date/time picker icon hide
                'input[type="date"]::-webkit-inner-spin-button, input[type="time"]::-webkit-inner-spin-button, input[type="date"]::-webkit-calendar-picker-indicator, input[type="time"]::-webkit-calendar-picker-indicator': {
                    display: 'none',
                    '-webkit-appearance': 'none',
                },

                // other utilities can be added similarly
            }, { variants: ['dark'] });

            // 3. Custom components (@layer components) or utilities for menu items, dropdowns etc
            addComponents({
                '.menu-item': {
                    '@apply relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-sm': {},
                },
                '.menu-item-active': {
                    '@apply bg-brand-50 text-brand-500 dark:bg-brand-500/12 dark:text-brand-400': {},
                },
                '.menu-item-inactive': {
                    '@apply text-gray-700 hover:bg-gray-100 group-hover:text-gray-700 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-gray-300': {},
                },
                '.menu-item-icon': {
                    '@apply text-gray-500 group-hover:text-gray-700 dark:text-gray-400': {},
                },
                '.menu-item-icon-active': {
                    '@apply text-brand-500 dark:text-brand-400': {},
                },
                '.menu-item-icon-inactive': {
                    '@apply text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300': {},
                },
                '.menu-item-arrow': {
                    '@apply relative': {},
                },
                '.menu-item-arrow-active': {
                    '@apply rotate-180 text-brand-500 dark:text-brand-400': {},
                },
                '.menu-item-arrow-inactive': {
                    '@apply text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300': {},
                },
                '.menu-dropdown-item': {
                    '@apply relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium': {},
                },
                '.menu-dropdown-item-active': {
                    '@apply bg-brand-50 text-brand-500 dark:bg-brand-500/12 dark:text-brand-400': {},
                },
                '.menu-dropdown-item-inactive': {
                    '@apply text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5': {},
                },
                '.menu-dropdown-badge': {
                    '@apply block rounded-full px-2.5 py-0.5 text-xs font-medium uppercase text-brand-500 dark:text-brand-400': {},
                },
                '.menu-dropdown-badge-active': {
                    '@apply bg-brand-100 dark:bg-brand-500/20': {},
                },
                '.menu-dropdown-badge-inactive': {
                    '@apply bg-brand-50 group-hover:bg-brand-100 dark:bg-brand-500/15 dark:group-hover:bg-brand-500/20': {},
                },
            });
        }),
    ],
} satisfies Config

export default config
