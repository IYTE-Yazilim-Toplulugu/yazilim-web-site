import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  id?: string
  className?: string
  children: React.ReactNode
  fullWidth?: boolean
  as?: React.ElementType
  style?: React.CSSProperties
}

export function SectionContainer({
  id,
  className,
  children,
  fullWidth = false,
  as: Component = "section",
  style,
  ...props
}: SectionContainerProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      id={id}
      className={cn("py-16 md:py-24", fullWidth ? "w-full" : "container mx-auto px-4", className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  titleClassName?: string
  subtitleClassName?: string
  decorative?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  titleClassName,
  subtitleClassName,
  decorative = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", `text-${align}`)}>
      <h2 className={cn("text-3xl md:text-4xl font-bold relative inline-block", titleClassName)}>
        {title}
        {decorative && (
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/20 rounded-full" />
        )}
      </h2>
      {subtitle && <p className={cn("mt-4 text-muted-foreground max-w-2xl mx-auto", subtitleClassName)}>{subtitle}</p>}
    </div>
  )
}
