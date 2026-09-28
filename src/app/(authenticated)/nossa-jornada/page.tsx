import { PageContainer } from '@/components/layout/PageContainer'
import { JourneyWelcome } from '@/features/journey/components/JourneyWelcome'
import { JourneyHighlights } from '@/features/journey/components/JourneyHighlights'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'
import { getJourneyHighlights } from '@/features/journey/services/getJourneyHighlights'

export default async function NossaJornadaPage() {
  const [user, highlights] = await Promise.all([getCurrentUser(), getJourneyHighlights()])

  if (!user) return null

  return (
    <PageContainer className="space-y-10">
      <JourneyWelcome userName={user.name} />
      <JourneyHighlights highlights={highlights} />
    </PageContainer>
  )
}
