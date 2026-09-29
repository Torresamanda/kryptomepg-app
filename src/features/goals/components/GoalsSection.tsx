'use client'

import type { Goal } from '../types/Goal'

import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'
import { useGoalCompletionQueue } from '../hooks/useGoalCompletionQueue/useGoalCompletionQueue'
import { GoalsDrawer } from './GoalsDrawer'
import { NewGoalDrawer } from './NewGoalDrawer'
import { UpcomingGoalsCard } from './UpcomingGoalsCard'

export function GoalsSection({ initialGoals }: { initialGoals: Goal[] }) {
  const queue = useGoalCompletionQueue(initialGoals)
  const goalsDrawer = useQueryDrawer('goals')
  const newGoalDrawer = useQueryDrawer('new-goal')

  return (
    <>
      <UpcomingGoalsCard
        goals={queue.goals}
        error={queue.error}
        onToggleCompletion={queue.toggleCompletion}
        onNewGoal={newGoalDrawer.open}
        onViewAll={goalsDrawer.open}
      />
      <GoalsDrawer open={goalsDrawer.isOpen} onClose={goalsDrawer.close} />

      <NewGoalDrawer
        open={newGoalDrawer.isOpen}
        onClose={newGoalDrawer.close}
        onCreated={queue.addGoal}
      />
    </>
  )
}
