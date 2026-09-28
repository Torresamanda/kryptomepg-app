import { NotAuthenticatedState } from '@/features/auth/components/NotAuthenticatedState'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('NotAuthenticatedState', () => {
  it('shows the 401 state and offers the login link', () => {
    render(<NotAuthenticatedState />)

    expect(screen.getByText('ERRO 401')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Ir para login' })).toHaveAttribute('href', '/')
  })
})
