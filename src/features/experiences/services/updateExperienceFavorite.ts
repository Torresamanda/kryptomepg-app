import { experiencesMock } from '../mocks/experiences.mock'
import type { Experience } from '../types/Experience'

/** Updates only the authenticated person's favorite state for an experience. */
export async function updateExperienceFavorite(
  experienceId: string,
  isFavorite: boolean,
): Promise<Experience> {
  const experienceIndex = experiencesMock.findIndex(
    (currentExperience) => currentExperience.id === experienceId,
  )
  const experience = experiencesMock[experienceIndex]
  if (!experience) throw new Error('Experiência não encontrada.')

  const updatedExperience: Experience = {
    ...experience,
    favorite: {
      ...experience.favorite,
      isFavoriteByCurrentUser: isFavorite,
    },
  }

  experiencesMock[experienceIndex] = updatedExperience
  return updatedExperience
}
