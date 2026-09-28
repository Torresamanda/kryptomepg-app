export type MemoryExperienceType = 'book' | 'game' | 'movie'

export interface RandomMemory {
  comment: string | null
  completedAt: string
  coverImageUrl: string | null
  experienceId: string
  title: string
  type: MemoryExperienceType
}
