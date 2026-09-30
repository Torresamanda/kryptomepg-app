import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ExperienceCard } from '@/features/experiences/components/ExperienceCard'
import type { Experience } from '@/features/experiences/types/Experience'

const sharedPlatinumExperience: Experience = {
  id: 'experience-1',
  title: 'Shadow of the Tomb Raider',
  type: 'game',
  status: 'completed',
  ownership: 'shared',
  owner: null,
  coverImageUrl: null,
  favorite: { isFavoriteByCurrentUser: false, isFavoriteByCouple: true },
  progress: { current: 48, total: 48, unit: 'hours' },
  review: { comment: 'Uma ótima experiência.', rating: 8, updatedAt: null, updatedBy: null },
  platinumAt: '2026-09-28T12:00:00Z',
  lastActivityAt: new Date().toISOString(),
}

describe('ExperienceCard', () => {
  it('shows shared ownership, progress, and the platinum indicator', () => {
    render(<ExperienceCard experience={sharedPlatinumExperience} onToggleFavorite={vi.fn()} />)

    expect(screen.getByText('Juntos')).toBeInTheDocument()
    expect(screen.getByText('48h jogadas')).toBeInTheDocument()
    expect(screen.getByLabelText('Jogo platinado')).toBeInTheDocument()
    expect(screen.getByLabelText('Nota 8 de 10')).toBeInTheDocument()
  })

  it('lets the person toggle their own favorite', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = vi.fn()

    render(
      <ExperienceCard experience={sharedPlatinumExperience} onToggleFavorite={onToggleFavorite} />,
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Adicionar Shadow of the Tomb Raider dos favoritos',
      }),
    )

    expect(onToggleFavorite).toHaveBeenCalledWith(sharedPlatinumExperience)
  })
})
