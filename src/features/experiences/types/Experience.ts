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
