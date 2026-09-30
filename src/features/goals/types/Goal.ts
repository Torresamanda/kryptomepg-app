export type GoalAudience = 'personal' | 'shared'
export type GoalStatus = 'active' | 'completed'
export const maxGoalTitleLength = 120

export interface Goal {
  audience: GoalAudience
  completedAt: string | null
  completionReversibleUntil: string | null
  createdAt: string
  id: string
  status: GoalStatus
  title: string
}

export interface CreateGoalInput {
  audience: GoalAudience
  title: string
}

export interface UpdateGoalInput {
  audience: GoalAudience
  title: string
}

export type GoalAudienceFilter = GoalAudience | 'all'

export interface GetGoalsOptions {
  audience?: GoalAudienceFilter
  query?: string
}

export interface GoalCompletionUpdate {
  completed: boolean
  goalId: string
}
