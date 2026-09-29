'use client'

import { useState } from 'react'
import { getRandomMemory } from '../services/getRandomMemory'
import type { RandomMemory } from '../types/RandomMemory'
import { MemoryCard } from './MemoryCard'

interface MemorySectionProps {
  initialMemory: RandomMemory | null
}

export function MemorySection({ initialMemory }: MemorySectionProps) {
  const [memory, setMemory] = useState(initialMemory)
  const [isRemembering, setIsRemembering] = useState(false)

  const handleRemember = async () => {
    if (!memory) return

    setIsRemembering(true)

    try {
      const nextMemory = await getRandomMemory(memory.experienceId)
      setMemory(nextMemory)
    } finally {
      setIsRemembering(false)
    }
  }

  if (!memory) {
    return (
      <section className="rounded-lg border border-border-default bg-background-secondary p-5 sm:p-7">
        <h2 className="text-2xl font-semibold text-text-primary">Lembranças</h2>

        <p className="mt-2 text-sm text-text-secondary">
          Quando vocês concluírem uma experiência, ela poderá aparecer aqui.
        </p>
      </section>
    )
  }

  return <MemoryCard memory={memory} onRemember={handleRemember} remembering={isRemembering} />
}
