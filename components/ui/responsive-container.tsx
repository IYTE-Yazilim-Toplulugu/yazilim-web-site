import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
  padding?: boolean
  centered?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  maxWidth = "xl",
  padding = true,
  centered = true,
  ...props
}: ResponsiveContainerProps & React.HTMLAttributes<HTMLElement>) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  }

  return (
    <Component
      className={cn(maxWidthClasses[maxWidth], padding && "px-4 sm:px-6 lg:px-8", centered && "mx-auto", className)}
      {...props}
    >
      {children}
    </Component>
  )
}
