import type { MonthlyActivitySummary } from '../types/MonthlyActivity'

interface ActivitySummaryProps {
  summary: MonthlyActivitySummary
}

const summaryItems = [
  { key: 'activeDays', label: 'dias ativos' },
  { key: 'longestStreak', label: 'melhor sequência' },
  { key: 'totalRecords', label: 'registros no mês' },
] as const

export function ActivitySummary({ summary }: ActivitySummaryProps) {
  return (
    <dl className="grid grid-cols-3 gap-4 border-t border-border-default pt-5 md:flex md:h-full md:w-36 md:flex-col md:justify-between md:border-l md:border-t-0 md:pl-6 md:pt-0">
      {summaryItems.map(({ key, label }) => (
        <div key={key}>
          <dd className="text-2xl font-bold leading-none text-text-primary">{summary[key]}</dd>
          <dt className="mt-2 text-sm text-text-secondary">{label}</dt>
        </div>
      ))}
    </dl>
  )
}
