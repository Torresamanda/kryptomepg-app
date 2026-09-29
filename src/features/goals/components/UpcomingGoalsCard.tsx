import { PlusIcon } from '@/assets/icons'
import { Button } from '@/components/ui/Button'
import type { Goal } from '../types/Goal'
import { GoalItem } from './GoalItem'

interface UpcomingGoalsCardProps {
  goals: Goal[]
  error: string | null
  onToggleCompletion: (goalId: string, completed: boolean) => void
  onNewGoal: () => void
  onViewAll: () => void
}

export function UpcomingGoalsCard({
  goals,
  error,
  onToggleCompletion,
  onNewGoal,
  onViewAll,
}: UpcomingGoalsCardProps) {
  return (
    <section
      className="rounded-lg border border-border-default bg-background-secondary p-5 sm:p-7"
      aria-labelledby="upcoming-goals-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="upcoming-goals-title" className="text-2xl font-semibold">
            Próximas metas
          </h2>

          <p className="mt-2 text-sm text-text-secondary">Objetivos pessoais e compartilhados</p>
        </div>

        <Button variant="ghost" onClick={onNewGoal} className="shrink-0 gap-2 ">
          <PlusIcon size={18} aria-hidden="true" />
          Nova meta
        </Button>
      </div>

      <div className="mt-6 grid gap-3">
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} onToggleCompletion={onToggleCompletion} />
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onViewAll}
        className="mt-6 cursor-pointer text-sm text-text-secondary underline underline-offset-4 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        Ver todas as metas →
      </button>
    </section>
  )
}
