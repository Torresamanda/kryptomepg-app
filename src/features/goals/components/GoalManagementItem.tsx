'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, PencilSimpleIcon, TrashIcon } from '@/assets/icons'
import { Button } from '@/components/ui/Button'
import type { Goal } from '../types/Goal'

interface GoalManagementItemProps {
  goal: Goal
  onDelete: (goal: Goal) => void
  onEdit: (goal: Goal) => void
  onToggleCompletion: (goalId: string, completed: boolean) => void
}

export function GoalManagementItem({
  goal,
  onDelete,
  onEdit,
  onToggleCompletion,
}: GoalManagementItemProps) {
  const [now, setNow] = useState(Date.now)
  const isCompleted = goal.status === 'completed'
  const reversibleUntil = goal.completionReversibleUntil

  useEffect(() => {
    if (!reversibleUntil) return

    const millisecondsUntilExpiry = new Date(reversibleUntil).getTime() - Date.now()
    if (millisecondsUntilExpiry <= 0) return

    const timer = window.setTimeout(() => setNow(Date.now()), millisecondsUntilExpiry)
    return () => window.clearTimeout(timer)
  }, [reversibleUntil])

  const canUndo = reversibleUntil !== null && new Date(reversibleUntil).getTime() > now
  const isDisabled = isCompleted && !canUndo

  return (
    <li className="flex items-center gap-3 rounded-lg bg-surface-elevated px-3 py-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={isCompleted}
        aria-label={`${isCompleted ? 'Marcar como pendente' : 'Concluir meta'}: ${goal.title}`}
        disabled={isDisabled}
        onClick={() => onToggleCompletion(goal.id, !isCompleted)}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus ${
          isCompleted
            ? 'border-success bg-success text-text-primary'
            : 'border-text-muted bg-transparent text-text-secondary'
        } ${isDisabled ? '' : 'cursor-pointer'}`}
      >
        {isCompleted && <CheckIcon size={14} weight="bold" aria-hidden="true" />}
      </button>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => onToggleCompletion(goal.id, !isCompleted)}
        aria-label={`${isCompleted ? 'Marcar como pendente' : 'Concluir meta'}: ${goal.title}`}
        className={`min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus ${
          isDisabled ? '' : 'cursor-pointer'
        }`}
      >
        <p
          className={`wrap-break-words text-sm ${isCompleted ? 'text-text-secondary line-through' : 'text-text-primary'}`}
        >
          {goal.title}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          {goal.audience === 'personal' ? 'Minha meta' : 'Nossa meta'}
        </p>
      </button>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(goal)}
          aria-label={`Editar meta: ${goal.title}`}
        >
          <PencilSimpleIcon size={18} aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(goal)}
          aria-label={`Excluir meta: ${goal.title}`}
        >
          <TrashIcon size={18} aria-hidden="true" />
        </Button>
      </div>
    </li>
  )
}
