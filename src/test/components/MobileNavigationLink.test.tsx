import { MobileNavigationLink } from '@/components/layout/MobileNavigationLink'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

describe('MobileNavigationLink', () => {
  it('renders the correct destination', () => {
    render(
      <MobileNavigationLink
        active={false}
        href="/nossa-jornada"
        label="Nossa Jornada"
        onNavigate={vi.fn()}
      >
        <span>Ícone</span>
      </MobileNavigationLink>,
    )

    const link = screen.getByRole('link', { name: 'Nossa Jornada' })

    expect(link).toHaveAttribute('href', '/nossa-jornada')
  })

  it('marks the active item as the current page', () => {
    render(
      <MobileNavigationLink
        active={true}
        href="/nossa-jornada"
        label="Nossa Jornada"
        onNavigate={vi.fn()}
      >
        <span>Ícone</span>
      </MobileNavigationLink>,
    )

    expect(screen.getByRole('link', { name: 'Nossa Jornada' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('does not mark an inactive item as the current page', () => {
    render(
      <MobileNavigationLink
        active={false}
        href="/biblioteca"
        label="Biblioteca"
        onNavigate={vi.fn()}
      >
        <span>Ícone</span>
      </MobileNavigationLink>,
    )

    expect(screen.getByRole('link', { name: 'Biblioteca' })).not.toHaveAttribute('aria-current')
  })

  it('calls onNavigate with its destination when clicked', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()

    render(
      <MobileNavigationLink
        active={false}
        href="/nossa-jornada"
        label="Nossa Jornada"
        onNavigate={onNavigate}
      >
        <span>Ícone</span>
      </MobileNavigationLink>,
    )

    await user.click(screen.getByRole('link', { name: 'Nossa Jornada' }))

    expect(onNavigate).toHaveBeenCalledWith('/nossa-jornada')
  })
})
