import { LoginForm } from '@/features/auth/components/LoginForm'
import { act, render, screen } from '@testing-library/react'
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

  it('shows field errors and does not submit when the form is empty', async () => {
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(screen.getByText('Preencha seu e-mail.')).toBeVisible()
    expect(screen.getByText('Preencha sua senha.')).toBeVisible()
    expect(screen.getByLabelText('E-mail')).toBeInvalid()
    expect(screen.getByLabelText('Senha')).toBeInvalid()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('shows an error and does not submit for an invalid email', async () => {
    const user = userEvent.setup()

    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'ana@')
    await user.type(screen.getByLabelText('Senha'), 'valid-password')
    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(screen.getByText('Digite um e-mail válido.')).toBeVisible()
    expect(screen.getByLabelText('E-mail')).toBeInvalid()
    expect(screen.getByLabelText('Senha')).toBeValid()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('redirects to the journey after a successful login', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValue({ status: 200, ok: true })

    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), 'valid-password')
    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'user@example.com', password: 'valid-password' }),
      }),
    )
    expect(mockPush).toHaveBeenCalledWith('/nossa-jornada')
  })

  it('shows a generic error and does not redirect when the server fails', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValue({ status: 500, ok: false })

    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), 'valid-password')
    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível entrar agora. Tente novamente.',
    )
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('shows a generic error and does not redirect when the request fails', async () => {
    const user = userEvent.setup()
    mockFetch.mockRejectedValue(new Error('Network error'))

    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), 'valid-password')
    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível entrar agora. Tente novamente.',
    )
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('disables the form while the login request is pending', async () => {
    const user = userEvent.setup()
    let resolveRequest: (response: { status: number; ok: boolean }) => void = () => {}

    mockFetch.mockImplementation(
      () =>
        new Promise<{ status: number; ok: boolean }>((resolve) => {
          resolveRequest = resolve
        }),
    )

    render(<LoginForm />)

    await user.type(screen.getByLabelText('E-mail'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), 'valid-password')
    await user.click(screen.getByRole('button', { name: 'Entrar na jornada' }))

    expect(await screen.findByRole('button', { name: 'Entrando...' })).toBeDisabled()
    expect(screen.getByLabelText('E-mail')).toBeDisabled()
    expect(screen.getByLabelText('Senha')).toBeDisabled()

    await act(async () => {
      resolveRequest({ status: 200, ok: true })
    })
  })
})
