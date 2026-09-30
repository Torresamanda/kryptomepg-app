import { experienceActivitiesMock } from '../mocks/experienceActivities.mock'
import { experiencesMock } from '../mocks/experiences.mock'
import type {
  Experience,
  ExperienceActivity,
  ExperienceDetails,
  UpdateExperienceRequest,
} from '../types/Experience'
import { getExperienceDetails } from './getExperienceDetails'

const statusLabels = {
  abandoned: 'abandonado',
  completed: 'finalizado',
  paused: 'pausado',
  playing: 'jogando',
  reading: 'lendo',
} as const

function didChange<T>(currentValue: T, nextValue: T | undefined) {
  return nextValue !== undefined && JSON.stringify(currentValue) !== JSON.stringify(nextValue)
}

function createActivity(
  experience: Experience,
  type: ExperienceActivity['type'],
  summary: string,
  occurredAt: string,
): ExperienceActivity {
  return {
    id: `${experience.id}-${type}-${occurredAt}`,
    type,
    summary,
    occurredAt,
    actor: experience.owner,
  }
}

/** Simulates PATCH /api/experiences/:experienceId and records changes in the experience diary. */
export async function updateExperience(
  experienceId: string,
  request: UpdateExperienceRequest,
): Promise<ExperienceDetails> {
  const experienceIndex = experiencesMock.findIndex(
    (currentExperience) => currentExperience.id === experienceId,
  )
  const currentExperience = experiencesMock[experienceIndex]
  if (!currentExperience) throw new Error('Experiência não encontrada.')

  const updatedAt = new Date().toISOString()
  const activities: ExperienceActivity[] = []
  const nextReview =
    request.review === undefined
      ? undefined
      : request.review === null
        ? null
        : {
            comment: request.review.comment,
            rating: request.review.rating,
            updatedAt,
            updatedBy: currentExperience.owner,
          }
  const didUpdateReview =
    request.review !== undefined &&
    (currentExperience.review?.comment !== nextReview?.comment ||
      currentExperience.review?.rating !== nextReview?.rating)

  if (didChange(currentExperience.status, request.status)) {
    activities.push(
      createActivity(
        currentExperience,
        'status_updated',
        `Status alterado para ${statusLabels[request.status!]}.`,
        updatedAt,
      ),
    )
  }
  if (didChange(currentExperience.progress, request.progress)) {
    const progress = request.progress
    const progressLabel =
      progress?.unit === 'pages' ? `página ${progress.current}` : `${progress?.current}h jogadas`
    activities.push(
      createActivity(
        currentExperience,
        'progress_updated',
        `Progresso atualizado para ${progressLabel}.`,
        updatedAt,
      ),
    )
  }
  if (didUpdateReview) {
    activities.push(
      createActivity(currentExperience, 'review_updated', 'Avaliação atualizada.', updatedAt),
    )
  }
  if (didChange(currentExperience.coverImageUrl, request.coverImageUrl)) {
    activities.push(
      createActivity(currentExperience, 'cover_updated', 'Imagem de capa atualizada.', updatedAt),
    )
  }
  if (request.activityNote?.trim()) {
    activities.push(
      createActivity(currentExperience, 'note_added', request.activityNote.trim(), updatedAt),
    )
  }

  const hasChanges =
    activities.length > 0 || didChange(currentExperience.favorite, request.favorite)
  const updatedExperience: Experience = {
    ...currentExperience,
    ...(request.status !== undefined ? { status: request.status } : {}),
    ...(request.progress !== undefined ? { progress: request.progress } : {}),
    ...(nextReview !== undefined ? { review: nextReview } : {}),
    ...(request.coverImageUrl !== undefined ? { coverImageUrl: request.coverImageUrl } : {}),
    ...(request.favorite !== undefined ? { favorite: request.favorite } : {}),
    ...(hasChanges ? { lastActivityAt: updatedAt } : {}),
  }

  experiencesMock[experienceIndex] = updatedExperience
  if (activities.length > 0) {
    experienceActivitiesMock[experienceId] = [
      ...activities,
      ...(experienceActivitiesMock[experienceId] ?? []),
    ]
  }

  return getExperienceDetails(experienceId)
}
