"use client"

import { useState, useEffect, useRef } from "react"

interface PerformanceMetrics {
  fps: number
  memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
  loadTime: number
  resourceCount: number
  domNodes: number
  renderTime: number
}

export function usePerformanceMonitor(enabled = true) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: undefined,
    loadTime: 0,
    resourceCount: 0,
    domNodes: 0,
    renderTime: 0,
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(performance.now())
  const renderStartTimeRef = useRef<number>(performance.now())

  // Calculate FPS
  useEffect(() => {
    if (!enabled) return

    const calculateFPS = () => {
      const now = performance.now()
      frameCountRef.current += 1

      // Update FPS every second
      if (now - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current))

        // Get memory info if available
        let memory
        if (performance && (performance as any).memory) {
          const memoryInfo = (performance as any).memory
          memory = {
            usedJSHeapSize: memoryInfo.usedJSHeapSize,
            totalJSHeapSize: memoryInfo.totalJSHeapSize,
            jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
          }
        }

        // Count DOM nodes
        const domNodes = document.querySelectorAll("*").length

        // Count resources
        const resourceCount = performance.getEntriesByType("resource").length

        // Calculate page load time
        const loadTime = performance.now() - startTimeRef.current

        // Calculate render time (time since component mounted)
        const renderTime = performance.now() - renderStartTimeRef.current

        setMetrics({
          fps,
          memory,
          loadTime,
          resourceCount,
          domNodes,
          renderTime,
        })

        frameCountRef.current = 0
        lastTimeRef.current = now
      }

      animationFrameRef.current = requestAnimationFrame(calculateFPS)
    }

    animationFrameRef.current = requestAnimationFrame(calculateFPS)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [enabled])

  return metrics
}
