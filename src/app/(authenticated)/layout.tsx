import type { ReactNode } from 'react'
import { AppNavigation } from '@/components/layout/AppNavigation'
import { DrawerStackProvider } from '@/context/DrawerStackContext/DrawerStackContext'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <DrawerStackProvider>
      <AppNavigation />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
    </DrawerStackProvider>
  )
}
