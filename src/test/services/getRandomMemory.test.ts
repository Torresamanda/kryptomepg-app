import { describe, expect, it, vi } from 'vitest'
import { getRandomMemory } from '@/features/memories/services/getRandomMemory'

describe('getRandomMemory', () => {
  it('returns a completed experience', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    await expect(getRandomMemory()).resolves.toMatchObject({
      experienceId: expect.any(String),
      completedAt: expect.any(String),
    })
  })

  it('avoids the displayed memory when alternatives are available', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const memory = await getRandomMemory('book-forest-companions')

    expect(memory?.experienceId).not.toBe('book-forest-companions')
  })
})
