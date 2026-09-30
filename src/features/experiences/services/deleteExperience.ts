import { experienceActivitiesMock } from '../mocks/experienceActivities.mock'
import { experiencesMock } from '../mocks/experiences.mock'

/** Simulates DELETE /api/experiences/:experienceId. */
export async function deleteExperience(experienceId: string): Promise<void> {
  const experienceIndex = experiencesMock.findIndex(
    (currentExperience) => currentExperience.id === experienceId,
  )
  if (experienceIndex === -1) throw new Error('Experiência não encontrada.')

  experiencesMock.splice(experienceIndex, 1)
  delete experienceActivitiesMock[experienceId]
}
