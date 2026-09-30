'use client'

import { useEffect, useRef, useState } from 'react'
import { FadersIcon, XIcon } from '@/assets/icons'

export interface FilterOption {
  label: string
  value: string
}

interface FilterMenuProps {
  clearValue?: string
  label?: string
  onChange: (value: string) => void
  options: FilterOption[]
  value: string
}

/** A reusable compact filter control with a button and an accessible options menu. */
export function FilterMenu({
  clearValue,
  label = 'Filtros',
  onChange,
  options,
  value,
}: FilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((option) => option.value === value)
  const canClear = clearValue !== undefined && value !== clearValue

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={rootRef} className="relative flex items-center gap-2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((current) => !current)}
        className={`inline-flex min-h-12 min-w-44 cursor-pointer items-center justify-center gap-3 rounded-sm border px-4 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold-400 ${
          canClear
            ? 'border-brand-gold-500 bg-brand-gold-500 text-background-primary hover:bg-brand-gold-400'
            : 'border-brand-gold-500 text-brand-gold-500 hover:bg-brand-gold-900/20'
        }`}
      >
        <FadersIcon size={22} aria-hidden="true" />
        {canClear ? selectedOption?.label : label}
      </button>

      {canClear && (
        <button
          type="button"
          onClick={() => onChange(clearValue)}
          aria-label="Limpar filtros"
          className="absolute -bottom-2 -right-2 z-20 flex size-6 cursor-pointer items-center justify-center rounded-full border border-brand-gold-500 bg-surface-default text-brand-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold-400"
        >
          <XIcon size={14} aria-hidden="true" />
        </button>
      )}

      {isOpen && (
        <div
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full z-10 mt-4 min-w-44 rounded-sm border border-border-default bg-surface-default p-1 shadow-lg"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={option.value === value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`flex w-full cursor-pointer rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-border-focus ${
                option.value === value ? 'text-brand-gold-400' : 'text-text-secondary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
