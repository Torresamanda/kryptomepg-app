import Link from 'next/link'
import { FeedbackPage } from '@/components/feedback/FeedbackPage'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'

export default async function NotFound() {
  const user = await getCurrentUser()
  const destination = user ? '/nossa-jornada' : '/login'
  const label = user ? 'Voltar para Nossa Jornada' : 'Ir para login'

  return (
    <FeedbackPage
      code="404"
      title="Esta fita não existe na coleção."
      description="A página que você procurou pode ter mudado de lugar ou nunca ter sido registrada."
    >
      <Link
        href={destination}
        className="inline-flex min-h-10 items-center justify-center rounded-md bg-brand-gold-500 px-4 py-2 text-sm font-medium text-background-primary transition-colors hover:bg-brand-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
      >
        {label}
      </Link>
    </FeedbackPage>
  )
}
