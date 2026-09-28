import type { DailyRecordCount } from '../types/MonthlyActivity'

interface ActivityCalendarProps {
  dailyRecords: DailyRecordCount[]
  month: string
}

const weekdays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM']
const monthPeriods = ['Início do mês', 'Meio do mês', 'Fim do mês']

function getIntensityClass(count: number) {
  if (count === 0) return 'bg-surface-elevated'
  if (count === 1) return 'bg-accent-blue-900'
  if (count === 2) return 'bg-accent-blue-800'
  if (count === 3) return 'bg-accent-blue-700'

  return 'bg-accent-blue-600'
}

export function ActivityCalendar({ dailyRecords, month }: ActivityCalendarProps) {
  const recordsByPeriodAndWeekday = Array.from({ length: monthPeriods.length }, () =>
    Array.from({ length: weekdays.length }, () => 0),
  )

  dailyRecords.forEach(({ count, date }) => {
    const day = Number(date.slice(-2))
    const periodIndex = day <= 10 ? 0 : day <= 20 ? 1 : 2
    const weekday = new Date(`${date}T12:00:00`).getDay()
    const weekdayIndex = weekday === 0 ? 6 : weekday - 1

    recordsByPeriodAndWeekday[periodIndex][weekdayIndex] += count
  })

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div
        className="grid w-full grid-cols-7 gap-2 text-center text-xs text-text-secondary"
        aria-hidden="true"
      >
        {weekdays.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <ol className="mt-4 grid w-full grid-cols-7 gap-2" aria-label={`Registros de ${month}`}>
        {monthPeriods.flatMap((period, periodIndex) =>
          weekdays.map((weekday, weekdayIndex) => {
            const count = recordsByPeriodAndWeekday[periodIndex][weekdayIndex]

            return (
              <li
                key={`${period}-${weekday}`}
                className={`aspect-square w-full rounded-lg transition-[filter,transform] duration-200 hover:scale-105 hover:brightness-110 ${getIntensityClass(count)}`}
                aria-label={`${period}, ${weekday}: ${count} ${count === 1 ? 'registro' : 'registros'}`}
              />
            )
          }),
        )}
      </ol>

      <div
        className="mt-auto flex items-center gap-2 pt-5 text-sm text-text-secondary"
        aria-hidden="true"
      >
        <span>Menos</span>
        {[1, 2, 3, 4].map((count) => (
          <span key={count} className={`size-5 rounded-lg lg:size-4 ${getIntensityClass(count)}`} />
        ))}
        <span>Mais</span>
      </div>
    </div>
  )
}
