"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { useProgressiveLoading } from "@/components/progressive-loading-provider"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  sectionName: string
  className?: string
  skeletonComponent: React.ReactNode
  priority?: number // Lower number = higher priority
}

export function SectionWrapper({
  children,
  sectionName,
  className,
  skeletonComponent,
  priority = 5,
}: SectionWrapperProps) {
  const { loadedSections, setLoaded } = useProgressiveLoading()
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [shouldRender, setShouldRender] = useState(false)

  // Determine if this section should be loaded
  useEffect(() => {
    // If it's a high priority section, load it immediately
    if (priority <= 2) {
      setShouldRender(true)
      return
    }

    // Otherwise, load when in view
    if (isInView) {
      // Add a small delay for smoother transitions
      const timer = setTimeout(() => {
        setShouldRender(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isInView, priority])

  // Mark section as loaded when rendered
  useEffect(() => {
    if (shouldRender && sectionName in loadedSections) {
      // Add a small delay to account for actual rendering
      const timer = setTimeout(() => {
        setLoaded(sectionName as any)
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [shouldRender, sectionName, setLoaded, loadedSections])

  return (
    <div ref={setRef} className={cn(className)}>
      {shouldRender ? children : skeletonComponent}
    </div>
  )
}
