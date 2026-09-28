import { PageContainer } from '@/components/layout/PageContainer'
import { MemorySection } from '@/features/memories/components/MemorySection'
import { MonthlyActivityCard } from '@/features/journey/components/MonthlyActivityCard'
import { JourneyWelcome } from '@/features/journey/components/JourneyWelcome'
import { JourneyHighlights } from '@/features/journey/components/JourneyHighlights'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'
import { getJourneyHighlights } from '@/features/journey/services/getJourneyHighlights'
import { getMonthlyActivity } from '@/features/journey/services/getMonthlyActivity'
import { getRandomMemory } from '@/features/memories/services/getRandomMemory'

function getCurrentMonth() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default async function NossaJornadaPage() {
  const [user, highlights, monthlyActivity, memory] = await Promise.all([
    getCurrentUser(),
    getJourneyHighlights(),
    getMonthlyActivity(getCurrentMonth()),
    getRandomMemory(),
  ])

  if (!user) return null

  return (
    <PageContainer className="space-y-4">
      <JourneyWelcome userName={user.name} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="lg:h-86">
          <JourneyHighlights highlights={highlights} />
        </div>
        <div className="lg:h-86">
          <MonthlyActivityCard activity={monthlyActivity} />
        </div>
      </div>
      <MemorySection initialMemory={memory} />
    </PageContainer>
  )
}
