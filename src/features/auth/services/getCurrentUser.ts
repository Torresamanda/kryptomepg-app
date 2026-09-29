import { cache } from 'react'
import { cookies } from 'next/headers'
import { currentUserMock } from '../mocks/currentUser.mock'
import { isMockAuthenticationAllowed } from '../mocks/loginCredentials.mock'
import { sessionMock } from '../mocks/session.mock'
import type { CurrentUser } from '../types/CurrentUser'
import { getFirebaseAdminAuth, isFirebaseAdminConfigured } from '@/lib/firebase/admin'

const mockRequestDelayMs = 800

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  await new Promise((resolve) => setTimeout(resolve, mockRequestDelayMs))

  const cookieStore = await cookies()
  const session = cookieStore.get(sessionMock.cookieName)

  if (isFirebaseAdminConfigured) {
    if (!session?.value) return null

    try {
      const token = await getFirebaseAdminAuth().verifySessionCookie(session.value, true)
      return {
        id: token.uid,
        name: token.name ?? token.email?.split('@')[0] ?? 'Pessoa querida',
        avatarVariant: 'female',
      }
    } catch {
      return null
    }
  }

  if (!isMockAuthenticationAllowed || session?.value !== sessionMock.cookieValue) return null
  return currentUserMock
})
