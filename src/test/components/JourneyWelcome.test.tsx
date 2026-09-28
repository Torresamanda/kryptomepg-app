import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { JourneyWelcome } from '@/features/journey/components/JourneyWelcome'

const { mockOpen } = vi.hoisted(() => ({ mockOpen: vi.fn() }))

vi.mock('@/hooks/useQueryDrawer/useQueryDrawer', () => ({
  useQueryDrawer: () => ({ open: mockOpen }),
}))

describe('JourneyWelcome', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    ['Bom dia', 5],
    ['Boa tarde', 12],
    ['Boa noite', 18],
  ])('shows %s at %i:00', (expectedGreeting, hour) => {
    vi.setSystemTime(new Date(2026, 8, 28, hour))

    render(<JourneyWelcome userName="Amanda e Bryan" />)

    expect(
      screen.getByRole('heading', { name: `${expectedGreeting}, Amanda e Bryan` }),
    ).toBeInTheDocument()
  })

  it('opens the new-experience drawer from its desktop button', () => {
    vi.setSystemTime(new Date(2026, 8, 28, 9))

    render(<JourneyWelcome userName="Amanda e Bryan" />)

    fireEvent.click(screen.getByRole('button', { name: 'Nova experiência' }))

    expect(mockOpen).toHaveBeenCalledOnce()
  })
})
