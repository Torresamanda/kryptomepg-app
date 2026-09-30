export type ExperienceOwnership = 'personal' | 'shared'
export type ExperienceStatus = 'playing' | 'reading' | 'completed' | 'paused' | 'abandoned'
export type ExperienceType = 'book' | 'game' | 'movie'
export type ProgressUnit = 'hours' | 'pages' | 'percent'

export interface ExperienceOwner {
  id: string
  name: string
}

export interface ExperienceFavoriteState {
  isFavoriteByCouple: boolean | null
  isFavoriteByCurrentUser: boolean
}

export interface ExperienceProgress {
  current: number
  total: number
  unit: ProgressUnit
}

export interface ExperienceReview {
  comment: string | null
  rating: number | null
  updatedAt: string | null
  updatedBy: ExperienceOwner | null
}

export interface Experience {
  coverImageUrl: string | null
  createdAt: string
  favorite: ExperienceFavoriteState
  id: string
  lastActivityAt: string
  owner: ExperienceOwner | null
  ownership: ExperienceOwnership
  platinumAt: string | null
  progress: ExperienceProgress | null
  review: ExperienceReview | null
  status: ExperienceStatus
  title: string
  type: ExperienceType
}

export type ExperienceActivityType =
  | 'created'
  | 'cover_updated'
  | 'note_added'
  | 'progress_updated'
  | 'review_updated'
  | 'status_updated'

export interface ExperienceActivity {
  actor: ExperienceOwner | null
  id: string
  occurredAt: string
  summary: string
  type: ExperienceActivityType
}

export interface ExperienceDetails extends Experience {
  activities: ExperienceActivity[]
}

export interface UpdateExperienceRequest {
  activityNote?: string | null
  coverImageUrl?: string | null
  favorite?: ExperienceFavoriteState
  progress?: ExperienceProgress | null
  review?: Pick<ExperienceReview, 'comment' | 'rating'> | null
  status?: ExperienceStatus
}

export interface CreateExperienceRequest {
  coverImageUrl?: string | null
  progress: Pick<ExperienceProgress, 'total' | 'unit'>
  status: ExperienceStatus
  title: string
  type: Extract<ExperienceType, 'book' | 'game'>
}
