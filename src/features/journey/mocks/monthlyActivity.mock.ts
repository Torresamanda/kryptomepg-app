import type { MonthlyActivity } from '../types/MonthlyActivity'

const recordCounts = [
  { count: 1, day: 1 },
  { count: 1, day: 2 },
  { count: 2, day: 3 },
  { count: 1, day: 4 },
  { count: 1, day: 5 },
  { count: 2, day: 6 },
  { count: 1, day: 7 },
  { count: 2, day: 8 },
  { count: 2, day: 10 },
  { count: 2, day: 11 },
  { count: 2, day: 12 },
  { count: 2, day: 13 },
  { count: 2, day: 14 },
  { count: 2, day: 15 },
]

export function createMonthlyActivityMock(month: string): MonthlyActivity {
  return {
    month,
    timeZone: 'America/Sao_Paulo',
    summary: {
      activeDays: 14,
      longestStreak: 8,
      totalRecords: 23,
    },
    dailyRecords: recordCounts.map(({ count, day }) => ({
      count,
      date: `${month}-${String(day).padStart(2, '0')}`,
    })),
  }
}
