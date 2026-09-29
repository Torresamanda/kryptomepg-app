import { Modal } from '@/components/ui/Modal'
import { DrawerStackProvider } from '@/context/DrawerStackContext/DrawerStackContext'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

describe('Modal', () => {
  it('exposes its content as a dialog when open', () => {
    render(
      <DrawerStackProvider>
        <Modal open={true} onClose={vi.fn()} title="Nova meta">
          Conteúdo do modal
        </Modal>
      </DrawerStackProvider>,
    )

    expect(screen.getByRole('dialog', { name: 'Nova meta' })).toBeVisible()
    expect(screen.getByText('Conteúdo do modal')).toBeVisible()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <DrawerStackProvider>
        <Modal open={true} onClose={onClose} title="Nova meta" />
      </DrawerStackProvider>,
    )

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes when its backdrop is clicked and focuses the close button', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <DrawerStackProvider>
        <Modal open={true} onClose={onClose} title="Nova meta" />
      </DrawerStackProvider>,
    )

    const closeButton = screen.getByRole('button', { name: 'Fechar modal' })
    await waitFor(() => expect(document.activeElement).toBe(closeButton))

    await user.click(screen.getByRole('button', { name: 'Fechar modal: Nova meta' }))

    expect(onClose).toHaveBeenCalledOnce()
  })
})
