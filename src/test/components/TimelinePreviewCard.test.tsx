import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TimelinePreviewCard } from '@/features/timeline/components/TimelinePreviewCard'
import type { TimelineEvent } from '@/features/timeline/types/TimelineEvent'

const event: TimelineEvent = {
  id: 'timeline-1',
  type: 'progress_updated',
  scope: 'personal',
  occurredAt: new Date().toISOString(),
  actor: { id: 'user-amanda', name: 'Amanda' },
  experience: { id: 'experience-book-1', title: 'O Nome do Vento', type: 'book' },
  progress: { current: 20, total: 340, unit: 'pages' },
  achievement: null,
}

describe('TimelinePreviewCard', () => {
  it('shows the latest event and links to the complete timeline', () => {
    render(<TimelinePreviewCard events={[event]} />)

    expect(screen.getByRole('heading', { name: 'Linha do tempo' })).toBeInTheDocument()
    expect(screen.getByText('Amanda está lendo O Nome do Vento')).toBeInTheDocument()
    expect(screen.getByText('20 de 340 páginas')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Ver linha do tempo/i })).toHaveAttribute(
      'href',
      '/linha-do-tempo',
    )
  })
})
