import { NextResponse } from 'next/server'
import { sessionMock } from '@/features/auth/mocks/session.mock'
import { authenticateUser } from '@/features/auth/services/authenticateUser'
import { isMockAuthenticationAllowed } from '@/features/auth/mocks/loginCredentials.mock'
import { getFirebaseAdminAuth, isFirebaseAdminConfigured } from '@/lib/firebase/admin'

interface LoginPayload {
  email?: unknown
  password?: unknown
  idToken?: unknown
}

const sessionDurationMs = 24 * 60 * 60 * 1000

export async function POST(request: Request) {
  let payload: LoginPayload

  try {
    payload = (await request.json()) as LoginPayload
  } catch {
    return NextResponse.json({ message: 'Dados de login inválidos.' }, { status: 400 })
  }

  if (isFirebaseAdminConfigured) {
    if (typeof payload.idToken !== 'string' || payload.idToken.length > 10_000) {
      return NextResponse.json({ message: 'Dados de login inválidos.' }, { status: 400 })
    }

    try {
      const sessionCookie = await getFirebaseAdminAuth().createSessionCookie(payload.idToken, {
        expiresIn: sessionDurationMs,
      })
      const response = NextResponse.json({ success: true })
      response.cookies.set({
        name: 'kryptompeg-session',
        value: sessionCookie,
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
        maxAge: sessionDurationMs / 1000,
      })
      return response
    } catch {
      return NextResponse.json({ message: 'E-mail ou senha incorretos.' }, { status: 401 })
    }
  }

  if (!isMockAuthenticationAllowed) {
    return NextResponse.json({ message: 'Autenticação não configurada.' }, { status: 503 })
  }

  if (
    typeof payload.email !== 'string' ||
    typeof payload.password !== 'string' ||
    payload.email.length > 254 ||
    payload.password.length > 1_024
  ) {
    return NextResponse.json({ message: 'Dados de login inválidos.' }, { status: 400 })
  }

  const isAuthenticated = await authenticateUser(payload.email, payload.password)

  if (!isAuthenticated) {
    return NextResponse.json({ message: 'E-mail ou senha incorretos.' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set({
    name: sessionMock.cookieName,
    value: sessionMock.cookieValue,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: sessionDurationMs / 1000,
  })

  return response
}
