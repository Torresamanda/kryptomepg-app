'use client'

import { useCallback, useState, type SubmitEvent } from 'react'
import { BookOpenIcon, GameControllerIcon } from '@/assets/icons'
import { notify } from '@/components/feedback/toast/notify'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { createExperience } from '../services/createExperience'
import { uploadExperienceCover } from '../services/uploadExperienceCover'
import { updateExperience } from '../services/updateExperience'
import type {
  CreateExperienceRequest,
  ExperienceDetails,
  ExperienceStatus,
} from '../types/Experience'

interface NewExperienceDrawerProps {
  open: boolean
  onClose: () => void
}

const statusOptions: Array<{ label: string; value: ExperienceStatus }> = [
  { label: 'Jogando', value: 'playing' },
  { label: 'Lendo', value: 'reading' },
  { label: 'Finalizado', value: 'completed' },
  { label: 'Pausado', value: 'paused' },
  { label: 'Abandonado', value: 'abandoned' },
]

type SupportedExperienceType = CreateExperienceRequest['type']

function defaultStatus(type: SupportedExperienceType): ExperienceStatus {
  return type === 'game' ? 'playing' : 'reading'
}

function resetForm(type: SupportedExperienceType = 'game') {
  return {
    coverImageUrl: '',
    imageFile: null as File | null,
    progressTotal: '',
    status: defaultStatus(type),
    title: '',
    type,
  }
}

