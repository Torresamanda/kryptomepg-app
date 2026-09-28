import type { Goal } from '../types/Goal'

interface GoalItemProps {
  goal: Goal
  onComplete: (goalId: string) => void
}

export function GoalItem({ goal, onComplete }: GoalItemProps) {
  const completed = goal.status === 'completed'
  return (
    <label className="flex items-center gap-3 rounded-lg bg-surface-elevated px-3 py-3 text-sm text-text-primary">
      <input
        type="checkbox"
        checked={completed}
        disabled={completed}
        onChange={() => onComplete(goal.id)}
        className="size-5 accent-success"
        aria-label={`Concluir meta: ${goal.title}`}
      />
      <span className={completed ? 'text-text-secondary line-through' : ''}>{goal.title}</span>
      <span className="ml-auto text-text-muted">
        {goal.audience === 'personal' ? 'Minha meta' : 'Nossa meta'}
      </span>
    </label>
  )
}
