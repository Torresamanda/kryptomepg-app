import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { GoalItem } from '@/features/goals/components/GoalItem'

describe('GoalItem', () => {
  it('shows the audience tag and completes an active goal', async () => {
    const user = userEvent.setup()
    const onToggleCompletion = vi.fn()

    render(
      <GoalItem
        goal={{
          id: 'goal-1',
          title: 'Assistir Interestelar',
          audience: 'shared',
          status: 'active',
          createdAt: '2026-09-28T12:00:00Z',
          completedAt: null,
          completionReversibleUntil: null,
        }}
        onToggleCompletion={onToggleCompletion}
      />,
    )

    expect(screen.getByText('Nossa meta')).toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: 'Concluir meta: Assistir Interestelar' }))
    expect(onToggleCompletion).toHaveBeenCalledWith('goal-1', true)
  })

  it('allows a completed goal to be unchecked before the API deadline', async () => {
    const user = userEvent.setup()
    const onToggleCompletion = vi.fn()

    render(
      <GoalItem
        goal={{
          id: 'goal-1',
          title: 'Assistir Interestelar',
          audience: 'personal',
          status: 'completed',
          createdAt: '2026-09-28T12:00:00Z',
          completedAt: '2026-09-28T12:05:00Z',
          completionReversibleUntil: new Date(Date.now() + 60_000).toISOString(),
        }}
        onToggleCompletion={onToggleCompletion}
      />,
    )

    await user.click(
      screen.getByRole('checkbox', { name: 'Marcar como pendente: Assistir Interestelar' }),
    )
    expect(onToggleCompletion).toHaveBeenCalledWith('goal-1', false)
  })
})
