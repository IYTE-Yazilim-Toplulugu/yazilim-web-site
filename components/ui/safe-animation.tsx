"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, type MotionProps } from "framer-motion"
import { useIsClient } from "@/hooks/use-is-client"

interface SafeAnimationProps extends MotionProps {
  children: React.ReactNode
  as?: React.ElementType
  disableOnLowFPS?: boolean
  disableOnMobile?: boolean
  className?: string
}

export function SafeAnimation({
  children,
  as = "div",
  disableOnLowFPS = true,
  disableOnMobile = true,
  className,
  ...motionProps
}: SafeAnimationProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const isClient = useIsClient()
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number | null>(null)

  // Check if animations should be disabled
  useEffect(() => {
    if (!isClient) return

    // Check for mobile devices
    if (disableOnMobile) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) {
        setShouldAnimate(false)
        return
      }
    }

    // Check for low FPS
    if (disableOnLowFPS) {
      let lowFPSCounter = 0

      const checkFPS = () => {
        const now = performance.now()
        frameCountRef.current += 1

        // Calculate FPS every second
        if (now - lastTimeRef.current >= 1000) {
          const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current))

          // If FPS is consistently low, disable animations
          if (fps < 30) {
            lowFPSCounter += 1
            if (lowFPSCounter >= 3) {
              setShouldAnimate(false)
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
              }
              return
            }
          } else {
            lowFPSCounter = 0
          }

          frameCountRef.current = 0
          lastTimeRef.current = now
        }

        animationFrameRef.current = requestAnimationFrame(checkFPS)
      }

      animationFrameRef.current = requestAnimationFrame(checkFPS)

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isClient, disableOnLowFPS, disableOnMobile])

  // If not client-side or animations should be disabled, render without animation
  if (!isClient || !shouldAnimate) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  // Otherwise, render with animations
  const MotionComponent = motion[as as keyof typeof motion] || motion.div

  return (
    <MotionComponent className={className} {...motionProps}>
      {children}
    </MotionComponent>
  )
}
