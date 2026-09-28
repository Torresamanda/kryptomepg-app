import { randomMemoriesMock } from '../mocks/randomMemories.mock'
import type { RandomMemory } from '../types/RandomMemory'

/**
 * Returns a random completed experience for the authenticated person.
 *
 * The mock mirrors the future API contract. The API will derive the person from the session and
 * can use `excludeExperienceId` to avoid returning the memory currently displayed.
 */
export async function getRandomMemory(excludeExperienceId?: string): Promise<RandomMemory | null> {
  const availableMemories = randomMemoriesMock.filter(
    (memory) => memory.experienceId !== excludeExperienceId,
  )
  const candidates = availableMemories.length > 0 ? availableMemories : randomMemoriesMock

  if (candidates.length === 0) return null

  return candidates[Math.floor(Math.random() * candidates.length)]
}
