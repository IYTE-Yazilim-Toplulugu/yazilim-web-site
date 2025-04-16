"use client"

import { useExtendedTheme, type Theme, type ColorTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function useThemeContext() {
  const { theme, setTheme, resolvedTheme, colorTheme, setColorTheme } = useExtendedTheme()
  const [mounted, setMounted] = useState(false)
  const [themeTransitioning, setThemeTransitioning] = useState(false)

  // After mounting, we can safely access theme information
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add transition effect when changing themes
  const changeTheme = (newTheme: Theme) => {
    setThemeTransitioning(true)
    setTheme(newTheme)

    // Reset transition state after animation completes
    setTimeout(() => {
      setThemeTransitioning(false)
    }, 300)
  }

  // Add transition effect when changing color themes
  const changeColorTheme = (newColorTheme: ColorTheme) => {
    setThemeTransitioning(true)
    setColorTheme(newColorTheme)

    // Reset transition state after animation completes
    setTimeout(() => {
      setThemeTransitioning(false)
    }, 300)
  }

  return {
    theme: theme as Theme,
    setTheme: changeTheme,
    resolvedTheme: resolvedTheme as Theme,
    colorTheme,
    setColorTheme: changeColorTheme,
    mounted,
    themeTransitioning,
  }
}
