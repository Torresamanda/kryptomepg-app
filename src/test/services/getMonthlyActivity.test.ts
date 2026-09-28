import { describe, expect, it } from 'vitest'
import { getMonthlyActivity } from '@/features/journey/services/getMonthlyActivity'

describe('getMonthlyActivity', () => {
  it('returns activity for the requested month', async () => {
    const activity = await getMonthlyActivity('2026-07')

    expect(activity.month).toBe('2026-07')
    expect(activity.summary).toEqual({
      activeDays: 14,
      longestStreak: 8,
      totalRecords: 23,
    })
    expect(activity.dailyRecords).toHaveLength(14)
  })

  it('rejects an invalid month format', async () => {
    await expect(getMonthlyActivity('2026-13')).rejects.toThrow(
      'O mês deve usar o formato YYYY-MM.',
    )
  })
})
