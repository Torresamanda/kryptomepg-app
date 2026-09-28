import { createMonthlyActivityMock } from '../mocks/monthlyActivity.mock'
import type { MonthlyActivity } from '../types/MonthlyActivity'

const yearMonthPattern = /^\d{4}-(0[1-9]|1[0-2])$/

/**
 * Returns the authenticated user's activity aggregation for one calendar month.
 *
 * The current mock keeps the same contract that the future API will expose. The API must
 * identify the user from the authenticated session and receive only the requested month.
 */
export async function getMonthlyActivity(month: string): Promise<MonthlyActivity> {
  if (!yearMonthPattern.test(month)) {
    throw new Error('O mês deve usar o formato YYYY-MM.')
  }

  return createMonthlyActivityMock(month)
}
