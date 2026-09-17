import { describe, expect, it } from 'vitest'
import { POST } from '@/app/api/auth/login/route'
import { sessionMock } from '@/features/auth/mocks/session.mock'

function createLoginRequest(payload: unknown) {
  return new Request('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

describe('POST /api/auth/login', () => {
  it('creates an HttpOnly session cookie for valid credentials', async () => {
    const response = await POST(
      createLoginRequest({ email: 'test-dev@email.com', password: '123456' }),
    )

    expect(response.status).toBe(200)
    expect(response.cookies.get(sessionMock.cookieName)).toMatchObject({
      value: sessionMock.cookieValue,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
  })

  it('returns 401 and does not create a session for invalid credentials', async () => {
    const response = await POST(
      createLoginRequest({ email: 'test-dev@email.com', password: 'incorrect-password' }),
    )

    expect(response.status).toBe(401)
    expect(response.cookies.get(sessionMock.cookieName)).toBeUndefined()
  })
})
