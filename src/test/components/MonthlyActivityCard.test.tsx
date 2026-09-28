import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MonthlyActivityCard } from '@/features/journey/components/MonthlyActivityCard'

describe('MonthlyActivityCard', () => {
  it('shows the month, summary, and daily record labels', () => {
    render(
      <MonthlyActivityCard
        activity={{
          month: '2026-07',
          timeZone: 'America/Sao_Paulo',
          summary: {
            activeDays: 14,
            longestStreak: 8,
            totalRecords: 23,
          },
          dailyRecords: [
            { date: '2026-07-01', count: 1 },
            { date: '2026-07-02', count: 3 },
          ],
        }}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Atividades deste mês' })).toBeInTheDocument()
    expect(screen.getByText('Sua consistência em julho de 2026')).toBeInTheDocument()
    expect(screen.getByText('dias ativos')).toBeInTheDocument()
    expect(screen.getByText('melhor sequência')).toBeInTheDocument()
    expect(screen.getByText('registros no mês')).toBeInTheDocument()
    expect(screen.getByLabelText('Início do mês, QUI: 3 registros')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(21)
    expect(screen.getByLabelText('Início do mês, QUI: 3 registros')).toHaveClass('hover:scale-105')
  })
})
