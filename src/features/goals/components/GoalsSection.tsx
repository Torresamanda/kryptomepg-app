'use client'

import { useCallback } from 'react'
import type { Goal } from '../types/Goal'

import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'
import { useGoalCompletionQueue } from '../hooks/useGoalCompletionQueue/useGoalCompletionQueue'
import { getRecentGoals } from '../services/getRecentGoals'
import { GoalsDrawer } from './GoalsDrawer'
import { NewGoalModal } from './NewGoalModal'
import { UpcomingGoalsCard } from './UpcomingGoalsCard'

export function GoalsSection({ initialGoals }: { initialGoals: Goal[] }) {
  const { addGoal, error, goals, replaceGoals, toggleCompletion } =
    useGoalCompletionQueue(initialGoals)
  const goalsDrawer = useQueryDrawer('goals')
  const newGoalDrawer = useQueryDrawer('new-goal')
  const refreshRecentGoals = useCallback(async () => {
    replaceGoals(await getRecentGoals())
  }, [replaceGoals])

  return (
    <>
      <UpcomingGoalsCard
        goals={goals}
        error={error}
        onToggleCompletion={toggleCompletion}
        onNewGoal={newGoalDrawer.open}
        onViewAll={goalsDrawer.open}
      />
      <GoalsDrawer
        key={goalsDrawer.isOpen ? 'goals-drawer-open' : 'goals-drawer-closed'}
        open={goalsDrawer.isOpen}
        onClose={goalsDrawer.close}
        onGoalsChanged={refreshRecentGoals}
      />

      <NewGoalModal open={newGoalDrawer.isOpen} onClose={newGoalDrawer.close} onSaved={addGoal} />
    </>
  )
}
