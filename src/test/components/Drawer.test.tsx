import { Drawer } from '@/components/ui/Drawer'
import { DrawerStackProvider } from '@/context/DrawerStackContext/DrawerStackContext'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

describe('Drawer', () => {
  it('exposes the dialog when open', () => {
    render(
      <DrawerStackProvider>
        <Drawer open={true} onClose={vi.fn()} title={'Adicionar Experiências'}>
          Conteúdo do Painel
        </Drawer>
      </DrawerStackProvider>,
    )

    expect(screen.getByRole('dialog', { name: 'Adicionar Experiências' })).toBeVisible()
  })

  it('renders its children when open', () => {
    render(
      <DrawerStackProvider>
        <Drawer open={true} onClose={vi.fn()} title={'Adicionar Experiências'}>
          Conteúdo do Painel
        </Drawer>
      </DrawerStackProvider>,
    )

    expect(screen.getByText('Conteúdo do Painel')).toBeVisible()
  })

  it('does not expose the dialog when closed', () => {
    render(
      <DrawerStackProvider>
        <Drawer open={false} onClose={vi.fn()} title={'Adicionar Experiências'}>
          Conteúdo do Painel
        </Drawer>
      </DrawerStackProvider>,
    )

    expect(screen.queryByRole('dialog', { name: 'Adicionar Experiências' })).not.toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()

    render(
      <DrawerStackProvider>
        <Drawer open={true} onClose={handleClose} title={'Adicionar Experiências'}>
          Conteúdo do Painel
        </Drawer>
      </DrawerStackProvider>,
    )

    const closeButton = screen.getByRole('button', { name: 'Fechar painel' })

    await user.click(closeButton)

    expect(handleClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when the drawer is closed via the dark overlay', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()

    render(
      <DrawerStackProvider>
        <Drawer open={true} onClose={handleClose} title={'Adicionar Experiências'}>
          Conteúdo do Painel
        </Drawer>
      </DrawerStackProvider>,
    )

    const backdrop = screen.getByRole('button', { name: 'Fechar painel: Adicionar Experiências' })

    await user.click(backdrop)

    expect(handleClose).toHaveBeenCalledOnce()
  })

  it('closes only the top drawer when Escape is pressed', async () => {
    const user = userEvent.setup()
    const handleFirstClose = vi.fn()
    const handleSecondClose = vi.fn()

    render(
      <DrawerStackProvider>
        <Drawer open={true} onClose={handleFirstClose} title={'Primeiro Painel'}>
          Primeiro Conteúdo
        </Drawer>

        <Drawer open={true} onClose={handleSecondClose} title={'Segundo Painel'}>
          Segundo conteúdo
        </Drawer>
      </DrawerStackProvider>,
    )

    await user.keyboard('{Escape}')

    expect(handleFirstClose).not.toHaveBeenCalled()
    expect(handleSecondClose).toHaveBeenCalledOnce()
  })
})