export function NewExperienceDrawer({ open, onClose }: NewExperienceDrawerProps) {
  const [form, setForm] = useState(resetForm)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const selectType = (type: SupportedExperienceType) => {
    setForm((current) => ({ ...current, type, status: defaultStatus(type), progressTotal: '' }))
    setError(null)
  }

  const handleClose = useCallback(() => {
    if (isSaving) return

    setForm(resetForm())
    setError(null)
    onClose()
  }, [isSaving, onClose])

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const total = Number(form.progressTotal)
    if (!form.title.trim()) {
      setError('O título da experiência é obrigatório.')
      return
    }
    if (!Number.isInteger(total) || total <= 0) {
      setError(
        form.type === 'game'
          ? 'Informe uma quantidade válida de horas para finalizar.'
          : 'Informe uma quantidade válida de páginas.',
      )
      return
    }

    setError(null)
    setIsSaving(true)
    const request: CreateExperienceRequest = {
      title: form.title,
      type: form.type,
      status: form.status,
      coverImageUrl: form.imageFile ? undefined : form.coverImageUrl || null,
      progress: { total, unit: form.type === 'game' ? 'hours' : 'pages' },
    }

    try {
      const experience = await notify.promise(
        (async () => {
          const createdExperience = await createExperience(request)
          if (!form.imageFile) return createdExperience

          const coverImageUrl = await uploadExperienceCover(createdExperience.id, form.imageFile)
          return updateExperience(createdExperience.id, { coverImageUrl })
        })(),
        {
          loading: 'Criando experiência...',
          success: 'Experiência adicionada à jornada.',
          error: 'Não foi possível criar a experiência. Tente novamente.',
        },
      )
      window.dispatchEvent(
        new CustomEvent<ExperienceDetails>('kryptompeg:experience-created', { detail: experience }),
      )
      setForm(resetForm())
      onClose()
    } catch {
      // The toast already communicates the asynchronous operation failure.
    } finally {
      setIsSaving(false)
    }
  }

  const previewUrl = form.imageFile
    ? URL.createObjectURL(form.imageFile)
    : form.coverImageUrl || null

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      eyebrow="ADICIONAR"
      title="Nova experiência"
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col"
        aria-label="Nova experiência"
      >
        <div className="modal-scrollbar grid min-h-0 flex-1 content-start gap-5 overflow-y-auto pr-4">
          <label className="grid gap-1.5 text-sm font-medium text-text-primary">
            Título
            <input
              value={form.title}
              onChange={(event) => {
                setForm((current) => ({ ...current, title: event.target.value }))
                setError(null)
              }}
              maxLength={160}
              disabled={isSaving}
              className="min-h-11 rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
              placeholder="Ex.: Hollow Knight"
            />
          </label>

          <fieldset className="grid gap-3">
            <legend className="mb-2 text-sm font-medium text-text-primary">Tipo</legend>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="experience-type"
                  checked={form.type === 'game'}
                  onChange={() => selectType('game')}
                  disabled={isSaving}
                  className="peer sr-only"
                />
                <span
                  className={`flex min-h-16 items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors hover:border-text-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-gold-400 ${form.type === 'game' ? 'border-brand-gold-400 bg-brand-gold-900/20 text-text-primary' : 'border-border-default bg-surface-elevated text-text-secondary'}`}
                >
                  <GameControllerIcon size={20} aria-hidden="true" /> Jogo
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="experience-type"
                  checked={form.type === 'book'}
                  onChange={() => selectType('book')}
                  disabled={isSaving}
                  className="peer sr-only"
                />
                <span
                  className={`flex min-h-16 items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors hover:border-text-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-gold-400 ${form.type === 'book' ? 'border-brand-gold-400 bg-brand-gold-900/20 text-text-primary' : 'border-border-default bg-surface-elevated text-text-secondary'}`}
                >
                  <BookOpenIcon size={20} aria-hidden="true" /> Livro
                </span>
              </label>
            </div>
            <p className="text-xs text-text-muted">Filmes e séries estarão disponíveis em breve.</p>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <label className="grid min-w-0 gap-1.5 text-sm font-medium text-text-primary">
              Status
              <select
                value={form.status}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as ExperienceStatus,
                  }))
                  setError(null)
                }}
                disabled={isSaving}
                className="min-h-11 w-full rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid min-w-0 gap-1.5 text-sm font-medium text-text-primary">
              {form.type === 'game' ? 'Horas para finalizar' : 'Total de páginas'}
              <input
                type="number"
                min="1"
                step="1"
                value={form.progressTotal}
                onChange={(event) => {
                  setForm((current) => ({ ...current, progressTotal: event.target.value }))
                  setError(null)
                }}
                disabled={isSaving}
                className="min-h-11 w-full rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-center">
            <div className="relative mx-auto aspect-3/4 h-44 w-32 overflow-hidden rounded-md border border-border-default bg-surface-elevated sm:mx-0 sm:h-auto sm:w-auto">
              <ImageWithFallback
                src={previewUrl}
                alt="Prévia da capa da experiência"
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="grid gap-3">
              <label className="grid gap-1.5 text-sm font-medium text-text-primary">
                Link da imagem
                <input
                  type="url"
                  value={form.coverImageUrl}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      coverImageUrl: event.target.value,
                      imageFile: null,
                    }))
                  }
                  disabled={isSaving}
                  placeholder="https://..."
                  className="min-h-11 rounded-md border border-border-default bg-surface-default px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-text-primary">
                Ou envie um arquivo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={isSaving}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      imageFile: event.target.files?.[0] ?? null,
                      coverImageUrl: '',
                    }))
                  }
                  className="block w-full text-sm text-text-secondary file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-surface-hover file:px-3 file:py-2 file:text-sm file:font-medium file:text-text-primary hover:file:bg-border-default"
                />
              </label>
              <p className="text-xs text-text-muted">Aceita arquivos JPEG, PNG e WebP.</p>
            </div>
          </div>

          {error ? (
            <p
              className="rounded-sm border border-error/60 bg-error/10 px-3 py-2 text-sm text-error"
              role="alert"
            >
              {error}
            </p>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col-reverse justify-end gap-3 pb-1 sm:flex-row">
          <Button type="button" variant="ghost" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Criando...' : 'Criar experiência'}
          </Button>
        </div>
      </form>
    </Drawer>
  )
}
