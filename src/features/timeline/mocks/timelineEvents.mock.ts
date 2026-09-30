import type { TimelineEvent } from '../types/TimelineEvent'

function dateDaysAgo(daysAgo: number) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(12, 0, 0, 0)
  return date.toISOString()
}

export const timelineEventsMock: TimelineEvent[] = [
  {
    id: 'timeline-6',
    type: 'progress_updated',
    scope: 'personal',
    occurredAt: dateDaysAgo(0),
    actor: { id: 'user-amanda', name: 'Amanda' },
    experience: { id: 'experience-book-1', title: 'O Nome do Vento', type: 'book' },
    progress: { current: 20, total: 340, unit: 'pages' },
    achievement: null,
  },
  {
    id: 'timeline-5',
    type: 'experience_added',
    scope: 'personal',
    occurredAt: dateDaysAgo(1),
    actor: { id: 'user-bryan', name: 'Bryan' },
    experience: { id: 'experience-game-1', title: 'Death Stranding', type: 'game' },
    progress: null,
    achievement: null,
  },
  {
    id: 'timeline-4',
    type: 'experience_completed',
    scope: 'shared',
    occurredAt: dateDaysAgo(4),
    actor: null,
    experience: { id: 'experience-game-2', title: 'It Takes Two', type: 'game' },
    progress: { current: 100, total: 100, unit: 'percent' },
    achievement: null,
  },
  {
    id: 'timeline-3',
    type: 'achievement_unlocked',
    scope: 'shared',
    occurredAt: dateDaysAgo(7),
    actor: null,
    experience: { id: 'experience-game-3', title: 'Shadow of the Tomb Raider', type: 'game' },
    progress: null,
    achievement: { id: 'achievement-1', title: 'Primeira platina da jornada' },
  },
  {
    id: 'timeline-2',
    type: 'progress_updated',
    scope: 'personal',
    occurredAt: dateDaysAgo(12),
    actor: { id: 'user-bryan', name: 'Bryan' },
    experience: { id: 'experience-movie-1', title: 'Duna: Parte Dois', type: 'movie' },
    progress: { current: 75, total: 100, unit: 'percent' },
    achievement: null,
  },
  {
    id: 'timeline-1',
    type: 'experience_completed',
    scope: 'personal',
    occurredAt: dateDaysAgo(18),
    actor: { id: 'user-amanda', name: 'Amanda' },
    experience: { id: 'experience-book-2', title: 'A Quinta Estação', type: 'book' },
    progress: null,
    achievement: null,
  },
]
