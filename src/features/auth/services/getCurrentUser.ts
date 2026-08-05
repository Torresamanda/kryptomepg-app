import { cache } from 'react'
import { currentUserMock } from '../mocks/currentUser.mock'
import type { CurrentUser } from '../types/CurrentUser'

const mockRequestDelayMs = 800

/**
 * Returns the authenticated user for the current request.
 *
 * The mock will be replaced by the Firebase-backed implementation without changing consumers.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  await new Promise((resolve) => setTimeout(resolve, mockRequestDelayMs))

  return currentUserMock
})
