import { Button } from '@/components/ui/Button'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import type { RandomMemory } from '../types/RandomMemory'

interface MemoryCardProps {
  memory: RandomMemory
  onRemember: () => void
  remembering: boolean
}

function formatElapsedTime(completedAt: string) {
  const completedDate = new Date(completedAt)
  const now = new Date()
  let years = now.getFullYear() - completedDate.getFullYear()
  const hasNotReachedAnniversary =
    now.getMonth() < completedDate.getMonth() ||
    (now.getMonth() === completedDate.getMonth() && now.getDate() < completedDate.getDate())

  if (hasNotReachedAnniversary) years -= 1

  if (years > 0) return `Há ${years} ${years === 1 ? 'ano' : 'anos'}...`

  const months =
    (now.getFullYear() - completedDate.getFullYear()) * 12 +
    now.getMonth() -
    completedDate.getMonth()

  if (months > 0) return `Há ${months} ${months === 1 ? 'mês' : 'meses'}...`

  const days = Math.max(
    1,
    Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24)),
  )

  return `Há ${days} ${days === 1 ? 'dia' : 'dias'}...`
}

export function MemoryCard({ memory, onRemember, remembering }: MemoryCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-border-default bg-background-secondary md:flex">
      <div className="relative h-48 w-full shrink-0 md:h-auto md:w-72">
        <ImageWithFallback
          src={memory.coverImageUrl}
          alt={
            memory.coverImageUrl
              ? `Capa de ${memory.title}`
              : `Imagem não disponível para ${memory.title}`
          }
          className="object-cover"
          loading="eager"
          sizes="(min-width: 768px) 288px, 100vw"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
        <p className="text-xs font-medium uppercase text-text-secondary">Lembranças</p>
        <h2 className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
          {formatElapsedTime(memory.completedAt)}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Vocês concluíram <span className="font-medium text-brand-purple-300">{memory.title}</span>
        </p>

        {memory.comment && (
          <blockquote className="mt-4 rounded-sm border border-border-default bg-surface-elevated px-3 py-2 text-sm text-text-secondary">
            {memory.comment}
          </blockquote>
        )}

        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onRemember} disabled={remembering}>
            {remembering ? 'Buscando...' : 'Relembrar'}
          </Button>
        </div>
      </div>
    </article>
  )
}
