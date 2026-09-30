import { PageContainer } from '@/components/layout/PageContainer'
import { MemorySection } from '@/features/memories/components/MemorySection'
import { GoalsSection } from '@/features/goals/components/GoalsSection'
import { MonthlyActivityCard } from '@/features/journey/components/MonthlyActivityCard'
import { JourneyWelcome } from '@/features/journey/components/JourneyWelcome'
import { JourneyHighlights } from '@/features/journey/components/JourneyHighlights'
import { getCurrentUser } from '@/features/auth/services/getCurrentUser'
import { getJourneyHighlights } from '@/features/journey/services/getJourneyHighlights'
import { getMonthlyActivity } from '@/features/journey/services/getMonthlyActivity'
import { getRandomMemory } from '@/features/memories/services/getRandomMemory'
import { getRecentGoals } from '@/features/goals/services/getRecentGoals'
import { TimelinePreviewCard } from '@/features/timeline/components/TimelinePreviewCard'
import { getTimelineEvents } from '@/features/timeline/services/getTimelineEvents'
import { RecentExperiencesSection } from '@/features/experiences/components/RecentExperiencesSection'
import { getRecentExperiences } from '@/features/experiences/services/getRecentExperiences'

function getCurrentMonth() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default async function NossaJornadaPage() {
  const [user, highlights, monthlyActivity, memory, goals, timeline, experiences] =
    await Promise.all([
      getCurrentUser(),
      getJourneyHighlights(),
      getMonthlyActivity(getCurrentMonth()),
      getRandomMemory(),
      getRecentGoals(),
      getTimelineEvents({ limit: 4 }),
      getRecentExperiences(),
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[12fr_9fr]">
        <GoalsSection initialGoals={goals} />
        <TimelinePreviewCard events={timeline.events} />
      </div>
      <RecentExperiencesSection initialExperiences={experiences} />
    </PageContainer>
  )
}
