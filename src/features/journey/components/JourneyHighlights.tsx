import { BigNumberCard } from '@/components/ui/BigNumberCard'
import type { JourneyHighlights as JourneyHighlightsData } from '../types/JourneyHighlights'

interface JourneyHighlightsProps {
  highlights: JourneyHighlightsData
}

export function JourneyHighlights({ highlights }: JourneyHighlightsProps) {
  const cards = [
    { label: 'Jogos registrados', value: highlights.gamesRegistered },
    { label: 'Livros lidos', value: highlights.booksRead },
    { label: 'Experiências compartilhadas', value: highlights.sharedExperiences },
    { label: 'Início da jornada', value: highlights.journeyStartedYear },
  ]

  return (
    <section
      aria-labelledby="journey-highlights-title"
      className="flex h-full flex-col rounded-lg border border-border-default bg-background-secondary p-5 sm:p-7"
    >
      <h2 id="journey-highlights-title" className="text-2xl font-semibold text-text-primary">
        Nossa jornada
      </h2>
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex-1 lg:auto-rows-fr">
        {cards.map((card) => (
          <BigNumberCard key={card.label} label={card.label} value={card.value} />
        ))}
      </div>
    </section>
  )
}
