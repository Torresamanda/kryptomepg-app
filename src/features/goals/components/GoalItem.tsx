'use client'

import { useEffect, useState } from 'react'
import { CheckIcon } from '@/assets/icons'
import type { Goal } from '../types/Goal'

interface GoalItemProps {
  goal: Goal
  onToggleCompletion: (goalId: string, completed: boolean) => void
}

export function GoalItem({ goal, onToggleCompletion }: GoalItemProps) {
  const [now, setNow] = useState(Date.now)
  const completed = goal.status === 'completed'
  const reversibleUntil = goal.completionReversibleUntil

  useEffect(() => {
    if (!reversibleUntil) return

    const millisecondsUntilExpiry = new Date(reversibleUntil).getTime() - Date.now()
    if (millisecondsUntilExpiry <= 0) return

    const timer = window.setTimeout(() => setNow(Date.now()), millisecondsUntilExpiry)
    return () => window.clearTimeout(timer)
  }, [reversibleUntil])

  const canUndo = reversibleUntil !== null && new Date(reversibleUntil).getTime() > now

  return (
    <label
      className={`flex items-start gap-3 rounded-lg bg-surface-elevated px-3 py-3 text-sm text-text-primary ${
        completed && !canUndo ? '' : 'cursor-pointer'
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        disabled={completed && !canUndo}
        onChange={() => onToggleCompletion(goal.id, !completed)}
        className="peer sr-only"
        aria-label={`${completed ? 'Marcar como pendente' : 'Concluir meta'}: ${goal.title}`}
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus ${
          completed
            ? 'border-success bg-success text-text-primary'
            : 'border-text-muted bg-transparent text-text-secondary'
        }`}
      >
        {completed && <CheckIcon size={14} weight="bold" />}
      </span>
      <span
        className={`min-w-0 flex-1 wrap-break-word ${completed ? 'text-text-secondary line-through' : 'text-text-secondary'}`}
      >
        {goal.title}
      </span>

      <span className="shrink-0 text-text-muted">
        {goal.audience === 'personal' ? 'Minha meta' : 'Nossa meta'}
      </span>
    </label>
  )
}
