'use client'

import type { ReactNode } from 'react'
import { Drawer } from '@/components/ui/Drawer'

interface NewExperienceDrawerProps {
  open: boolean
  onClose: () => void
  children?: ReactNode
}

export function NewExperienceDrawer({ children, open, onClose }: NewExperienceDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      eyebrow="ADICIONAR"
      title="Nova experiência"
      description="O formulário para adicionar jogos e livros será construído nesta área."
    >
      {children}
    </Drawer>
  )
}
