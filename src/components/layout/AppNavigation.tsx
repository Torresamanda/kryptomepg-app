'use client'

import { useState } from 'react'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { NewExperienceDrawer } from './NewExperienceDrawer'

export function AppNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <DesktopNavigation />
      <MobileNavigation onAddExperience={() => setIsDrawerOpen(true)} />
      <NewExperienceDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
