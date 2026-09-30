import { CheckIcon, ClockIcon, PencilSimpleIcon, PlusIcon } from '@/assets/icons'
import type { ExperienceActivity, ExperienceDetails } from '../types/Experience'

interface ExperienceDiaryProps {
  experience: ExperienceDetails
}

const activityIcon: Record<ExperienceActivity['type'], typeof ClockIcon> = {
  cover_updated: PencilSimpleIcon,
  created: PlusIcon,
  note_added: PencilSimpleIcon,
  progress_updated: ClockIcon,
  review_updated: PencilSimpleIcon,
  status_updated: CheckIcon,
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function ExperienceDiary({ experience }: ExperienceDiaryProps) {
  return (
    <section
      aria-labelledby="experience-diary-title"
      className="mt-7 border-t border-border-default pt-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 id="experience-diary-title" className="text-base font-semibold text-text-primary">
          Atividade recente
        </h3>
        <span className="text-xs text-text-muted">{experience.activities.length} registros</span>
      </div>

      <ol className="mt-5 border-l border-border-default pl-5">
        {experience.activities.map((activity) => {
          const Icon = activityIcon[activity.type]
          return (
            <li key={activity.id} className="relative pb-5 last:pb-0">
              <span className="absolute -left-7.75 top-0 flex size-5 items-center justify-center rounded-full bg-surface-elevated text-brand-gold-400">
                <Icon size={13} aria-hidden="true" />
              </span>
              <time className="block text-xs text-text-muted" dateTime={activity.occurredAt}>
                {formatDate(activity.occurredAt)}
                {activity.actor ? ` · ${activity.actor.name}` : ''}
              </time>
              <p className="mt-1 text-sm leading-5 text-text-secondary">{activity.summary}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
