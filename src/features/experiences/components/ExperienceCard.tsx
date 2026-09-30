'use client'

import {
  BookOpenIcon,
  GameControllerIcon,
  HeartIcon,
  StarIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from '@/assets/icons'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import type { Experience, ExperienceStatus } from '../types/Experience'

interface ExperienceCardProps {
  experience: Experience
  onOpenDetails: (experience: Experience) => void
  onToggleFavorite: (experience: Experience) => void
  prioritizeImage?: boolean
}

const statusPresentation: Record<
  ExperienceStatus,
  { label: string; progressClassName: string; statusClassName: string }
> = {
  playing: {
    label: 'Jogando',
    statusClassName: 'bg-brand-gold-700 text-brand-gold-100',
    progressClassName: 'bg-brand-gold-600',
  },
  reading: {
    label: 'Lendo',
    statusClassName: 'bg-info text-background-primary',
    progressClassName: 'bg-accent-blue-500',
  },
  completed: {
    label: 'Finalizado',
    statusClassName: 'bg-success text-text-primary',
    progressClassName: 'bg-success',
  },
  paused: {
    label: 'Pausado',
    statusClassName: 'bg-warning text-background-primary',
    progressClassName: 'bg-warning',
  },
  abandoned: {
    label: 'Abandonado',
    statusClassName: 'bg-error text-text-primary',
    progressClassName: 'bg-error',
  },
}

function formatUpdatedAt(value: string) {
  const today = new Date()
  const updatedAt = new Date(value)
  const differenceInDays = Math.floor(
    (new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() -
      new Date(updatedAt.getFullYear(), updatedAt.getMonth(), updatedAt.getDate()).getTime()) /
      86_400_000,
  )

  if (differenceInDays === 0) return 'Atualizado hoje'
  if (differenceInDays === 1) return 'Atualizado ontem'
  return `Atualizado há ${differenceInDays} dias`
}

function getProgressDetails(experience: Experience) {
  const progress = experience.progress
  if (!progress) return null

  const percent = Math.min(100, Math.round((progress.current / progress.total) * 100))
  if (progress.unit === 'pages') {
    return { detail: `Página ${progress.current} de ${progress.total}`, percent }
  }
  if (progress.unit === 'hours') {
    return { detail: `${progress.current}h jogadas`, percent }
  }
  return { detail: `${progress.current}% concluído`, percent }
}

function ExperienceTypeIcon({ type }: { type: Experience['type'] }) {
  if (type === 'game') return <GameControllerIcon size={18} aria-hidden="true" />
  if (type === 'book') return <BookOpenIcon size={18} aria-hidden="true" />

  return <StarIcon size={18} aria-hidden="true" />
}

export function ExperienceCard({
  experience,
  onOpenDetails,
  onToggleFavorite,
  prioritizeImage = false,
}: ExperienceCardProps) {
  const presentation = statusPresentation[experience.status]
  const progress = getProgressDetails(experience)
  const rating = experience.review?.rating
  const completedStars = rating === null || rating === undefined ? 0 : Math.round(rating / 2)
  const ownerLabel = experience.ownership === 'shared' ? 'Juntos' : experience.owner?.name

  return (
    <article
      className="flex w-64 shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-border-default bg-surface-default transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus sm:w-68 lg:w-auto"
      tabIndex={0}
      role="button"
      aria-label={`Abrir detalhes de ${experience.title}`}
      onClick={() => onOpenDetails(experience)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenDetails(experience)
        }
      }}
    >
      <div className="relative h-32 w-full shrink-0">
        <ImageWithFallback
          src={experience.coverImageUrl}
          alt={
            experience.coverImageUrl
              ? `Capa de ${experience.title}`
              : `Imagem não disponível para ${experience.title}`
          }
          className="object-cover"
          loading={prioritizeImage ? 'eager' : 'lazy'}
          sizes="(min-width: 1024px) 25vw, 256px"
        />
        <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full bg-background-primary/80 text-brand-gold-500">
          <ExperienceTypeIcon type={experience.type} />
        </span>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite(experience)
            }}
            aria-label={`${experience.favorite.isFavoriteByCurrentUser ? 'Remover' : 'Adicionar'} ${experience.title} dos favoritos`}
            aria-pressed={experience.favorite.isFavoriteByCurrentUser}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-background-primary/80 text-brand-purple-400 transition-colors hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            <HeartIcon
              size={18}
              weight={experience.favorite.isFavoriteByCurrentUser ? 'fill' : 'regular'}
              aria-hidden="true"
            />
          </button>
          {experience.type === 'game' && experience.platinumAt && (
            <span
              aria-label="Jogo platinado"
              className="flex size-8 items-center justify-center rounded-full bg-background-primary/80 text-brand-gold-400"
            >
              <TrophyIcon size={18} weight="fill" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-text-primary">
          {experience.title}
        </h3>
        <div className="mt-3 flex items-center gap-3">
          <span
            className={`rounded-sm px-3 py-1 text-xs font-semibold ${presentation.statusClassName}`}
          >
            {presentation.label}
          </span>
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-text-muted">
            {experience.ownership === 'shared' ? (
              <UsersIcon size={16} aria-hidden="true" />
            ) : (
              <UserIcon size={16} aria-hidden="true" />
            )}
            {ownerLabel}
          </span>
        </div>

        {progress && (
          <div className="mt-4">
            <div className="flex items-center gap-3">
              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-hover">
                <div
                  className={`h-full rounded-full ${presentation.progressClassName}`}
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
              <span
                className={`text-xs font-semibold ${presentation.progressClassName.replace('bg-', 'text-')}`}
              >
                {progress.percent}%
              </span>
            </div>
            <p className="mt-2 text-xs text-text-muted">{progress.detail}</p>
          </div>
        )}

        {experience.review?.comment && (
          <blockquote className="mt-4 line-clamp-3 rounded-sm border border-border-default bg-surface-elevated px-3 py-2 text-xs text-text-secondary">
            “{experience.review.comment}”
          </blockquote>
        )}

        {rating !== null && rating !== undefined && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <span
              className="flex items-center gap-0.5 text-brand-gold-400"
              aria-label={`Nota ${rating} de 10`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon
                  key={index}
                  size={18}
                  weight={index < completedStars ? 'fill' : 'regular'}
                  aria-hidden="true"
                />
              ))}
            </span>
            <span className="text-xs text-text-secondary">{rating.toLocaleString('pt-BR')}/10</span>
          </div>
        )}

        <p className="mt-auto pt-4 text-xs text-text-muted">
          {formatUpdatedAt(experience.lastActivityAt)}
        </p>
      </div>
    </article>
  )
}
