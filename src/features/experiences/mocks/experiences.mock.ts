import type { Experience } from '../types/Experience'

function dateDaysAgo(daysAgo: number) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(12, 0, 0, 0)
  return date.toISOString()
}

export const experiencesMock: Experience[] = [
  {
    id: 'experience-shadow-playing',
    title: 'Shadow of the Tomb Raider',
    type: 'game',
    status: 'playing',
    ownership: 'personal',
    owner: { id: 'user-amanda', name: 'Amanda' },
    createdAt: dateDaysAgo(18),
    coverImageUrl: '/memories/forest-companions.png',
    favorite: { isFavoriteByCurrentUser: false, isFavoriteByCouple: null },
    progress: { current: 8, total: 18, unit: 'hours' },
    review: { comment: null, rating: null, updatedAt: null, updatedBy: null },
    platinumAt: null,
    lastActivityAt: dateDaysAgo(1),
  },
  {
    id: 'experience-shadow-completed',
    title: 'Shadow of the Tomb Raider',
    type: 'game',
    status: 'completed',
    ownership: 'personal',
    owner: { id: 'user-amanda', name: 'Amanda' },
    createdAt: dateDaysAgo(25),
    coverImageUrl: '/memories/forest-companions.png',
    favorite: { isFavoriteByCurrentUser: false, isFavoriteByCouple: null },
    progress: { current: 48, total: 48, unit: 'hours' },
    review: {
      comment: 'Gostei da ambientação e do som, muito bom, mas a história poderia ser melhor.',
      rating: 7.5,
      updatedAt: dateDaysAgo(1),
      updatedBy: { id: 'user-amanda', name: 'Amanda' },
    },
    platinumAt: null,
    lastActivityAt: dateDaysAgo(1),
  },
  {
    id: 'experience-subtle-art',
    title: 'A Sutil Arte de Ligar o F*da-se',
    type: 'book',
    status: 'reading',
    ownership: 'personal',
    owner: { id: 'user-bryan', name: 'Bryan' },
    createdAt: dateDaysAgo(30),
    coverImageUrl: null,
    favorite: { isFavoriteByCurrentUser: true, isFavoriteByCouple: null },
    progress: { current: 164, total: 340, unit: 'pages' },
    review: {
      comment: 'Livro bom.',
      rating: 7.5,
      updatedAt: dateDaysAgo(1),
      updatedBy: { id: 'user-bryan', name: 'Bryan' },
    },
    platinumAt: null,
    lastActivityAt: dateDaysAgo(1),
  },
  {
    id: 'experience-shadow-shared',
    title: 'Shadow of the Tomb Raider',
    type: 'game',
    status: 'completed',
    ownership: 'shared',
    owner: null,
    createdAt: dateDaysAgo(60),
    coverImageUrl: '/memories/forest-companions.png',
    favorite: { isFavoriteByCurrentUser: true, isFavoriteByCouple: true },
    progress: { current: 48, total: 48, unit: 'hours' },
    review: {
      comment: 'Gostei da ambientação e do som, muito bom, mas a história poderia ser melhor.',
      rating: 7.5,
      updatedAt: dateDaysAgo(1),
      updatedBy: { id: 'user-amanda', name: 'Amanda' },
    },
    platinumAt: dateDaysAgo(2),
    lastActivityAt: dateDaysAgo(1),
  },
]
