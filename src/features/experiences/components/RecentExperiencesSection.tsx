'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@/assets/icons'
import { notify } from '@/components/feedback/toast/notify'
import { useDragScroll } from '@/hooks/useDragScroll/useDragScroll'
import { updateExperienceFavorite } from '../services/updateExperienceFavorite'
import type { Experience } from '../types/Experience'
import { ExperienceCard } from './ExperienceCard'

interface RecentExperiencesSectionProps {
  initialExperiences: Experience[]
}

export function RecentExperiencesSection({ initialExperiences }: RecentExperiencesSectionProps) {
  const [experiences, setExperiences] = useState(initialExperiences)
  const dragScroll = useDragScroll<HTMLDivElement>()

  const toggleFavorite = async (experience: Experience) => {
    try {
      const updatedExperience = await notify.promise(
        updateExperienceFavorite(experience.id, !experience.favorite.isFavoriteByCurrentUser),
        experience.favorite.isFavoriteByCurrentUser
          ? {
              loading: 'Removendo favorito...',
              success: 'Favorito removido.',
              error: 'Não foi possível remover o favorito. Tente novamente.',
            }
          : {
              loading: 'Adicionando favorito...',
              success: 'Experiência favoritada.',
              error: 'Não foi possível favoritar a experiência. Tente novamente.',
            },
      )
      setExperiences((currentExperiences) =>
        currentExperiences.map((currentExperience) =>
          currentExperience.id === updatedExperience.id ? updatedExperience : currentExperience,
        ),
      )
    } catch {
      // The toast already communicates an asynchronous operation failure.
    }
  }

  return (
    <section
      className="rounded-lg border border-border-default bg-background-secondary p-5 sm:p-7"
      aria-labelledby="recent-experiences-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="recent-experiences-title" className="text-2xl font-semibold text-text-primary">
            Experiências recentes
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            As últimas atualizações adicionadas à jornada.
          </p>
        </div>
        <Link
          href="/biblioteca"
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-sm text-text-secondary underline underline-offset-4 transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          Ver biblioteca
          <ArrowRightIcon size={16} aria-hidden="true" />
        </Link>
      </div>

      {experiences.length === 0 ? (
        <p className="mt-6 text-sm text-text-secondary">Nenhuma experiência recente ainda.</p>
      ) : (
        <div
          {...dragScroll}
          className="drag-scroll mt-6 -mr-5 flex snap-x cursor-grab touch-pan-y gap-4 overflow-x-auto pb-2 pr-5 select-none active:cursor-grabbing sm:-mr-7 sm:pr-7 lg:mr-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pr-0"
        >
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
