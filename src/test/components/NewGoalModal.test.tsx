import { DrawerStackProvider } from '@/context/DrawerStackContext/DrawerStackContext'
import { NewGoalModal } from '@/features/goals/components/NewGoalModal'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockCreateGoal, mockNotifyPromise } = vi.hoisted(() => ({
  mockCreateGoal: vi.fn(),
  mockNotifyPromise: vi.fn((operation: Promise<unknown>) => operation),
}))

vi.mock('@/features/goals/services/createGoal', () => ({
  createGoal: mockCreateGoal,
}))

vi.mock('@/components/feedback/toast/notify', () => ({
  notify: { promise: mockNotifyPromise },
}))

function renderModal(onCreated = vi.fn(), onClose = vi.fn()) {
  render(
    <DrawerStackProvider>
      <NewGoalModal open={true} onClose={onClose} onCreated={onCreated} />
    </DrawerStackProvider>,
  )

  return { onClose, onCreated }
}

describe('NewGoalModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('uses a loading, success, and error notification contract while creating a goal', async () => {
    const user = userEvent.setup()
    let resolveCreation: (goal: { id: string; title: string }) => void = () => {}
    mockCreateGoal.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreation = resolve
        }),
    )
    const { onClose, onCreated } = renderModal()

    await user.type(screen.getByLabelText('Título'), 'Assistir Interestelar')
    await user.click(screen.getByRole('button', { name: 'Salvar meta' }))

    expect(mockNotifyPromise).toHaveBeenCalledWith(expect.any(Promise), {
      loading: 'Criando meta...',
      success: 'Meta adicionada com sucesso.',
      error: 'Não foi possível adicionar a meta. Tente novamente.',
    })
    expect(screen.getByRole('button', { name: 'Criando meta...' })).toBeDisabled()

    await act(async () => {
      resolveCreation({ id: 'goal-1', title: 'Assistir Interestelar' })
    })

    expect(onCreated).toHaveBeenCalledWith({ id: 'goal-1', title: 'Assistir Interestelar' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('keeps the modal open when goal creation fails after showing the error toast', async () => {
    const user = userEvent.setup()
    mockCreateGoal.mockRejectedValue(new Error('Service unavailable'))
    const { onClose, onCreated } = renderModal()

    await user.type(screen.getByLabelText('Título'), 'Assistir Interestelar')
    await user.click(screen.getByRole('button', { name: 'Salvar meta' }))

    expect(mockNotifyPromise).toHaveBeenCalledWith(expect.any(Promise), {
      loading: 'Criando meta...',
      success: 'Meta adicionada com sucesso.',
      error: 'Não foi possível adicionar a meta. Tente novamente.',
    })
    expect(onCreated).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog', { name: 'Nova meta' })).toBeVisible()
  })

  it('keeps title validation next to the field without creating a toast', async () => {
    const user = userEvent.setup()
    renderModal()

    await user.click(screen.getByRole('button', { name: 'Salvar meta' }))

    expect(screen.getByText('O título da meta é obrigatório.')).toBeVisible()
    expect(mockCreateGoal).not.toHaveBeenCalled()
    expect(mockNotifyPromise).not.toHaveBeenCalled()
  })
})
