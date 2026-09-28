import { LoginForm } from '@/features/auth/components/LoginForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { mockFetch, mockPush, mockUseRouter } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
  mockPush: vi.fn(),
  mockUseRouter: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: mockUseRouter,
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', mockFetch)
    mockUseRouter.mockReturnValue({ push: mockPush })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows an error and does not redirect for invalid credentials', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValue({ status: 401 })

    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), 'wrong-password')
    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('E-mail ou senha incorretos.')
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({ method: 'POST' }),
    )
    expect(mockPush).not.toHaveBeenCalled()
  })
})
