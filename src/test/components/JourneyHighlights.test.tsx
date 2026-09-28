import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { JourneyHighlights } from '@/features/journey/components/JourneyHighlights'

describe('JourneyHighlights', () => {
  it('shows the four journey aggregate values', () => {
    render(
      <JourneyHighlights
        highlights={{
          booksRead: 41,
          gamesRegistered: 138,
          journeyStartedYear: 2026,
          sharedExperiences: 52,
        }}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Nossa jornada' })).toBeInTheDocument()
    expect(screen.getByText('Jogos registrados')).toBeInTheDocument()
    expect(screen.getByText('Livros lidos')).toBeInTheDocument()
    expect(screen.getByText('Experiências compartilhadas')).toBeInTheDocument()
    expect(screen.getByText('Início da jornada')).toBeInTheDocument()
  })
})
