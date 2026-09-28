import { goalsMock } from '../mocks/goals.mock'
import type { Goal } from '../types/Goal'

/** Completes one or more goals in a single API-shaped request. */
export async function completeGoals(goalIds: string[]): Promise<Goal[]> {
  const goalIdSet = new Set(goalIds)
  const completedAt = new Date().toISOString()
  const updatedGoals = goalsMock.filter((goal) => goalIdSet.has(goal.id))

  if (updatedGoals.length !== goalIdSet.size)
    throw new Error('Uma ou mais metas não foram encontradas.')

  updatedGoals.forEach((goal) => {
    goal.status = 'completed'
    goal.completedAt = completedAt
  })

  return updatedGoals
}
