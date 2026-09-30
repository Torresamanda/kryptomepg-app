import { describe, expect, it } from 'vitest'
import { createGoal } from '@/features/goals/services/createGoal'
import { deleteGoal } from '@/features/goals/services/deleteGoal'
import { getGoals } from '@/features/goals/services/getGoals'
import { updateGoal } from '@/features/goals/services/updateGoal'

describe('goal management services', () => {
  it('filters goals by audience and sorts them alphabetically', async () => {
    const goals = await getGoals({ audience: 'shared' })

    expect(goals.every((goal) => goal.audience === 'shared')).toBe(true)
    expect(goals.map((goal) => goal.title)).toEqual([...goals.map((goal) => goal.title)].sort())
  })

  it('updates and deletes a created goal', async () => {
    const createdGoal = await createGoal({ audience: 'personal', title: 'Meta temporária' })
    const updatedGoal = await updateGoal(createdGoal.id, {
      audience: 'shared',
      title: 'Meta atualizada',
    })

    expect(updatedGoal).toMatchObject({ audience: 'shared', title: 'Meta atualizada' })

    await deleteGoal(createdGoal.id)

    expect(
      (await getGoals({ query: 'Meta atualizada' })).find((goal) => goal.id === createdGoal.id),
    ).toBeUndefined()
  })
})
