import { experienceActivitiesMock } from '../mocks/experienceActivities.mock'
import { experiencesMock } from '../mocks/experiences.mock'
import type {
  CreateExperienceRequest,
  Experience,
  ExperienceDetails,
  ExperienceProgress,
} from '../types/Experience'
import { getExperienceDetails } from './getExperienceDetails'

const titleMaxLength = 160

function validateProgress(progress: CreateExperienceRequest['progress']) {
  const expectedUnit = progress.unit === 'hours' ? 'hours' : 'pages'

  if (!Number.isInteger(progress.total) || progress.total <= 0) {
    throw new Error(
      expectedUnit === 'hours'
        ? 'Informe uma quantidade válida de horas para finalizar.'
        : 'Informe uma quantidade válida de páginas.',
    )
  }
}

function validateCoverImageUrl(coverImageUrl: string | null | undefined) {
  if (!coverImageUrl?.trim()) return

  try {
    const url = new URL(coverImageUrl)
    if (url.protocol !== 'https:') throw new Error('Invalid protocol')
  } catch {
    throw new Error('A imagem de capa deve usar uma URL HTTPS válida.')
  }
}

/** Simulates POST /api/experiences and records the initial diary entry. */
export async function createExperience(
  request: CreateExperienceRequest,
): Promise<ExperienceDetails> {
  const title = request.title.trim()
  if (!title) throw new Error('O título da experiência é obrigatório.')
  if (title.length > titleMaxLength) {
    throw new Error(`O título deve ter no máximo ${titleMaxLength} caracteres.`)
  }

  const expectedUnit = request.type === 'game' ? 'hours' : 'pages'
  if (request.progress.unit !== expectedUnit) {
    throw new Error('O tipo de experiência não corresponde à unidade de progresso.')
  }
  validateProgress(request.progress)
  validateCoverImageUrl(request.coverImageUrl)

  const occurredAt = new Date().toISOString()
  const id = `experience-${crypto.randomUUID()}`
  const progress: ExperienceProgress = {
    ...request.progress,
    current: request.status === 'completed' ? request.progress.total : 0,
  }
  const experience: Experience = {
    id,
    title,
    type: request.type,
    status: request.status,
    coverImageUrl: request.coverImageUrl?.trim() || null,
    ownership: 'personal',
    owner: { id: 'user-amanda', name: 'Amanda' },
    createdAt: occurredAt,
    lastActivityAt: occurredAt,
    favorite: { isFavoriteByCurrentUser: false, isFavoriteByCouple: null },
    progress,
    review: { comment: null, rating: null, updatedAt: null, updatedBy: null },
    platinumAt: null,
  }

  experiencesMock.unshift(experience)
  experienceActivitiesMock[id] = [
    {
      actor: experience.owner,
      id: `${id}-created-${occurredAt}`,
      occurredAt,
      summary: 'Experiência adicionada à jornada.',
      type: 'created',
    },
  ]

  return getExperienceDetails(id)
}
