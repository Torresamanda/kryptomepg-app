import { timelineEventsMock } from '../mocks/timelineEvents.mock'
import type { TimelinePage } from '../types/TimelineEvent'

interface GetTimelineEventsOptions {
  cursor?: string
  limit: number
}

/**
 * Returns timeline events ordered from newest to oldest.
 *
 * The mock mirrors the future authenticated API, which will use an opaque cursor for pagination.
 */
export async function getTimelineEvents({
  cursor,
  limit,
}: GetTimelineEventsOptions): Promise<TimelinePage> {
  const sortedEvents = [...timelineEventsMock].sort(
    (first, second) => Date.parse(second.occurredAt) - Date.parse(first.occurredAt),
  )
  const startIndex = cursor ? sortedEvents.findIndex((event) => event.id === cursor) + 1 : 0
  const events = sortedEvents.slice(Math.max(startIndex, 0), Math.max(startIndex, 0) + limit)
  const hasMoreEvents = startIndex + events.length < sortedEvents.length

  return {
    events,
    nextCursor: hasMoreEvents ? (events.at(-1)?.id ?? null) : null,
  }
}
