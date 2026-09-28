'use client'

import { PlusIcon } from '@/assets/icons'
import { Button } from '@/components/ui/Button'
import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'

interface JourneyWelcomeProps {
  userName: string
}

export function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return 'Bom dia'
  if (hour >= 12 && hour < 18) return 'Boa tarde'

  return 'Boa noite'
}

export function JourneyWelcome({ userName }: JourneyWelcomeProps) {
  const newExperienceDrawer = useQueryDrawer('new-experience')
  const greeting = getGreeting(new Date().getHours())

  return (
    <section className="flex items-center justify-between gap-4" aria-labelledby="journey-welcome">
      <h1
        id="journey-welcome"
        className="font-memory text-2xl leading-tight text-text-primary sm:text-3xl"
      >
        {`${greeting}, ${userName}`}
      </h1>

      <Button className="hidden shrink-0 gap-2 md:inline-flex" onClick={newExperienceDrawer.open}>
        <PlusIcon size={20} weight="bold" aria-hidden="true" />
        Nova experiência
      </Button>
    </section>
  )
}
