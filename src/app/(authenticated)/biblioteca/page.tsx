import { PageContainer } from '@/components/layout/PageContainer'
import { ExperienceLibrary } from '@/features/experiences/components/ExperienceLibrary'
import { getRecentExperiences } from '@/features/experiences/services/getRecentExperiences'

export default async function BibliotecaPage() {
  const experiences = await getRecentExperiences()

  return (
    <PageContainer>
      <ExperienceLibrary initialExperiences={experiences} />
    </PageContainer>
  )
}
