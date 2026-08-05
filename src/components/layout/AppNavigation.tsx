'use client'

import { NewExperienceDrawer } from '@/features/experiencias/components/NewExperienceDrawer'
import type { CurrentUser } from '@/features/auth/types/CurrentUser'
import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'

interface AppNavigationProps {
  user: CurrentUser
}

export function AppNavigation({ user }: AppNavigationProps) {
  const newExperienceDrawer = useQueryDrawer('new-experience')

  return (
    <>
      <DesktopNavigation user={user} />
      <MobileNavigation user={user} onAddExperience={newExperienceDrawer.open} />
      <NewExperienceDrawer open={newExperienceDrawer.isOpen} onClose={newExperienceDrawer.close} />
    </>
  )
}
