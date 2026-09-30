import { goalsMock } from '../mocks/goals.mock'
import { maxGoalTitleLength, type Goal, type UpdateGoalInput } from '../types/Goal'

/** Updates a goal title and audience using the same validation required by the future API. */
export async function updateGoal(
  goalId: string,
  { audience, title }: UpdateGoalInput,
): Promise<Goal> {
  const normalizedTitle = title.trim()

  if (!normalizedTitle) throw new Error('O título da meta é obrigatório.')

  if (normalizedTitle.length > maxGoalTitleLength)
    throw new Error(`O título deve ter no máximo ${maxGoalTitleLength} caracteres.`)

  const goal = goalsMock.find((currentGoal) => currentGoal.id === goalId)

  if (!goal) throw new Error('Meta não encontrada.')

  goal.title = normalizedTitle
  goal.audience = audience
  return goal
}
