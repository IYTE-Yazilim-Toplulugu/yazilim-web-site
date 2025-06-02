"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export type Theme = "light" | "dark" | "system"
export type ColorTheme = "default" | "ocean" | "forest" | "sunset" | "lavender" | "monochrome"

export interface ExtendedThemeProviderProps extends ThemeProviderProps {
    children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: ExtendedThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false)

    // useEffect only runs on the client, so we can safely show the UI
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch
    if (!mounted) {
        return <div style={{ visibility: "hidden" }}>{children}</div>
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Custom hook to manage both theme mode and color theme
export function useExtendedTheme() {
    // Use the useTheme hook from next-themes directly
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [colorTheme, setColorTheme] = React.useState<ColorTheme>("default")

    // Initialize color theme from localStorage on mount
    React.useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return

        const savedColorTheme = localStorage.getItem("color-theme") as ColorTheme | null
        if (savedColorTheme) {
            setColorTheme(savedColorTheme)
            document.documentElement.classList.add(`theme-${savedColorTheme}`)
        }
    }, [])

    // Function to update color theme
    const updateColorTheme = React.useCallback((newColorTheme: ColorTheme) => {
        // Only run on client
        if (typeof window === "undefined") return

        // Remove all existing theme classes
        document.documentElement.classList.remove(
            "theme-default",
            "theme-ocean",
            "theme-forest",
            "theme-sunset",
            "theme-lavender",
            "theme-monochrome",
        )

        // Add the new theme class if it's not default
        if (newColorTheme !== "default") {
            document.documentElement.classList.add(`theme-${newColorTheme}`)
        }

        // Save to localStorage
        localStorage.setItem("color-theme", newColorTheme)
        setColorTheme(newColorTheme)
    }, [])

    return {
        theme: theme as Theme,
        setTheme,
        resolvedTheme: resolvedTheme as Theme,
        colorTheme,
        setColorTheme: updateColorTheme,
    }
}
