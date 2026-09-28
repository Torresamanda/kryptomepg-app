import { describe, expect, it } from 'vitest'
import { completeGoals } from '@/features/goals/services/completeGoals'
import { getRecentGoals } from '@/features/goals/services/getRecentGoals'

describe('goal services', () => {
  it('returns the five most recently created goals', async () => {
    const goals = await getRecentGoals()

    expect(goals).toHaveLength(5)
    expect(goals[0].id).toBe('goal-5')
  })

  it('completes more than one goal in a single request', async () => {
    const goals = await completeGoals(['goal-4', 'goal-2'])

    expect(goals.map((goal) => goal.status)).toEqual(['completed', 'completed'])
    expect(goals.every((goal) => goal.completedAt)).toBe(true)
  })
})
