import { describe, expect, it } from 'vitest'
import { getTimelineEvents } from '@/features/timeline/services/getTimelineEvents'

describe('timeline service', () => {
  it('returns the newest events up to the requested limit', async () => {
    const timeline = await getTimelineEvents({ limit: 4 })

    expect(timeline.events).toHaveLength(4)
    expect(timeline.events[0].id).toBe('timeline-6')
    expect(timeline.nextCursor).toBe('timeline-3')
  })

  it('uses the cursor to return the next page of events', async () => {
    const timeline = await getTimelineEvents({ limit: 4, cursor: 'timeline-3' })

    expect(timeline.events.map((event) => event.id)).toEqual(['timeline-2', 'timeline-1'])
    expect(timeline.nextCursor).toBeNull()
  })
})
