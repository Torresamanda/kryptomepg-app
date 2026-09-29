import { ActivityCalendar } from './ActivityCalendar'
import { ActivitySummary } from './ActivitySummary'
import type { MonthlyActivity } from '../types/MonthlyActivity'

interface MonthlyActivityCardProps {
  activity: MonthlyActivity
}

function formatMonth(month: string) {
  const [year, monthNumber] = month.split('-').map(Number)
  const date = new Date(year, monthNumber - 1, 1)

  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date)
}

export function MonthlyActivityCard({ activity }: MonthlyActivityCardProps) {
  return (
    <section
      aria-labelledby="monthly-activity-title"
      className="flex h-full flex-col rounded-lg border border-border-default bg-background-secondary p-5 sm:p-7"
    >
      <h2 id="monthly-activity-title" className="text-2xl font-semibold text-text-primary">
        Atividades deste mês
      </h2>

      <p className="mt-2 text-sm text-text-secondary">
        Sua consistência em {formatMonth(activity.month)}
      </p>

      <div className="mt-7 flex min-h-0 flex-1 flex-col gap-6 md:flex-row">
        <ActivityCalendar dailyRecords={activity.dailyRecords} month={activity.month} />
        <ActivitySummary summary={activity.summary} />
      </div>
    </section>
  )
}
