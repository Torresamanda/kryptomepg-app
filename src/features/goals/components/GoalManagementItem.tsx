import { PencilSimpleIcon, TrashIcon } from '@/assets/icons'
import { Button } from '@/components/ui/Button'
import type { Goal } from '../types/Goal'

interface GoalManagementItemProps {
  goal: Goal
  onDelete: (goal: Goal) => void
  onEdit: (goal: Goal) => void
}

export function GoalManagementItem({ goal, onDelete, onEdit }: GoalManagementItemProps) {
  const isCompleted = goal.status === 'completed'

  return (
    <li className="flex items-center gap-3 rounded-lg bg-surface-elevated px-3 py-3">
      <span
        aria-label={isCompleted ? 'Meta concluída' : 'Meta pendente'}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
          isCompleted
            ? 'border-success bg-success text-text-primary'
            : 'border-text-muted text-transparent'
        }`}
      >
        ✓
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`wrap-break-words text-sm ${isCompleted ? 'text-text-secondary line-through' : 'text-text-primary'}`}
        >
          {goal.title}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          {goal.audience === 'personal' ? 'Minha meta' : 'Nossa meta'}
        </p>
      </div>
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
