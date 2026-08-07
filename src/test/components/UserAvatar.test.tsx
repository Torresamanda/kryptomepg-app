import { UserAvatar } from '@/components/ui/UserAvatar'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/assets/icons', () => ({
  FemaleAvatarIcon: () => <svg data-testid="female-avatar-icon" />,
  MaleAvatarIcon: () => <svg data-testid="male-avatar-icon" />,
}))

describe('UserAvatar', () => {
  it('renders the female avatar icon for the female variant', () => {
    render(<UserAvatar variant="female" />)

    expect(screen.getByTestId('female-avatar-icon')).toBeVisible()
    expect(screen.queryByTestId('male-avatar-icon')).not.toBeInTheDocument()
  })

  it('renders the male avatar icon for the male variant', () => {
    render(<UserAvatar variant="male" />)

    expect(screen.getByTestId('male-avatar-icon')).toBeVisible()
    expect(screen.queryByTestId('female-avatar-icon')).not.toBeInTheDocument()
  })
})
