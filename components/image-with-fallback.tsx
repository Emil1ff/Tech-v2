"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
  width?: number
  height?: number
}

export function ImageWithFallback({ src, alt, className, fallbackText, width, height }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-muted text-muted-foreground text-sm font-medium", className)}
        style={{ width, height }}
      >
        {fallbackText || alt || "Image"}
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={cn("absolute inset-0 flex items-center justify-center bg-muted animate-pulse", className)} />
      )}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(className, isLoading ? "opacity-0" : "opacity-100")}
        onError={handleError}
        onLoad={handleLoad}
        width={width}
        height={height}
      />
    </div>
  )
}
