import { PageContainer } from '@/components/layout/PageContainer'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'
import { ProfileSummary } from '@/features/profile/components/ProfileSummary'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  return (
    <PageContainer>
      <ProfileSummary user={user} />
    </PageContainer>
  )
}
