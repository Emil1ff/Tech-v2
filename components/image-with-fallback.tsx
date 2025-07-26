"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageOff } from "lucide-react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackText?: string
}

export function ImageWithFallback({ src, alt, width, height, className = "", fallbackText }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`} style={{ width, height }}>
        <div className="text-center text-muted-foreground">
          <ImageOff className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">{fallbackText || "Şəkil yüklənmədi"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 bg-muted animate-pulse ${className}`} style={{ width, height }} />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
