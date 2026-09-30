'use client'

import { useState } from 'react'
import { notify } from '@/components/feedback/toast/notify'
import { updateExperienceFavorite } from '../services/updateExperienceFavorite'
import type { Experience } from '../types/Experience'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceDetailsModal } from './ExperienceDetailsModal'

interface ExperienceLibraryProps {
  initialExperiences: Experience[]
}

export function ExperienceLibrary({ initialExperiences }: ExperienceLibraryProps) {
  const [experiences, setExperiences] = useState(initialExperiences)
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null)

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
    <section aria-labelledby="experience-library-title">
      <div>
        <h1 id="experience-library-title" className="text-3xl font-semibold text-text-primary">
          Biblioteca
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Todas as experiências que fazem parte da sua jornada.
        </p>
      </div>

      {experiences.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">Nenhuma experiência cadastrada ainda.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onOpenDetails={(selectedExperience) => setSelectedExperienceId(selectedExperience.id)}
              onToggleFavorite={toggleFavorite}
              prioritizeImage={index === 0}
            />
          ))}
        </div>
      )}

      <ExperienceDetailsModal
        experienceId={selectedExperienceId}
        open={selectedExperienceId !== null}
        onClose={() => setSelectedExperienceId(null)}
        onExperienceDeleted={(experienceId) => {
          setExperiences((currentExperiences) =>
            currentExperiences.filter((currentExperience) => currentExperience.id !== experienceId),
          )
          setSelectedExperienceId(null)
        }}
        onExperienceUpdated={(updatedExperience) =>
          setExperiences((currentExperiences) =>
            currentExperiences.map((currentExperience) =>
              currentExperience.id === updatedExperience.id ? updatedExperience : currentExperience,
            ),
          )
        }
      />
    </section>
  )
}
