'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { createGoal } from '../services/createGoal'
import { maxGoalTitleLength, type GoalAudience } from '../types/Goal'

export function NewGoalModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated: (goal: Awaited<ReturnType<typeof createGoal>>) => void
}) {
  const [title, setTitle] = useState('')
  const [audience, setAudience] = useState<GoalAudience>('personal')
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const goal = await createGoal({ title, audience })
      onCreated(goal)
      setTitle('')
      onClose()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível criar a meta.')
    }
  }

  return (
    <Modal open={open} onClose={onClose} eyebrow="ADICIONAR" title="Nova meta">
      <form onSubmit={submit} className="grid gap-5">
        <Input
          label="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={error ?? undefined}
          maxLength={maxGoalTitleLength}
          className="focus-visible:border-brand-gold-400 focus-visible:ring-brand-gold-400/30"
        />
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium mb-2">Tipo</legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="goal-audience"
                checked={audience === 'personal'}
                onChange={() => setAudience('personal')}
                className="peer sr-only"
              />
              <span
                className={`flex min-h-11 items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors hover:border-text-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-gold-400 ${
                  audience === 'personal'
                    ? 'border-brand-gold-400 bg-brand-gold-900/20 text-text-primary'
                    : 'border-border-default bg-surface-elevated text-text-secondary'
                }`}
              >
                <span className="flex size-4 items-center justify-center rounded-full border border-current">
                  <span
                    className={`size-2 rounded-full bg-brand-gold-400 ${
                      audience === 'personal' ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </span>
                Minha meta
              </span>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="goal-audience"
                checked={audience === 'shared'}
                onChange={() => setAudience('shared')}
                className="peer sr-only"
              />
              <span
                className={`flex min-h-11 items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors hover:border-text-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-gold-400 ${
                  audience === 'shared'
                    ? 'border-brand-gold-400 bg-brand-gold-900/20 text-text-primary'
                    : 'border-border-default bg-surface-elevated text-text-secondary'
                }`}
              >
                <span className="flex size-4 items-center justify-center rounded-full border border-current">
                  <span
                    className={`size-2 rounded-full bg-brand-gold-400 ${
                      audience === 'shared' ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </span>
                Nossa meta
              </span>
            </label>
          </div>
        </fieldset>
        <Button type="submit">Salvar meta</Button>
      </form>
    </Modal>
  )
}
