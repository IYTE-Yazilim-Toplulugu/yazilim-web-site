"use client"

import type React from "react"

import { useRef, useEffect, useState, memo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export const ScrollReveal = memo(function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isClient = useIsClient()

  // Only run on client-side
  useEffect(() => {
    if (!isClient || !ref.current) return

    let observer: IntersectionObserver | null = null

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once && ref.current) {
              observer?.unobserve(ref.current)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        },
        { threshold },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }
    } catch (error) {
      console.error("Error setting up IntersectionObserver:", error)
      // Fallback: just show the content
      setIsVisible(true)
    }

    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isClient, once, threshold])

  // Define animation variants based on direction
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  // If not yet client-side, render without animation
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
})

interface StaggeredContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  childrenDelay?: number
  threshold?: number
  once?: boolean
}

export const StaggeredContainer = memo(function StaggeredContainer({
  children,
  className,
  staggerDelay = 0.1,
  childrenDelay = 0,
  threshold = 0.1,
  once = true,
}: StaggeredContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient || !ref.current) return

    let observer: IntersectionObserver | null = null

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once && ref.current) {
              observer?.unobserve(ref.current)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        },
        { threshold },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }
    } catch (error) {
      console.error("Error setting up IntersectionObserver:", error)
      // Fallback: just show the content
      setIsVisible(true)
    }

    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [isClient, once, threshold])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childrenDelay,
      },
    },
  }

  // If not yet mounted, render without animation
  if (!isClient) {
    return <div className={cn("flex flex-col", className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col", className)}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
})

export const StaggerItem = memo(function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.5,
}: {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
})
