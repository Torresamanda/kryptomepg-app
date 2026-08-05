'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'

interface NewExperienceDrawerProps {
  open: boolean
  onClose: () => void
}

export function NewExperienceDrawer({ open, onClose }: NewExperienceDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Fechar painel de nova experiência"
        onClick={onClose}
        className={`absolute inset-0 bg-background-primary/70 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Nova experiência"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border-default bg-surface-default p-6 shadow-2xl transition-transform duration-300 ease-out sm:p-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-memory text-sm text-brand-purple-400">ADICIONAR</p>
            <h2 className="mt-1 text-2xl font-semibold text-text-primary">Nova experiência</h2>
          </div>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </Button>
        </div>

        <p className="mt-6 text-sm leading-6 text-text-secondary">
          O formulário para adicionar jogos e livros será construído nesta área.
        </p>
      </aside>
    </div>
  )
}
