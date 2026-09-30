'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@/assets/icons'
import type { TimelineEvent } from '../types/TimelineEvent'
import { TimelineEventsList } from './TimelineEventsList'

interface TimelinePreviewCardProps {
  events: TimelineEvent[]
}

export function TimelinePreviewCard({ events }: TimelinePreviewCardProps) {
  return (
    <section
      className="flex h-full flex-col rounded-lg border border-border-default bg-background-secondary p-5 sm:p-6"
      aria-labelledby="timeline-title"
    >
      <div>
        <h2 id="timeline-title" className="text-xl font-semibold text-text-primary">
          Linha do tempo
        </h2>
        <p className="mt-1 text-xs text-text-secondary">
          Momentos importantes registrados ao longo do tempo
        </p>
      </div>

      <div className="mt-5 flex-1">
        <TimelineEventsList events={events} compact />
      </div>

      <Link
        href="/linha-do-tempo"
        className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 text-xs text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        Ver linha do tempo
        <ArrowRightIcon aria-hidden="true" />
      </Link>
    </section>
  )
}
