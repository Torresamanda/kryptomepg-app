import type { Goal } from '../types/Goal'

export const goalsMock: Goal[] = [
  {
    id: 'goal-5',
    title: 'Assistir Interestelar',
    audience: 'shared',
    status: 'active',
    createdAt: '2026-09-25T12:00:00Z',
    completedAt: null,
    completionReversibleUntil: null,
  },
  {
    id: 'goal-4',
    title: 'Ler mais um capítulo juntos',
    audience: 'personal',
    status: 'active',
    createdAt: '2026-09-24T12:00:00Z',
    completedAt: null,
    completionReversibleUntil: null,
  },
  {
    id: 'goal-3',
    title: 'Conhecer uma cafeteria nova',
    audience: 'shared',
    status: 'completed',
    createdAt: '2026-09-20T12:00:00Z',
    completedAt: '2026-09-22T12:00:00Z',
    completionReversibleUntil: null,
  },
  {
    id: 'goal-2',
    title: 'Terminar a trilogia favorita',
    audience: 'personal',
    status: 'active',
    createdAt: '2026-09-18T12:00:00Z',
    completedAt: null,
    completionReversibleUntil: null,
  },
  {
    id: 'goal-1',
    title: 'Planejar a próxima viagem',
    audience: 'shared',
    status: 'completed',
    createdAt: '2026-09-15T12:00:00Z',
    completedAt: '2026-09-21T12:00:00Z',
    completionReversibleUntil: null,
  },
]
