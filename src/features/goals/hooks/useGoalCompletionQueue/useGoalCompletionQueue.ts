'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { completeGoals } from '../../services/completeGoals'
import type { Goal } from '../../types/Goal'

const debounceMs = 500

export function useGoalCompletionQueue(initialGoals: Goal[]) {
  const [goals, setGoals] = useState(initialGoals)
  const [error, setError] = useState<string | null>(null)
  const queuedIdsRef = useRef(new Set<string>())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flush = useCallback(async () => {
    const goalIds = [...queuedIdsRef.current]
    queuedIdsRef.current.clear()
    if (goalIds.length === 0) return

    try {
      const updatedGoals = await completeGoals(goalIds)
      setGoals((currentGoals) =>
        currentGoals.map((goal) => updatedGoals.find((updated) => updated.id === goal.id) ?? goal),
      )
    } catch {
      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goalIds.includes(goal.id) ? { ...goal, status: 'active', completedAt: null } : goal,
        ),
      )
      setError('Não foi possível concluir uma ou mais metas. Tente novamente.')
    }
  }, [])

  const complete = useCallback(
    (goalId: string) => {
      setError(null)
      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === goalId
            ? { ...goal, status: 'completed', completedAt: new Date().toISOString() }
            : goal,
        ),
      )
      queuedIdsRef.current.add(goalId)
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

  return { addGoal, complete, error, goals }
}
