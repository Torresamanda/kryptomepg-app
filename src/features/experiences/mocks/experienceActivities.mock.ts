import type { ExperienceActivity } from '../types/Experience'

function dateDaysAgo(daysAgo: number) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(12, 0, 0, 0)
  return date.toISOString()
}

export const experienceActivitiesMock: Record<string, ExperienceActivity[]> = {
  'experience-shadow-playing': [
    {
      id: 'activity-shadow-playing-progress',
      type: 'progress_updated',
      occurredAt: dateDaysAgo(1),
      actor: { id: 'user-amanda', name: 'Amanda' },
      summary: 'Progresso atualizado para 8 horas jogadas.',
    },
    {
      id: 'activity-shadow-playing-created',
      type: 'created',
      occurredAt: dateDaysAgo(18),
      actor: { id: 'user-amanda', name: 'Amanda' },
      summary: 'Experiência adicionada à jornada.',
    },
  ],
  'experience-shadow-completed': [
    {
      id: 'activity-shadow-completed-review',
      type: 'review_updated',
      occurredAt: dateDaysAgo(1),
      actor: { id: 'user-amanda', name: 'Amanda' },
      summary: 'Avaliação atualizada para 7,5 de 10.',
    },
    {
      id: 'activity-shadow-completed-status',
      type: 'status_updated',
      occurredAt: dateDaysAgo(1),
      actor: { id: 'user-amanda', name: 'Amanda' },
      summary: 'Status alterado para finalizado.',
    },
    {
      id: 'activity-shadow-completed-created',
      type: 'created',
      occurredAt: dateDaysAgo(25),
      actor: { id: 'user-amanda', name: 'Amanda' },
      summary: 'Experiência adicionada à jornada.',
    },
  ],
  'experience-subtle-art': [
    {
      id: 'activity-subtle-art-progress',
      type: 'progress_updated',
      occurredAt: dateDaysAgo(1),
      actor: { id: 'user-bryan', name: 'Bryan' },
      summary: 'Progresso atualizado para a página 164.',
    },
    {
      id: 'activity-subtle-art-created',
      type: 'created',
      occurredAt: dateDaysAgo(30),
      actor: { id: 'user-bryan', name: 'Bryan' },
      summary: 'Experiência adicionada à jornada.',
    },
  ],
  'experience-shadow-shared': [
    {
      id: 'activity-shadow-shared-status',
      type: 'status_updated',
      occurredAt: dateDaysAgo(1),
      actor: { id: 'user-amanda', name: 'Amanda' },
      summary: 'Status alterado para finalizado.',
    },
    {
      id: 'activity-shadow-shared-created',
      type: 'created',
      occurredAt: dateDaysAgo(60),
      actor: null,
      summary: 'Experiência compartilhada adicionada à jornada.',
    },
  ],
}
