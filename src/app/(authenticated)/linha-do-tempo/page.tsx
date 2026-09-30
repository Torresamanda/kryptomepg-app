import { PageContainer } from '@/components/layout/PageContainer'
import { TimelineEventsList } from '@/features/timeline/components/TimelineEventsList'
import { getTimelineEvents } from '@/features/timeline/services/getTimelineEvents'

export default async function LinhaDoTempoPage() {
  const timeline = await getTimelineEvents({ limit: 20 })

  return (
    <PageContainer>
      <section className="rounded-lg border border-border-default bg-background-secondary p-5 sm:p-7">
        <h1 className="text-3xl font-semibold text-text-primary">Linha do tempo</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Momentos importantes registrados ao longo da jornada
        </p>
        <div className="mt-8 max-w-3xl">
          <TimelineEventsList events={timeline.events} />
        </div>
      </section>
    </PageContainer>
  )
}
