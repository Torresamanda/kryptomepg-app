'use client'

import { useCallback, useEffect, useState } from 'react'
import { PlusIcon } from '@/assets/icons'
import { notify } from '@/components/feedback/toast/notify'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { FilterMenu } from '@/components/ui/FilterMenu'
import { Modal } from '@/components/ui/Modal'
import { SearchInput } from '@/components/ui/SearchInput'
import { completeGoals } from '../services/completeGoals'
import { deleteGoal } from '../services/deleteGoal'
import { getGoals } from '../services/getGoals'
import type { Goal, GoalAudienceFilter } from '../types/Goal'
import { GoalManagementItem } from './GoalManagementItem'
import { NewGoalModal } from './NewGoalModal'

const audienceOptions = [
  { value: 'all', label: 'Todas as metas' },
  { value: 'personal', label: 'Minha meta' },
  { value: 'shared', label: 'Nossa meta' },
]

interface GoalsDrawerProps {
  onClose: () => void
  onGoalsChanged: () => Promise<void> | void
  open: boolean
}

export function GoalsDrawer({ onClose, onGoalsChanged, open }: GoalsDrawerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [audience, setAudience] = useState<GoalAudienceFilter>('all')
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadGoals = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      setGoals(await getGoals({ audience, query }))
    } catch {
      setError('Não foi possível carregar as metas. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [audience, query])

  useEffect(() => {
    if (!open) return

    const requestTimer = window.setTimeout(() => void loadGoals(), 0)
    return () => window.clearTimeout(requestTimer)
  }, [loadGoals, open])

  const handleSaved = async () => {
    await Promise.all([loadGoals(), onGoalsChanged()])
  }

  const handleDelete = async () => {
    if (!deletingGoal) return

    setIsDeleting(true)
    try {
      await notify.promise(deleteGoal(deletingGoal.id), {
        loading: 'Excluindo meta...',
        success: 'Meta excluída com sucesso.',
        error: 'Não foi possível excluir a meta. Tente novamente.',
      })
      setDeletingGoal(null)
      await Promise.all([loadGoals(), onGoalsChanged()])
    } catch {
      // The toast already communicates an asynchronous operation failure.
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleCompletion = async (goalId: string, completed: boolean) => {
    setError(null)

    try {
      const [updatedGoal] = await completeGoals([{ goalId, completed }])
      setGoals((currentGoals) =>
        currentGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)),
      )
      await onGoalsChanged()
    } catch {
      setError('Não foi possível atualizar a meta. Tente novamente.')
    }
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        size="wide"
        eyebrow="METAS"
        title="Todas as metas"
        contentClassName="flex min-h-0 flex-1 flex-col"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchInput
              label="Pesquisar metas"
              placeholder="Pesquise aqui..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <FilterMenu
            value={audience}
            clearValue="all"
            options={audienceOptions}
            onChange={(value) => setAudience(value as GoalAudienceFilter)}
          />
          <Button
            onClick={() => {
              setEditingGoal(null)
              setIsGoalModalOpen(true)
            }}
            className="min-h-12 shrink-0 gap-2"
            title="Nova meta"
          >
            <PlusIcon size={18} aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
          {isLoading ? (
            <p className="text-sm text-text-secondary">Carregando metas...</p>
          ) : error ? (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          ) : goals.length === 0 ? (
            <p className="text-sm text-text-secondary">Nenhuma meta encontrada.</p>
          ) : (
            <ul className="grid gap-3">
              {goals.map((goal) => (
                <GoalManagementItem
                  key={goal.id}
                  goal={goal}
                  onEdit={(selectedGoal) => {
                    setEditingGoal(selectedGoal)
                    setIsGoalModalOpen(true)
                  }}
                  onDelete={setDeletingGoal}
                  onToggleCompletion={handleToggleCompletion}
                />
              ))}
            </ul>
          )}
        </div>
      </Drawer>

      {isGoalModalOpen && (
        <NewGoalModal
          key={editingGoal?.id ?? 'new-goal'}
          goal={editingGoal ?? undefined}
          open={isGoalModalOpen}
          onClose={() => setIsGoalModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      <Modal
        open={Boolean(deletingGoal)}
        onClose={() => setDeletingGoal(null)}
        eyebrow="EXCLUIR"
        title="Excluir meta?"
      >
        <p className="text-sm leading-6 text-text-secondary">
          A meta “{deletingGoal?.title}” será excluída permanentemente.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingGoal(null)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-error text-text-primary hover:bg-error"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir meta'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
