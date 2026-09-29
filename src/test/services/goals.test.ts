import { describe, expect, it } from 'vitest'
import { completeGoals } from '@/features/goals/services/completeGoals'
import { getRecentGoals } from '@/features/goals/services/getRecentGoals'

describe('goal services', () => {
  it('returns the five most recently created goals', async () => {
    const goals = await getRecentGoals()

    expect(goals).toHaveLength(5)
    expect(goals[0].id).toBe('goal-5')
  })

  it('updates more than one goal completion state in a single request', async () => {
    const goals = await completeGoals([
      { goalId: 'goal-4', completed: true },
      { goalId: 'goal-2', completed: true },
    ])

    expect(goals.map((goal) => goal.status)).toEqual(['completed', 'completed'])
    expect(goals.every((goal) => goal.completedAt)).toBe(true)
    expect(goals.every((goal) => goal.completionReversibleUntil)).toBe(true)
  })

  it('rejects an attempt to uncheck a goal after its API deadline', async () => {
    await expect(completeGoals([{ goalId: 'goal-3', completed: false }])).rejects.toThrow(
      'O período para desmarcar uma ou mais metas expirou.',
    )
  })
})
