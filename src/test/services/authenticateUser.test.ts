import { describe, expect, it } from 'vitest'
import { authenticateUser } from '@/features/auth/services/authenticateUser'

describe('authenticateUser', () => {
  it('returns true for the mock credentials', async () => {
    await expect(authenticateUser('test-dev@email.com', '123456')).resolves.toBe(true)
  })

  it('returns false for incorrect credentials', async () => {
    await expect(authenticateUser('test-dev@email.com', 'wrong-password')).resolves.toBe(false)
  })
})
