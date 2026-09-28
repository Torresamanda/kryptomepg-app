'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  sizes?: string
  src: string | null
}

export function ImageWithFallback({
  alt,
  className,
  loading,
  sizes = '100vw',
  src,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const imageSrc = hasError || !src ? '/not-found.png' : src

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      loading={loading}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  )
}
