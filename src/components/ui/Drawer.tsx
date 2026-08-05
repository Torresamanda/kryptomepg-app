'use client'

import type { ReactNode } from 'react'
import { useEffect, useId, useRef } from 'react'
import { useDrawerStack } from '@/context/DrawerStackContext/DrawerStackContext'
import { Button } from './Button'
import { XIcon } from '@/assets/icons'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  eyebrow?: string
  children?: ReactNode
}

export function Drawer({ children, description, eyebrow, onClose, open, title }: DrawerProps) {
  const drawerId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { getDrawerIndex, isTopDrawer, registerDrawer, unregisterDrawer } = useDrawerStack()
  const isTop = isTopDrawer(drawerId)
  const drawerIndex = getDrawerIndex(drawerId)

  useEffect(() => {
    if (!open) return

    registerDrawer(drawerId)
    return () => unregisterDrawer(drawerId)
  }, [drawerId, open, registerDrawer, unregisterDrawer])

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
      style={{ zIndex: 50 + Math.max(drawerIndex, 0) * 10 }}
    >
      <button
        type="button"
        aria-label={`Fechar painel: ${title}`}
        onClick={onClose}
        className={`absolute inset-0 bg-background-primary/70 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        role="dialog"
        aria-modal={isTop || undefined}
        aria-label={title}
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border-default bg-surface-default p-6 shadow-2xl transition-transform duration-300 ease-out sm:p-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
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
            aria-label="Fechar painel"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              <XIcon />
            </span>
          </Button>
        </div>

        {description && <p className="mt-6 text-sm leading-6 text-text-secondary">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </aside>
    </div>
  )
}
