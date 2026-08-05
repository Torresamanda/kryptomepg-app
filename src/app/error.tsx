'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { FeedbackPage } from '@/components/feedback/FeedbackPage'
import { Button } from '@/components/ui/Button'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const errorId = useMemo(
    () => error.digest?.slice(0, 8).toUpperCase() ?? 'LOCAL-ERROR',
    [error.digest],
  )

  return (
    <FeedbackPage
      code="500"
      title="A fita embolou durante a reprodução."
      description="Não foi possível carregar esta parte da jornada. Tente novamente ou volte ao início."
      errorId={errorId}
    >
      <Button onClick={reset}>Tentar novamente</Button>
      <Link
        href="/login"
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-brand-gold-500 px-4 py-2 text-sm font-medium text-brand-gold-500 transition-colors hover:bg-brand-gold-500 hover:text-background-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        Ir para login
      </Link>
    </FeedbackPage>
  )
}
