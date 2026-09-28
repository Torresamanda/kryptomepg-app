import { goalsMock } from '../mocks/goals.mock'
import type { CreateGoalInput, Goal } from '../types/Goal'

export async function createGoal({ audience, title }: CreateGoalInput): Promise<Goal> {
  const normalizedTitle = title.trim()

  if (!normalizedTitle) throw new Error('O título da meta é obrigatório.')

  const goal: Goal = {
    id: `goal-${crypto.randomUUID()}`,
    title: normalizedTitle,
    audience,
    status: 'active',
    createdAt: new Date().toISOString(),
    completedAt: null,
  }

  goalsMock.push(goal)
  return goal
}
