import { loginCredentialsMock } from '../mocks/loginCredentials.mock'

export async function authenticateUser(email: string, password: string): Promise<boolean> {
  return (
    email.toLowerCase() === loginCredentialsMock.email.toLowerCase() &&
    password === loginCredentialsMock.password
  )
}
