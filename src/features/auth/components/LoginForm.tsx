'use client'

import { useState, type SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface LoginFormErrors {
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [formError, setFormError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const nextErrors: LoginFormErrors = {}

    if (!email) {
      nextErrors.email = 'Preencha seu e-mail.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Digite um e-mail válido.'
    }

    if (!password) {
      nextErrors.password = 'Preencha sua senha.'
    }

    setErrors(nextErrors)
    setFormError(undefined)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.status === 401) {
        setFormError('E-mail ou senha incorretos.')
        return
      }

      if (!response.ok) {
        setFormError('Não foi possível entrar agora. Tente novamente.')
        return
      }

      router.push('/nossa-jornada')
    } catch {
      setFormError('Não foi possível entrar agora. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
      <Input
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        error={errors.email}
        disabled={isSubmitting}
        required
      />

      <Input
        label="Senha"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Digite sua senha"
        error={errors.password}
        disabled={isSubmitting}
        required
      />

      {formError ? (
        <p
          className="rounded-md border border-error/40 bg-error/10 px-3 py-2 text-sm text-error"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Entrando...' : 'Entrar na jornada'}
      </Button>
    </form>
  )
}
