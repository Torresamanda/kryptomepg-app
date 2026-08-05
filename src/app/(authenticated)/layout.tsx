import type { ReactNode } from 'react'
import { AppNavigation } from '@/components/layout/AppNavigation'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <>
      <AppNavigation />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
    </>
  )
}
