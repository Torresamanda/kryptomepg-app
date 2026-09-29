'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { completeGoals } from '../../services/completeGoals'
import type { Goal, GoalCompletionUpdate } from '../../types/Goal'

const debounceMs = 500

export function useGoalCompletionQueue(initialGoals: Goal[]) {
  const [goals, setGoals] = useState(initialGoals)
  const [error, setError] = useState<string | null>(null)
  const queuedUpdatesRef = useRef(new Map<string, boolean>())
  const previousGoalsRef = useRef(new Map<string, Goal>())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flush = useCallback(async () => {
    const updates: GoalCompletionUpdate[] = [...queuedUpdatesRef.current].map(
      ([goalId, completed]) => ({ goalId, completed }),
    )
    queuedUpdatesRef.current.clear()
    if (updates.length === 0) return

    try {
      const updatedGoals = await completeGoals(updates)
      setGoals((currentGoals) =>
        currentGoals.map((goal) => updatedGoals.find((updated) => updated.id === goal.id) ?? goal),
      )
    } catch {
      setGoals((currentGoals) =>
        currentGoals.map((goal) => previousGoalsRef.current.get(goal.id) ?? goal),
      )
      setError('Não foi possível atualizar uma ou mais metas. Tente novamente.')
    } finally {
      updates.forEach(({ goalId }) => previousGoalsRef.current.delete(goalId))
    }
  }, [])

  const toggleCompletion = useCallback(
    (goalId: string, completed: boolean) => {
      setError(null)
      setGoals((currentGoals) =>
        currentGoals.map((goal) => {
          if (goal.id !== goalId) return goal
          if (!previousGoalsRef.current.has(goalId)) previousGoalsRef.current.set(goalId, goal)

          return {
            ...goal,
            status: completed ? 'completed' : 'active',
            completedAt: completed ? new Date().toISOString() : null,
            completionReversibleUntil: completed ? goal.completionReversibleUntil : null,
          }
        }),
      )
      queuedUpdatesRef.current.set(goalId, completed)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(flush, debounceMs)
    },
    [flush],
  )

  const addGoal = useCallback(
    (goal: Goal) => setGoals((currentGoals) => [goal, ...currentGoals].slice(0, 5)),
    [],
  )

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  return { addGoal, error, goals, toggleCompletion }
}
