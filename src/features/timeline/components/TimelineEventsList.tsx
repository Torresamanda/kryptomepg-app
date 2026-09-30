import type { TimelineEvent } from '../types/TimelineEvent'
import { TimelineItem } from './TimelineItem'

interface TimelineEventsListProps {
  compact?: boolean
  events: TimelineEvent[]
}

export function TimelineEventsList({ compact = false, events }: TimelineEventsListProps) {
  if (events.length === 0) {
    return <p className="text-sm text-text-secondary">Nenhum momento registrado ainda.</p>
  }

  return (
    <ol
      className={`relative before:absolute before:w-0.5 before:bg-brand-purple-500 ${
        compact
          ? 'space-y-0 before:bottom-2 before:left-2.5 before:top-2'
          : 'space-y-1 before:bottom-4 before:left-4 before:top-4'
      }`}
    >
      {events.map((event) => (
        <TimelineItem key={event.id} event={event} compact={compact} />
      ))}
    </ol>
  )
}
