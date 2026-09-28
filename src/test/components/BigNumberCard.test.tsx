import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BigNumberCard } from '@/components/ui/BigNumberCard'

describe('BigNumberCard', () => {
  it('renders the provided value and label', () => {
    render(<BigNumberCard label="Jogos registrados" value={138} />)

    expect(screen.getByText('138')).toBeInTheDocument()
    expect(screen.getByText('Jogos registrados')).toBeInTheDocument()
    expect(screen.getByText('138')).toHaveClass('font-sans')
  })

  it('accepts classes for adapting the value appearance', () => {
    render(
      <BigNumberCard label="Início da jornada" value={2026} valueClassName="text-brand-gold-500" />,
    )

    expect(screen.getByText('2026')).toHaveClass('text-brand-gold-500')
  })
})
