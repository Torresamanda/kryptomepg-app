import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

export const isFirebaseAdminConfigured = Boolean(serviceAccountJson)

export function getFirebaseAdminAuth() {
  if (!serviceAccountJson) {
    throw new Error('A credencial de servidor do Firebase não está configurada.')
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert(JSON.parse(serviceAccountJson)),
    })

  return getAuth(app)
}
