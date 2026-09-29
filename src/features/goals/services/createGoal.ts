import { goalsMock } from '../mocks/goals.mock'
import { maxGoalTitleLength, type CreateGoalInput, type Goal } from '../types/Goal'

export async function createGoal({ audience, title }: CreateGoalInput): Promise<Goal> {
  const normalizedTitle = title.trim()

  if (!normalizedTitle) throw new Error('O título da meta é obrigatório.')
  if (normalizedTitle.length > maxGoalTitleLength)
    throw new Error(`O título deve ter no máximo ${maxGoalTitleLength} caracteres.`)

  const goal: Goal = {
    id: `goal-${crypto.randomUUID()}`,
    title: normalizedTitle,
    audience,
    status: 'active',
    createdAt: new Date().toISOString(),
    completedAt: null,
    completionReversibleUntil: null,
  }

  goalsMock.push(goal)
  return goal
}
