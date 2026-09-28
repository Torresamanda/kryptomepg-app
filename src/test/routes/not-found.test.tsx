import NotFound from '@/app/not-found'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockGetCurrentUser } = vi.hoisted(() => ({
  mockGetCurrentUser: vi.fn(),
}))

vi.mock('@/features/auth/services/getCurrentUser', () => ({
  getCurrentUser: mockGetCurrentUser,
}))

describe('NotFound', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('offers the journey link for an authenticated user', async () => {
    mockGetCurrentUser.mockResolvedValue({
      id: 'user-1',
      name: 'Ana',
      avatarVariant: 'female',
    })

    render(await NotFound())

    expect(screen.getByRole('link', { name: 'Voltar para Nossa Jornada' })).toHaveAttribute(
      'href',
      '/nossa-jornada',
    )
  })

  it('offers the login link for an unauthenticated user', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    render(await NotFound())

    expect(screen.getByRole('link', { name: 'Ir para login' })).toHaveAttribute('href', '/')
  })
})
