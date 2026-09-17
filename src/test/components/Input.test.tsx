import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from '@/components/ui/Input'

describe('Input', () => {
  it('associates its label and error message with the input', () => {
    render(<Input label="E-mail" error="Preencha seu e-mail." />)

    const input = screen.getByRole('textbox', { name: 'E-mail' })

    expect(input).toHaveAccessibleErrorMessage('Preencha seu e-mail.')
    expect(input).toBeInvalid()
  })
})
