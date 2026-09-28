import GlobalError from '@/app/error'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

describe('GlobalError', () => {
  it('shows a short error identifier and resets when retrying', async () => {
    const user = userEvent.setup()
    const reset = vi.fn()

    const error = Object.assign(new Error('Unexpected error'), { digest: 'abc123456789' })

    render(<GlobalError error={error} reset={reset} />)

    expect(screen.getByText('Error ID: ABC12345')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))

    expect(reset).toHaveBeenCalledOnce()
  })

  it('offers a link to the login page', () => {
    render(<GlobalError error={new Error('Unexpected error')} reset={vi.fn()} />)

    expect(screen.getByRole('link', { name: 'Ir para login' })).toHaveAttribute('href', '/')
  })
})
