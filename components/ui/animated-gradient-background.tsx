"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  className?: string
  colors?: string[]
  speed?: number
  blur?: number
  children?: React.ReactNode
}

export function AnimatedGradientBackground({
  className,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  speed = 10,
  blur = 100,
  children,
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Create gradient points
    const points = colors.map((color, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: ((Math.random() - 0.5) * speed) / 10,
      vy: ((Math.random() - 0.5) * speed) / 10,
      radius: Math.min(width, height) * (0.2 + Math.random() * 0.3),
      color,
    }))

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update points position
      points.forEach((point) => {
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1
      })

      // Create gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5,
      )

      // Add color stops
      gradient.addColorStop(0, "#00000000")
      gradient.addColorStop(1, "#00000000")

      // Fill background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw gradient blobs
      points.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        gradient.addColorStop(0, point.color + "40") // 25% opacity
        gradient.addColorStop(1, point.color + "00") // 0% opacity

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [colors, speed])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" style={{ filter: `blur(${blur}px)` }} />
      {children}
    </div>
  )
}
