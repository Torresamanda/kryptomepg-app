import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders its content', () => {
    render(<Button>Salvar</Button>)

    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveClass('rounded-sm')
  })

  it('calls the click handler when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Salvar</Button>)

    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('supports the reusable outline variant', () => {
    render(<Button variant="outline">Relembrar</Button>)

    expect(screen.getByRole('button', { name: 'Relembrar' })).toHaveClass('border-brand-purple-500')
  })

  it('does not call the click handler when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Salvar
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Salvar' })

    expect(button).toBeDisabled()

    await user.click(button)

    expect(handleClick).not.toHaveBeenCalledOnce()
  })

  it('does not submit a form by default', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        <Button>Salvar</Button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('submits a form when its type is submit', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        <Button type="submit">Salvar</Button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(handleSubmit).toHaveBeenCalledOnce()
  })
})
