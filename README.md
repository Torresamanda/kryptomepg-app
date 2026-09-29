## Authentication

In local development, the project retains its visual-login mock. It is disabled automatically in production.

For Firebase Authentication, copy `.env.example` to `.env.local` and fill the Firebase web settings plus the server-only `FIREBASE_SERVICE_ACCOUNT_KEY`. The browser authenticates with Firebase and sends only its Firebase ID token to the app. The API validates it and sets an `httpOnly`, secure session cookie that expires after 24 hours; no automatic renewal is used.
