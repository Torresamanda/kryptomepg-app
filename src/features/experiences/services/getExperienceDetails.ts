import { experienceActivitiesMock } from '../mocks/experienceActivities.mock'
import { experiencesMock } from '../mocks/experiences.mock'
import type { ExperienceDetails } from '../types/Experience'

/** Returns the complete data necessary to render one experience diary. */
export async function getExperienceDetails(experienceId: string): Promise<ExperienceDetails> {
  const experience = experiencesMock.find(
    (currentExperience) => currentExperience.id === experienceId,
  )
  if (!experience) throw new Error('Experiência não encontrada.')

  return {
    ...experience,
    activities: [...(experienceActivitiesMock[experienceId] ?? [])].sort(
      (firstActivity, secondActivity) =>
        new Date(secondActivity.occurredAt).getTime() -
        new Date(firstActivity.occurredAt).getTime(),
    ),
  }
}
