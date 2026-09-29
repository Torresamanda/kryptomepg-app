import { goalsMock } from '../mocks/goals.mock'
import type { Goal, GoalCompletionUpdate } from '../types/Goal'

/** Updates one or more goal completion states in a single API-shaped request. */
export async function completeGoals(updates: GoalCompletionUpdate[]): Promise<Goal[]> {
  const updatesByGoalId = new Map(updates.map((update) => [update.goalId, update]))
  const updatedGoals = goalsMock.filter((goal) => updatesByGoalId.has(goal.id))

  if (updatedGoals.length !== updatesByGoalId.size)
    throw new Error('Uma ou mais metas não foram encontradas.')

  const now = Date.now()
  const isUndoOutsideAllowedPeriod = (goal: Goal) => {
    const update = updatesByGoalId.get(goal.id)
    return (
      update?.completed === false &&
      (!goal.completionReversibleUntil || new Date(goal.completionReversibleUntil).getTime() <= now)
    )
  }

  if (updatedGoals.some(isUndoOutsideAllowedPeriod))
    throw new Error('O período para desmarcar uma ou mais metas expirou.')

  updatedGoals.forEach((goal) => {
    const completed = updatesByGoalId.get(goal.id)?.completed
    goal.status = completed ? 'completed' : 'active'
    goal.completedAt = completed ? new Date().toISOString() : null
    goal.completionReversibleUntil = completed
      ? new Date(Date.now() + 15 * 60 * 1000).toISOString()
      : null
  })

  return updatedGoals
}
