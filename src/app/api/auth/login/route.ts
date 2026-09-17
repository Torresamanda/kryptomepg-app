import { NextResponse } from 'next/server'
import { sessionMock } from '@/features/auth/mocks/session.mock'
import { authenticateUser } from '@/features/auth/services/authenticateUser'

interface LoginPayload {
  email?: unknown
  password?: unknown
}

export async function POST(request: Request) {
  let payload: LoginPayload

  try {
    payload = (await request.json()) as LoginPayload
  } catch {
    return NextResponse.json({ message: 'Dados de login inválidos.' }, { status: 400 })
  }

  if (typeof payload.email !== 'string' || typeof payload.password !== 'string') {
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
  })

  return response
}
