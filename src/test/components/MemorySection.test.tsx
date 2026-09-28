import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemorySection } from '@/features/memories/components/MemorySection'

const { mockGetRandomMemory } = vi.hoisted(() => ({ mockGetRandomMemory: vi.fn() }))

vi.mock('@/features/memories/services/getRandomMemory', () => ({
  getRandomMemory: mockGetRandomMemory,
}))

const initialMemory = {
  experienceId: 'memory-one',
  title: 'Primeira lembrança',
  type: 'book' as const,
  coverImageUrl: null,
  completedAt: '2024-09-28T12:00:00-03:00',
  comment: 'Uma história para guardar.',
}

describe('MemorySection', () => {
  it('shows a new random memory when remembering', async () => {
    const user = userEvent.setup()
    mockGetRandomMemory.mockResolvedValue({
      ...initialMemory,
      experienceId: 'memory-two',
      title: 'Nova lembrança',
    })

    render(<MemorySection initialMemory={initialMemory} />)

    expect(
      screen.getByAltText('Imagem não disponível para Primeira lembrança').getAttribute('src'),
    ).toContain('url=%2Fnot-found.png')
    expect(screen.getByAltText('Imagem não disponível para Primeira lembrança')).toHaveAttribute(
      'sizes',
      '(min-width: 768px) 288px, 100vw',
    )
    expect(screen.getByAltText('Imagem não disponível para Primeira lembrança')).toHaveAttribute(
      'loading',
      'eager',
    )

    await user.click(screen.getByRole('button', { name: 'Relembrar' }))

    expect(await screen.findByText('Nova lembrança')).toBeInTheDocument()
    expect(mockGetRandomMemory).toHaveBeenCalledWith('memory-one')
  })
})
