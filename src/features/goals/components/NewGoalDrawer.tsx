'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { Input } from '@/components/ui/Input'
import { createGoal } from '../services/createGoal'
import type { GoalAudience } from '../types/Goal'
export function NewGoalDrawer({
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
    <Drawer open={open} onClose={onClose} eyebrow="ADICIONAR" title="Nova meta">
      <form onSubmit={submit} className="grid gap-5">
        <Input
          label="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          error={error ?? undefined}
        />
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium">Tipo</legend>
          <label>
            <input
              type="radio"
              name="goal-audience"
              checked={audience === 'personal'}
              onChange={() => setAudience('personal')}
            />{' '}
            Minha meta
          </label>
          <label>
            <input
              type="radio"
              name="goal-audience"
              checked={audience === 'shared'}
              onChange={() => setAudience('shared')}
            />{' '}
            Nossa meta
          </label>
        </fieldset>
        <Button type="submit">Salvar meta</Button>
      </form>
    </Drawer>
  )
}
