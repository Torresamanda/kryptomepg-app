import type { ReactNode } from 'react'
import { BrokenCassetteIcon } from '@/assets/icons'

interface FeedbackPageProps {
  code: '401' | '404' | '500'
  title: string
  description: string
  errorId?: string
  children: ReactNode
}

export function FeedbackPage({ children, code, description, errorId, title }: FeedbackPageProps) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background-primary px-6 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-border-default bg-surface-default px-6 py-10 text-center shadow-2xl sm:px-12">
        <BrokenCassetteIcon className="mx-auto" />
        <p className="mt-6 font-memory text-lg text-brand-gold-500">ERRO {code}</p>
        <h1 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-text-secondary">
          {description}
        </p>
        {errorId && <p className="mt-5 text-xs font-medium text-text-muted">Error ID: {errorId}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </section>
    </main>
  )
}
