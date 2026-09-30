import { goalsMock } from '../mocks/goals.mock'

/** Permanently removes a goal after the caller has confirmed the action. */
export async function deleteGoal(goalId: string): Promise<void> {
  const goalIndex = goalsMock.findIndex((goal) => goal.id === goalId)
  if (goalIndex === -1) throw new Error('Meta não encontrada.')

  goalsMock.splice(goalIndex, 1)
}
