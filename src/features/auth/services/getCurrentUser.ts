import { cache } from 'react'
import { cookies } from 'next/headers'
import { currentUserMock } from '../mocks/currentUser.mock'
import { sessionMock } from '../mocks/session.mock'
import type { CurrentUser } from '../types/CurrentUser'

const mockRequestDelayMs = 800

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  await new Promise((resolve) => setTimeout(resolve, mockRequestDelayMs))

  const cookieStore = await cookies()
  const session = cookieStore.get(sessionMock.cookieName)

  if (session?.value !== sessionMock.cookieValue) {
    return null
  }

  return currentUserMock
})
