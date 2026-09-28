import { PageContainer } from '@/components/layout/PageContainer'
import { JourneyWelcome } from '@/features/journey/components/JourneyWelcome'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'

export default async function NossaJornadaPage() {
  const user = await getCurrentUser()

  if (!user) return null

  return (
    <PageContainer>
      <JourneyWelcome userName={user.name} />
    </PageContainer>
  )
}
