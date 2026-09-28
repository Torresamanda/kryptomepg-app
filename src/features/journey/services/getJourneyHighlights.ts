import { journeyHighlightsMock } from '../mocks/journeyHighlights.mock'
import type { JourneyHighlights } from '../types/JourneyHighlights'

export async function getJourneyHighlights(): Promise<JourneyHighlights> {
  return journeyHighlightsMock
}
