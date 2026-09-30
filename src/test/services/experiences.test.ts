import { describe, expect, it } from 'vitest'
import { getRecentExperiences } from '@/features/experiences/services/getRecentExperiences'
import { updateExperienceFavorite } from '@/features/experiences/services/updateExperienceFavorite'

describe('experience services', () => {
  it('returns recent experiences up to the requested limit', async () => {
    const experiences = await getRecentExperiences(2)

    expect(experiences).toHaveLength(2)
    expect(experiences[0].lastActivityAt >= experiences[1].lastActivityAt).toBe(true)
  })

  it('updates only the authenticated person favorite state', async () => {
    const [experience] = await getRecentExperiences(1)
    const originalFavorite = experience.favorite.isFavoriteByCurrentUser
    const coupleFavorite = experience.favorite.isFavoriteByCouple

    const updatedExperience = await updateExperienceFavorite(experience.id, !originalFavorite)

    expect(updatedExperience.favorite.isFavoriteByCurrentUser).toBe(!originalFavorite)
    expect(updatedExperience.favorite.isFavoriteByCouple).toBe(coupleFavorite)

    await updateExperienceFavorite(experience.id, originalFavorite)
  })
})
