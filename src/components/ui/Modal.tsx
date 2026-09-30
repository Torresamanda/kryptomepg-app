'use client'

import { useEffect, useId, useRef, type ReactNode } from 'react'
import { XIcon } from '@/assets/icons'
import { useDrawerStack } from '@/context/DrawerStackContext/DrawerStackContext'
import { Button } from './Button'

interface ModalProps {
  children?: ReactNode
  description?: string
  eyebrow?: string
  onClose: () => void
  open: boolean
  size?: 'default' | 'wide'
  title: string
}

export function Modal({
  children,
  description,
  eyebrow,
  onClose,
  open,
  size = 'default',
  title,
}: ModalProps) {
  const modalId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { getDrawerIndex, isTopDrawer, registerDrawer, unregisterDrawer } = useDrawerStack()
  const isTop = isTopDrawer(modalId)
  const modalIndex = getDrawerIndex(modalId)

  useEffect(() => {
    if (!open) return

    registerDrawer(modalId)
    return () => unregisterDrawer(modalId)
  }, [modalId, open, registerDrawer, unregisterDrawer])

  useEffect(() => {
    if (!open || !isTop) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    closeButtonRef.current?.focus()
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTop, onClose, open])

  const isInteractive = open && isTop

  return (
    <div
      className={`fixed inset-0 ${isInteractive ? '' : 'pointer-events-none'}`}
      aria-hidden={!isInteractive}
      style={{ zIndex: 50 + Math.max(modalIndex, 0) * 10 }}
    >
      <button
        type="button"
        aria-label={`Fechar modal: ${title}`}
        onClick={onClose}
        className={`absolute inset-0 bg-background-primary/70 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <section
        role="dialog"
        aria-modal={isTop || undefined}
        aria-label={title}
        className={`modal-scrollbar absolute inset-x-3 top-1/2 mx-auto max-h-[calc(100dvh-1.5rem)] w-auto ${size === 'wide' ? 'max-w-2xl' : 'max-w-md'} -translate-y-1/2 overflow-y-auto overscroll-contain rounded-lg border border-border-default bg-surface-default p-4 shadow-2xl transition-[opacity,transform] duration-200 ease-out sm:inset-x-4 sm:max-h-[calc(100dvh-2rem)] sm:p-8 ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            {eyebrow && <p className="font-memory text-sm text-brand-purple-400">{eyebrow}</p>}
            <h2 className="mt-1 text-2xl font-semibold text-text-primary">{title}</h2>
          </div>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              <XIcon />
            </span>
          </Button>
        </div>

        {description && <p className="mt-6 text-sm leading-6 text-text-secondary">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </section>
    </div>
  )
}
