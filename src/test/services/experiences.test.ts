import { describe, expect, it } from 'vitest'
import { experienceActivitiesMock } from '@/features/experiences/mocks/experienceActivities.mock'
import { experiencesMock } from '@/features/experiences/mocks/experiences.mock'
import { deleteExperience } from '@/features/experiences/services/deleteExperience'
import { createExperience } from '@/features/experiences/services/createExperience'
import { getExperienceDetails } from '@/features/experiences/services/getExperienceDetails'
import { getRecentExperiences } from '@/features/experiences/services/getRecentExperiences'
import { updateExperience } from '@/features/experiences/services/updateExperience'
import { updateExperienceFavorite } from '@/features/experiences/services/updateExperienceFavorite'

describe('experience services', () => {
  it('creates a game with its initial progress and a diary entry', async () => {
    const createdExperience = await createExperience({
      title: 'Celeste',
      type: 'game',
      status: 'completed',
      progress: { total: 12, unit: 'hours' },
    })

    expect(createdExperience).toMatchObject({
      title: 'Celeste',
      type: 'game',
      status: 'completed',
      progress: { current: 12, total: 12, unit: 'hours' },
      review: { comment: null, rating: null },
    })
    expect(createdExperience.activities).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'created' })]),
    )

    await deleteExperience(createdExperience.id)
  })

  it('rejects a progress unit that does not match the experience type', async () => {
    await expect(
      createExperience({
        title: 'Livro inválido',
        type: 'book',
        status: 'reading',
        progress: { total: 20, unit: 'hours' },
      }),
    ).rejects.toThrow('O tipo de experiência não corresponde à unidade de progresso.')
  })

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

  it('returns diary entries and records an experience update', async () => {
    const experienceId = 'experience-shadow-playing'
    const details = await getExperienceDetails(experienceId)

    expect(details.createdAt).toEqual(expect.any(String))
    expect(details.activities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'created' }),
        expect.objectContaining({ type: 'progress_updated' }),
      ]),
    )

    const updatedDetails = await updateExperience(experienceId, {
      activityNote: 'Cheguei à cidade perdida.',
      status: 'paused',
    })

    expect(updatedDetails.status).toBe('paused')
    expect(updatedDetails.activities[0]).toMatchObject({
      type: 'status_updated',
      summary: 'Status alterado para pausado.',
    })
    expect(updatedDetails.activities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'note_added', summary: 'Cheguei à cidade perdida.' }),
      ]),
    )

    await updateExperience(experienceId, { status: details.status })
  })

  it('deletes an experience and its diary entries', async () => {
    const experienceId = 'experience-shadow-shared'
    const experienceIndex = experiencesMock.findIndex(
      (experience) => experience.id === experienceId,
    )
    const removedExperience = experiencesMock[experienceIndex]
    const removedActivities = experienceActivitiesMock[experienceId]

    await expect(deleteExperience(experienceId)).resolves.toBeUndefined()
    await expect(getExperienceDetails(experienceId)).rejects.toThrow('Experiência não encontrada.')
    expect(experienceActivitiesMock[experienceId]).toBeUndefined()

    experiencesMock.splice(experienceIndex, 0, removedExperience)
    experienceActivitiesMock[experienceId] = removedActivities
  })

  it('requires an updated progress and a rating when finalizing an experience', async () => {
    await expect(
      updateExperience('experience-shadow-playing', { status: 'completed' }),
    ).rejects.toThrow('Para finalizar, informe uma nota e atualize o progresso atual.')
  })
})
