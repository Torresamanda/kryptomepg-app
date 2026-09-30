export type TimelineEventScope = 'personal' | 'shared'
export type TimelineEventType =
  'achievement_unlocked' | 'experience_added' | 'experience_completed' | 'progress_updated'

export interface TimelineActor {
  id: string
  name: string
}

export interface TimelineExperience {
  id: string
  title: string
  type: 'book' | 'game' | 'movie'
}

export interface TimelineProgress {
  current: number
  total: number
  unit: 'chapters' | 'pages' | 'percent'
}

export interface TimelineAchievement {
  id: string
  title: string
}

export interface TimelineEvent {
  achievement: TimelineAchievement | null
  actor: TimelineActor | null
  experience: TimelineExperience | null
  id: string
  occurredAt: string
  progress: TimelineProgress | null
  scope: TimelineEventScope
  type: TimelineEventType
}

export interface TimelinePage {
  events: TimelineEvent[]
  nextCursor: string | null
}
