'use client'

import { useState, type FormEvent } from 'react'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { Button } from '@/components/ui/Button'
import type {
  ExperienceDetails,
  ExperienceStatus,
  UpdateExperienceRequest,
} from '../types/Experience'

interface ExperienceEditFormProps {
  experience: ExperienceDetails
  isSaving: boolean
  onCancel: () => void
  onSave: (request: UpdateExperienceRequest, imageFile: File | null) => Promise<void>
}

const statusOptions: Array<{ label: string; value: ExperienceStatus }> = [
  { label: 'Jogando', value: 'playing' },
  { label: 'Lendo', value: 'reading' },
  { label: 'Finalizado', value: 'completed' },
  { label: 'Pausado', value: 'paused' },
  { label: 'Abandonado', value: 'abandoned' },
]

function initialProgress(experience: ExperienceDetails) {
  return experience.progress?.current.toString() ?? ''
}

export function ExperienceEditForm({
  experience,
  isSaving,
  onCancel,
  onSave,
}: ExperienceEditFormProps) {
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [status, setStatus] = useState(experience.status)
  const [progress, setProgress] = useState(initialProgress(experience))
  const [rating, setRating] = useState(experience.review?.rating?.toString() ?? '')
  const [comment, setComment] = useState(experience.review?.comment ?? '')
  const [activityNote, setActivityNote] = useState('')
  const [isFavorite, setIsFavorite] = useState(experience.favorite.isFavoriteByCurrentUser)
  const [completionError, setCompletionError] = useState<string | null>(null)

  const previewUrl = imageFile
    ? URL.createObjectURL(imageFile)
    : coverImageUrl || experience.coverImageUrl

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedProgress = Number(progress)
    const parsedRating = rating.trim() === '' ? null : Number(rating)
    const isCompleting = status === 'completed' && experience.status !== 'completed'
    const hasValidRating =
      parsedRating !== null &&
      Number.isFinite(parsedRating) &&
      parsedRating >= 0 &&
      parsedRating <= 10
    const hasUpdatedProgress =
      experience.progress !== null &&
      Number.isFinite(parsedProgress) &&
      parsedProgress !== experience.progress.current

    if (isCompleting && (!hasValidRating || !hasUpdatedProgress)) {
      setCompletionError('Para finalizar, informe uma nota e atualize o progresso atual.')
      return
    }

    setCompletionError(null)
    await onSave(
      {
        coverImageUrl: imageFile ? undefined : coverImageUrl.trim() || undefined,
        status,
        progress: experience.progress
          ? {
              ...experience.progress,
              current: Number.isFinite(parsedProgress)
                ? parsedProgress
                : experience.progress.current,
            }
          : null,
        review: {
          comment: comment.trim() || null,
          rating: Number.isFinite(parsedRating) ? parsedRating : null,
        },
        favorite: { ...experience.favorite, isFavoriteByCurrentUser: isFavorite },
        activityNote: activityNote.trim() || null,
      },
      imageFile,
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-label="Editar experiência">
      <div className="grid gap-4 sm:grid-cols-[7rem_1fr] sm:items-center">
        <div className="relative mx-auto h-40 w-28 overflow-hidden rounded-md border border-border-default bg-surface-elevated sm:mx-0 sm:h-auto sm:w-auto sm:aspect-[3/4]">
          <ImageWithFallback
            src={previewUrl}
            alt="Prévia da capa da experiência"
            className="object-cover"
            sizes="112px"
          />
        </div>
        <div className="grid gap-3">
          <label className="grid gap-1.5 text-sm font-medium text-text-primary">
            Link da imagem
            <input
              type="url"
              value={coverImageUrl}
              onChange={(event) => setCoverImageUrl(event.target.value)}
              placeholder="https://..."
              className="min-h-11 rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
            />
          </label>
          <p className="text-xs text-text-muted">
            Não tem o link?{' '}
            <a
              href="https://www.steamgriddb.com/"
              target="_blank"
              rel="noreferrer"
              className="text-brand-purple-300 underline underline-offset-2 transition-colors hover:text-brand-purple-100"
            >
              Clique aqui.
            </a>
          </p>
          <label className="grid gap-1.5 text-sm font-medium text-text-primary">
            Ou envie um arquivo
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm text-text-secondary file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-surface-hover file:px-3 file:py-2 file:text-sm file:font-medium file:text-text-primary hover:file:bg-border-default"
            />
          </label>
          <p className="text-xs text-text-muted">Aceita arquivos JPEG, PNG e WebP.</p>
        </div>
      </div>

      {completionError ? (
        <p
          className="rounded-sm border border-error/60 bg-error/10 px-3 py-2 text-sm text-error"
          role="alert"
        >
          {completionError}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-text-primary">
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ExperienceStatus)}
            className="min-h-11 rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text-primary">
          {experience.progress?.unit === 'pages' ? 'Página atual' : 'Horas jogadas'}
          {status === 'completed' && experience.status !== 'completed' ? ' (obrigatório)' : ''}
          <input
            type="number"
            min="0"
            max={experience.progress?.total}
            value={progress}
            onChange={(event) => {
              setProgress(event.target.value)
              setCompletionError(null)
            }}
            className="min-h-11 rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-text-primary">
          Nota de 0 a 10
          {status === 'completed' && experience.status !== 'completed' ? ' (obrigatória)' : ''}
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={rating}
            onChange={(event) => {
              setRating(event.target.value)
              setCompletionError(null)
            }}
            className="min-h-11 rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
          />
        </label>
        <label className="flex min-h-11 items-center gap-2 self-end rounded-md border border-border-default bg-surface-default px-3 text-sm text-text-primary">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(event) => setIsFavorite(event.target.checked)}
            className="size-4 accent-brand-gold-500"
          />
          Favoritar esta experiência
        </label>
      </div>

      <label className="grid gap-1.5 text-sm font-medium text-text-primary">
        Avaliação
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={3}
          className="rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
          placeholder="Conte o que achou da experiência."
        />
      </label>

      <label className="grid gap-1.5 text-sm font-medium text-text-primary">
        Nova entrada no diário
        <textarea
          value={activityNote}
          onChange={(event) => setActivityNote(event.target.value)}
          rows={3}
          className="rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
          placeholder="Ex.: cheguei à cidade perdida e avancei duas horas."
        />
      </label>

      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSaving}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  )
}
