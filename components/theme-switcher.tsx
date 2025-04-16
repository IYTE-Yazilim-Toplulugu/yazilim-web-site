"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useExtendedTheme, type ColorTheme, type Theme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Sun, Moon, Laptop, Palette, Check } from "lucide-react"

interface ThemeOption {
  value: Theme
  label: string
  icon: React.ReactNode
}

interface ColorOption {
  value: ColorTheme
  label: string
  color: string
  darkColor: string
}

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-5 w-5" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-5 w-5" />,
  },
  {
    value: "system",
    label: "System",
    icon: <Laptop className="h-5 w-5" />,
  },
]

const colorOptions: ColorOption[] = [
  {
    value: "default",
    label: "Default",
    color: "from-[#d6665d] to-[#db8b40]",
    darkColor: "from-[#d6665d] to-[#db8b40]",
  },
  {
    value: "ocean",
    label: "Ocean",
    color: "from-blue-500 to-cyan-500",
    darkColor: "from-blue-600 to-cyan-600",
  },
  {
    value: "forest",
    label: "Forest",
    color: "from-green-500 to-emerald-500",
    darkColor: "from-green-600 to-emerald-600",
  },
  {
    value: "sunset",
    label: "Sunset",
    color: "from-orange-500 to-red-500",
    darkColor: "from-orange-600 to-red-600",
  },
  {
    value: "lavender",
    label: "Lavender",
    color: "from-purple-500 to-pink-500",
    darkColor: "from-purple-600 to-pink-600",
  },
  {
    value: "monochrome",
    label: "Monochrome",
    color: "from-gray-400 to-gray-600",
    darkColor: "from-gray-600 to-gray-800",
  },
]

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme, colorTheme, setColorTheme } = useExtendedTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"mode" | "color">("mode")
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative overflow-hidden">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden border-border bg-background hover:bg-accent/10"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-golden-nugget" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-bite-tongue" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[240px] p-0">
        <div className="p-1">
          <Tabs
            defaultValue="mode"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "mode" | "color")}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="mode" className="text-xs">
                Mode
              </TabsTrigger>
              <TabsTrigger value="color" className="text-xs">
                <Palette className="h-3.5 w-3.5 mr-1" />
                Color
              </TabsTrigger>
            </TabsList>
            <div className="p-4 pt-2">
              {activeTab === "mode" ? (
                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme(option.value)}
                      className={cn("justify-start gap-1", theme === option.value && "border-primary bg-primary/10")}
                    >
                      {option.icon}
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setColorTheme(option.value)}
                      className="relative flex flex-col items-center justify-center p-1 rounded-md hover:bg-muted transition-colors"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full bg-gradient-to-br",
                          isDark ? option.darkColor : option.color,
                        )}
                      />
                      <span className="text-xs mt-1">{option.label}</span>
                      {colorTheme === option.value && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-0 right-0 bg-primary text-primary-foreground rounded-full p-0.5"
                        >
                          <Check className="h-3 w-3" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
