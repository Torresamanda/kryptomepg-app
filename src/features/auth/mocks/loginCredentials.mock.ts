export const loginCredentialsMock = {
  email: 'test-dev@email.com',
  password: '123456',
}

/** Local UI fixture. It must never be enabled in a production deployment. */
export const isMockAuthenticationAllowed = process.env.NODE_ENV !== 'production'
