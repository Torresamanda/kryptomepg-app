import { goalsMock } from '../mocks/goals.mock'
import type { Goal } from '../types/Goal'

export async function getRecentGoals(limit = 5): Promise<Goal[]> {
  return [...goalsMock]
    .sort((first, second) => second.createdAt.localeCompare(first.createdAt))
    .slice(0, limit)
}
