'use client'

import { NewExperienceDrawer } from '@/features/experiencias/components/NewExperienceDrawer'
import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'

export function AppNavigation() {
  const newExperienceDrawer = useQueryDrawer('new-experience')

  return (
    <>
      <DesktopNavigation />
      <MobileNavigation onAddExperience={newExperienceDrawer.open} />
      <NewExperienceDrawer open={newExperienceDrawer.isOpen} onClose={newExperienceDrawer.close} />
    </>
  )
}
