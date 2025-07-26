"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ImageIcon } from "lucide-react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackText?: string
}

export function ImageWithFallback({ src, alt, className, fallbackText }: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <div className="text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{fallbackText || "Şəkil yüklənə bilmədi"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-muted ${className}`}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </motion.div>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}
