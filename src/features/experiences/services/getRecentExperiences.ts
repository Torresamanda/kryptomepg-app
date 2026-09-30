import { experiencesMock } from '../mocks/experiences.mock'
import type { Experience } from '../types/Experience'

/** Returns the most recently updated experiences for the authenticated person's journey. */
export async function getRecentExperiences(limit = 4): Promise<Experience[]> {
  return [...experiencesMock]
    .sort((first, second) => Date.parse(second.lastActivityAt) - Date.parse(first.lastActivityAt))
    .slice(0, limit)
}
