'use client'
import { Drawer } from '@/components/ui/Drawer'
export function GoalsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      eyebrow="METAS"
      title="Todas as metas"
      description="A lista completa, filtros e busca serão adicionados aqui em breve."
    />
  )
}
