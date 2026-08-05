import { Suspense, type ReactNode } from 'react'
import { AppNavigation } from '@/components/layout/AppNavigation'
import { PlatformLoader } from '@/components/ui/PlatformLoader'
import { DrawerStackProvider } from '@/context/DrawerStackContext/DrawerStackContext'
import { NavigationLoadingProvider } from '@/context/NavigationLoadingContext/NavigationLoadingContext'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <Suspense fallback={<PlatformLoader />}>
      <AuthenticatedContent>{children}</AuthenticatedContent>
    </Suspense>
  )
}

async function AuthenticatedContent({ children }: AuthenticatedLayoutProps) {
  const user = await getCurrentUser()

  return (
    <NavigationLoadingProvider>
      <DrawerStackProvider>
        <AppNavigation user={user} />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
      </DrawerStackProvider>
    </NavigationLoadingProvider>
  )
}
