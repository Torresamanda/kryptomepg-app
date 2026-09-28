import type { RandomMemory } from '../types/RandomMemory'

export const randomMemoriesMock: RandomMemory[] = [
  {
    experienceId: 'book-forest-companions',
    title: 'Pequenas aventuras',
    type: 'book',
    coverImageUrl: '/memories/forest-companions.png',
    completedAt: '2024-09-28T12:00:00-03:00',
    comment: '“Foi uma das experiências mais gostosas que tivemos.”',
  },
  {
    experienceId: 'movie-midnight-stories',
    title: 'Histórias da meia-noite',
    type: 'movie',
    coverImageUrl: null,
    completedAt: '2025-08-12T20:30:00-03:00',
    comment: 'Aquele final ainda rende conversa até hoje.',
  },
  {
    experienceId: 'game-starlight',
    title: 'Caminhos de Starlight',
    type: 'game',
    coverImageUrl: null,
    completedAt: '2026-02-18T21:00:00-03:00',
    comment: null,
  },
]
