"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type SectionName =
  | "hero"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "caseStudies"
  | "education"
  | "publications"
  | "testimonials"
  | "blog"
  | "contact"

interface ProgressiveLoadingContextType {
  loadedSections: Record<SectionName, boolean>
  setLoaded: (section: SectionName) => void
  isLoading: boolean
  progress: number
}

const ProgressiveLoadingContext = createContext<ProgressiveLoadingContextType | undefined>(undefined)

export function ProgressiveLoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadedSections, setLoadedSections] = useState<Record<SectionName, boolean>>({
    hero: false,
    about: false,
    skills: false,
    experience: false,
    projects: false,
    caseStudies: false,
    education: false,
    publications: false,
    testimonials: false,
    blog: false,
    contact: false,
  })

  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const setLoaded = (section: SectionName) => {
    setLoadedSections((prev) => ({ ...prev, [section]: true }))
  }

  // Calculate loading progress
  useEffect(() => {
    const totalSections = Object.keys(loadedSections).length
    const loadedCount = Object.values(loadedSections).filter(Boolean).length
    const newProgress = Math.round((loadedCount / totalSections) * 100)

    setProgress(newProgress)

    if (newProgress === 100) {
      // Add a small delay before setting loading to false
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [loadedSections])

  // Simulate initial loading of critical sections
  useEffect(() => {
    // Prioritize loading the hero section
    const timer1 = setTimeout(() => setLoaded("hero"), 300)
    const timer2 = setTimeout(() => setLoaded("about"), 600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <ProgressiveLoadingContext.Provider value={{ loadedSections, setLoaded, isLoading, progress }}>
      {children}
    </ProgressiveLoadingContext.Provider>
  )
}

export function useProgressiveLoading() {
  const context = useContext(ProgressiveLoadingContext)
  if (context === undefined) {
    throw new Error("useProgressiveLoading must be used within a ProgressiveLoadingProvider")
  }
  return context
}
