'use client'

import { useEffect, useState } from 'react'
import { HeartIcon, StarIcon, TrashIcon, UserIcon, UsersIcon } from '@/assets/icons'
import { notify } from '@/components/feedback/toast/notify'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { getExperienceDetails } from '../services/getExperienceDetails'
import { deleteExperience } from '../services/deleteExperience'
import { updateExperience } from '../services/updateExperience'
import { uploadExperienceCover } from '../services/uploadExperienceCover'
import type { Experience, ExperienceDetails, UpdateExperienceRequest } from '../types/Experience'
import { ExperienceDiary } from './ExperienceDiary'
import { ExperienceEditForm } from './ExperienceEditForm'

interface ExperienceDetailsModalProps {
  experienceId: string | null
  onClose: () => void
  onExperienceDeleted: (experienceId: string) => void
  onExperienceUpdated: (experience: Experience) => void
  open: boolean
}

const statusPresentation = {
  abandoned: {
    label: 'Abandonado',
    className: 'bg-error text-text-primary',
    progressClassName: 'bg-error',
    progressTextClassName: 'text-error',
  },
  completed: {
    label: 'Finalizado',
    className: 'bg-success text-text-primary',
    progressClassName: 'bg-success',
    progressTextClassName: 'text-success',
  },
  paused: {
    label: 'Pausado',
    className: 'bg-warning text-background-primary',
    progressClassName: 'bg-warning',
    progressTextClassName: 'text-warning',
  },
  playing: {
    label: 'Jogando',
    className: 'bg-brand-gold-700 text-brand-gold-100',
    progressClassName: 'bg-brand-gold-600',
    progressTextClassName: 'text-brand-gold-400',
  },
  reading: {
    label: 'Lendo',
    className: 'bg-info text-background-primary',
    progressClassName: 'bg-accent-blue-500',
    progressTextClassName: 'text-accent-blue-400',
  },
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function progressDetails(experience: ExperienceDetails) {
  if (!experience.progress) return null
  const percent = Math.min(
    100,
    Math.round((experience.progress.current / experience.progress.total) * 100),
  )
  const detail =
    experience.progress.unit === 'pages'
      ? `Página ${experience.progress.current} de ${experience.progress.total}`
      : `${experience.progress.current}h jogadas`
  return { detail, percent }
}

export function ExperienceDetailsModal({
  experienceId,
  onClose,
  onExperienceDeleted,
  onExperienceUpdated,
  open,
}: ExperienceDetailsModalProps) {
  const [experience, setExperience] = useState<ExperienceDetails | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [mode, setMode] = useState<'diary' | 'edit'>('diary')
  const isLoading = open && (!experience || experience.id !== experienceId)

  useEffect(() => {
    if (!open || !experienceId) return

    let isCurrent = true

    getExperienceDetails(experienceId).then((details) => {
      if (isCurrent) {
        setExperience(details)
        setMode('diary')
        setIsConfirmingDelete(false)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [experienceId, open])

  const handleClose = () => {
    if (!isSaving) {
      setIsConfirmingDelete(false)
      onClose()
    }
  }

  const handleSave = async (request: UpdateExperienceRequest, imageFile: File | null) => {
    if (!experience) return
    setIsSaving(true)

    try {
      const updatedExperience = await notify.promise(
        (async () => {
          const coverImageUrl = imageFile
            ? await uploadExperienceCover(experience.id, imageFile)
            : request.coverImageUrl
          return updateExperience(experience.id, { ...request, coverImageUrl })
        })(),
        {
          loading: 'Salvando experiência...',
          success: 'Experiência atualizada.',
          error: 'Não foi possível salvar a experiência. Tente novamente.',
        },
      )
      setExperience(updatedExperience)
      onExperienceUpdated(updatedExperience)
      setMode('diary')
    } catch {
      // The toast already communicates the save failure.
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!experience) return
    setIsSaving(true)

    try {
      await notify.promise(deleteExperience(experience.id), {
        loading: 'Excluindo experiência...',
        success: 'Experiência excluída.',
        error: 'Não foi possível excluir a experiência. Tente novamente.',
      })
      onExperienceDeleted(experience.id)
      onClose()
    } catch {
      // The toast already communicates the delete failure.
    } finally {
      setIsSaving(false)
    }
  }

  const presentation = experience ? statusPresentation[experience.status] : null
  const progress = experience ? progressDetails(experience) : null
  const rating = experience?.review?.rating
  const completedStars = rating === null || rating === undefined ? 0 : Math.round(rating / 2)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={
        mode === 'edit' ? 'Editar experiência' : (experience?.title ?? 'Detalhes da experiência')
      }
      eyebrow="Sua jornada"
      size="wide"
    >
      {isLoading ? (
        <p className="text-sm text-text-secondary">Carregando detalhes da experiência...</p>
      ) : !experience || !presentation ? (
        <p className="text-sm text-text-secondary">Não foi possível encontrar esta experiência.</p>
      ) : mode === 'edit' ? (
        <ExperienceEditForm
          experience={experience}
          isSaving={isSaving}
          onCancel={() => setMode('diary')}
          onSave={handleSave}
        />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-[9rem_1fr]">
            <div className="relative mx-auto h-48 w-32 overflow-hidden rounded-md border border-border-default bg-surface-elevated sm:mx-0 sm:h-auto sm:w-auto sm:aspect-3/4">
              <ImageWithFallback
                src={experience.coverImageUrl}
                alt={
                  experience.coverImageUrl
                    ? `Capa de ${experience.title}`
                    : `Imagem não disponível para ${experience.title}`
                }
                className="object-cover"
                sizes="144px"
              />
            </div>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={`inline-flex rounded-sm px-3 py-1 text-xs font-semibold ${presentation.className}`}
                  >
                    {presentation.label}
                  </span>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-text-muted">
                    {experience.ownership === 'shared' ? (
                      <UsersIcon size={16} aria-hidden="true" />
                    ) : (
                      <UserIcon size={16} aria-hidden="true" />
                    )}
                    {experience.ownership === 'shared' ? 'Juntos' : experience.owner?.name}
                  </p>
                </div>
                {experience.favorite.isFavoriteByCurrentUser ? (
                  <HeartIcon
                    size={22}
                    weight="fill"
                    className="shrink-0 text-brand-purple-400"
                    aria-label="Favorito"
                  />
                ) : null}
              </div>

              {progress ? (
                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-hover">
                      <div
                        className={`h-full rounded-full ${presentation.progressClassName}`}
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${presentation.progressTextClassName}`}>
                      {progress.percent}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{progress.detail}</p>
                </div>
              ) : null}

              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border-default py-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-text-muted">Criado em</dt>
                  <dd className="mt-1 text-text-secondary">{formatDate(experience.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-muted">Última atividade</dt>
                  <dd className="mt-1 text-text-secondary">
                    {formatDate(experience.lastActivityAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-text-muted">Tipo</dt>
                  <dd className="mt-1 capitalize text-text-secondary">
                    {experience.type === 'game'
                      ? 'Jogo'
                      : experience.type === 'book'
                        ? 'Livro'
                        : 'Filme'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {experience.review?.comment || (rating !== null && rating !== undefined) ? (
            <section className="mt-7" aria-labelledby="experience-review-title">
              <h3
                id="experience-review-title"
                className="text-base font-semibold text-text-primary"
              >
                Sua avaliação
              </h3>
              {experience.review?.comment ? (
                <blockquote className="mt-3 rounded-sm border border-border-default bg-surface-elevated px-4 py-3 text-sm leading-5 text-text-secondary">
                  “{experience.review.comment}”
                </blockquote>
              ) : null}
              {rating !== null && rating !== undefined ? (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className="flex gap-0.5 text-brand-gold-400"
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
                  <span className="text-sm text-text-secondary">
                    {rating.toLocaleString('pt-BR')}/10
                  </span>
                </div>
              ) : null}
            </section>
          ) : null}

          {experience.status === 'completed' ? <ExperienceDiary experience={experience} /> : null}

          {isConfirmingDelete ? (
            <section
              className={`${experience.status === 'completed' ? 'mt-7' : 'mt-5'} rounded-md border border-error/60 bg-error/10 p-4`}
              aria-labelledby="delete-experience-title"
            >
              <h3 id="delete-experience-title" className="text-sm font-semibold text-text-primary">
                Excluir esta experiência?
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                A experiência e todo o seu Diário serão removidos permanentemente.
              </p>
              <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setIsConfirmingDelete(false)}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-error text-text-primary hover:bg-error/85"
                  onClick={handleDelete}
                  disabled={isSaving}
                >
                  {isSaving ? 'Excluindo...' : 'Excluir experiência'}
                </Button>
              </div>
            </section>
          ) : (
            <div
              className={`${experience.status === 'completed' ? 'mt-7' : 'mt-5'} flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end`}
            >
              <Button
                variant="ghost"
                className="text-error hover:bg-error/10 hover:text-error"
                onClick={() => setIsConfirmingDelete(true)}
              >
                <TrashIcon size={16} aria-hidden="true" />
                <span className="ml-2">Excluir</span>
              </Button>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                onClick={() => setMode('edit')}
              >
                Editar experiência
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
