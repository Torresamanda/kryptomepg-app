'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { MagnifyingGlassIcon } from '@/assets/icons'

interface SearchInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label: string
}

/** A controlled search field with a consistent icon, focus state, and accessible label. */
export function SearchInput({ className, label, ...props }: SearchInputProps) {
  const classes = [
    'min-h-12 w-full rounded-sm border border-border-default bg-surface-default py-2 pl-12 pr-3 text-lg text-text-primary outline-none transition-colors placeholder:text-text-muted',
    'hover:border-text-muted focus-visible:border-brand-gold-400 focus-visible:ring-2 focus-visible:ring-brand-gold-400/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-6 -translate-y-1/2 text-text-muted"
      />
      <input type="search" className={classes} {...props} />
    </label>
  )
}
