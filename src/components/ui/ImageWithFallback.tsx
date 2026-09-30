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

function isExternalImage(src: string) {
  return /^https?:\/\//i.test(src)
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

  if (isExternalImage(imageSrc)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={alt}
        className={`absolute inset-0 size-full ${className ?? ''}`}
        loading={loading}
        onError={() => setHasError(true)}
      />
    )
  }

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
