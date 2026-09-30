import type { TimelineEvent } from '../types/TimelineEvent'

interface TimelineItemProps {
  compact?: boolean
  event: TimelineEvent
}

const markerClasses: Record<TimelineEvent['type'], string> = {
  progress_updated: 'bg-accent-blue-500',
  experience_added: 'bg-brand-gold-600',
  experience_completed: 'bg-success',
  achievement_unlocked: 'bg-brand-gold-400',
}

function formatRelativeDate(occurredAt: string) {
  const eventDate = new Date(occurredAt)
  const today = new Date()
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const differenceInDays = Math.round((todayDay.getTime() - eventDay.getTime()) / 86_400_000)

  if (differenceInDays === 0) return 'Hoje'
  if (differenceInDays === 1) return 'Ontem'
  if (differenceInDays < 7) return `Há ${differenceInDays} dias`
  if (differenceInDays < 14) return 'Há 1 semana'

  return `Há ${Math.floor(differenceInDays / 7)} semanas`
}

function getProgressDetail(event: TimelineEvent) {
  if (!event.progress) return null

  const { current, total, unit } = event.progress
  if (unit === 'percent') return `${current}% concluído`

  return `${current} de ${total} ${unit === 'pages' ? 'páginas' : 'capítulos'}`
}

function getProgressVerb(event: TimelineEvent) {
  if (event.experience?.type === 'book') return 'lendo'
  if (event.experience?.type === 'game') return 'jogando'

  return 'assistindo'
}

function getContent(event: TimelineEvent) {
  const experienceTitle = event.experience?.title ?? 'uma experiência'
  const actorName = event.actor?.name ?? 'Vocês'

  switch (event.type) {
    case 'progress_updated':
      return {
        title: `${actorName} está ${getProgressVerb(event)} ${experienceTitle}`,
        detail: getProgressDetail(event),
      }
    case 'experience_added':
      return {
        title: `${actorName} começou ${experienceTitle}`,
        detail: 'Nova experiência adicionada à jornada',
      }
    case 'experience_completed':
      return {
        title:
          event.scope === 'shared'
            ? `Vocês concluíram ${experienceTitle}`
            : `${actorName} concluiu ${experienceTitle}`,
        detail:
          event.scope === 'shared'
            ? 'Experiência compartilhada • 100% concluído'
            : 'Experiência concluída',
      }
    case 'achievement_unlocked':
      return {
        title: event.achievement?.title ?? 'Conquista desbloqueada',
        detail: `${experienceTitle} • todas as conquistas desbloqueadas`,
      }
  }
}

export function TimelineItem({ compact = false, event }: TimelineItemProps) {
  const { detail, title } = getContent(event)
  const layoutClasses = compact
    ? 'grid-cols-[1.25rem_minmax(0,1fr)] gap-3 pb-5 last:pb-0'
    : 'grid-cols-[2rem_minmax(0,1fr)] gap-4 pb-7 last:pb-0'
  const markerSizeClass = compact ? 'size-5' : 'size-8'
  const titleClass = compact ? 'text-base' : 'text-xl'
  const detailClass = compact ? 'mt-1 text-xs' : 'mt-2 text-base'
  const dateClass = compact ? 'text-xs' : 'text-sm'

  return (
    <li className={`relative grid ${layoutClasses}`}>
      <span
        aria-hidden="true"
        className={`relative z-10 mt-1 rounded-full ${markerSizeClass} ${markerClasses[event.type]}`}
      />
      <div className="min-w-0">
        <p className={`font-memory uppercase text-brand-purple-400 ${dateClass}`}>
          {formatRelativeDate(event.occurredAt)}
        </p>
        <h3 className={`mt-1 font-semibold text-text-primary ${titleClass}`}>{title}</h3>
        {detail && <p className={`${detailClass} text-text-muted`}>{detail}</p>}
      </div>
    </li>
  )
}
