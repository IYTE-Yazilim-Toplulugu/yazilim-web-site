"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsClient } from "@/hooks/use-is-client"

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  aspectRatio?: number
  loadingColor?: string
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/placeholder.svg",
  aspectRatio,
  className,
  loadingColor,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const isClient = useIsClient()

  // Calculate aspect ratio for the container
  const containerStyle = aspectRatio ? { paddingBottom: `${(1 / aspectRatio) * 100}%` } : undefined

  // Check if the image is already in the browser cache
  useEffect(() => {
    if (!isClient) return

    // Reset states when src changes
    setIsLoaded(false)
    setError(false)

    // Check if image is cached
    const img = new Image()
    img.src = src as string

    // If the image is complete immediately, it's likely cached
    if (img.complete) {
      setIsLoaded(true)
    }

    return () => {
      // Clean up
      img.onload = null
      img.onerror = null
    }
  }, [src, isClient])

  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!isClient || !imageRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the image comes into view, start loading it
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              delete img.dataset.src
            }
            observer.unobserve(img)
          }
        })
      },
      { rootMargin: "200px" }, // Start loading when image is 200px from viewport
    )

    observer.observe(imageRef.current)

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [isClient])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    console.error(`Failed to load image: ${src}`)
  }

  // If not client-side, render a placeholder
  if (!isClient) {
    return (
      <div className={cn("relative overflow-hidden bg-muted", className)} style={containerStyle}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={containerStyle}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full" style={loadingColor ? { backgroundColor: loadingColor } : undefined} />
        </div>
      )}

      <Image
        ref={imageRef}
        src={error ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0")}
        {...props}
      />
    </div>
  )
}
