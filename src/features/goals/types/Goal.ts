export type GoalAudience = 'personal' | 'shared'
export type GoalStatus = 'active' | 'completed'

export interface Goal {
  audience: GoalAudience
  completedAt: string | null
  createdAt: string
  id: string
  status: GoalStatus
  title: string
}

export interface CreateGoalInput {
  audience: GoalAudience
  title: string
}
