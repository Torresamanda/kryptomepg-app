import Link from 'next/link'
import { FeedbackPage } from '@/components/feedback/FeedbackPage'

export function NotAuthenticatedState() {
  return (
    <FeedbackPage
      code="401"
      title="Esta fita precisa de uma sessão para tocar."
      description="Entre com sua conta para continuar a sua jornada."
    >
      <Link
        href="/login"
        className="inline-flex min-h-10 items-center justify-center rounded-md bg-brand-gold-500 px-4 py-2 text-sm font-medium text-background-primary transition-colors hover:bg-brand-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        Ir para login
      </Link>
    </FeedbackPage>
  )
}
