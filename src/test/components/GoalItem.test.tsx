import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { GoalItem } from '@/features/goals/components/GoalItem'

describe('GoalItem', () => {
  it('shows the audience tag and completes an active goal', async () => {
    const user = userEvent.setup()
    const onComplete = vi.fn()

    render(
      <GoalItem
        goal={{
          id: 'goal-1',
          title: 'Assistir Interestelar',
          audience: 'shared',
          status: 'active',
          createdAt: '2026-09-28T12:00:00Z',
          completedAt: null,
        }}
        onComplete={onComplete}
      />,
    )

    expect(screen.getByText('Nossa meta')).toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: 'Concluir meta: Assistir Interestelar' }))
    expect(onComplete).toHaveBeenCalledWith('goal-1')
  })
})
