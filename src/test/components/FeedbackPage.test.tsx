import { FeedbackPage } from '@/components/feedback/FeedbackPage'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('FeedbackPage', () => {
  it('renders the feedback information', () => {
    render(
      <FeedbackPage
        code={'500'}
        title={'Algo deu errado'}
        description={'Tente novamente mais tarde.'}
        errorId="7F3A"
      >
        <button type="button">Tentar Novamente</button>
      </FeedbackPage>,
    )

    expect(screen.getByText('ERRO 500')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Algo deu errado' })).toBeVisible()
    expect(screen.getByText('Tente novamente mais tarde.')).toBeVisible()
    expect(screen.getByText('Error ID: 7F3A')).toBeVisible()
  })

  it('renders the received button', () => {
    render(
      <FeedbackPage code="401" title="Sessão necessária" description="Faça login para continuar.">
        <button type="button">Ir para login</button>
      </FeedbackPage>,
    )

    expect(screen.getByRole('button', { name: 'Ir para login' })).toBeVisible()
  })

  it('does not render the error identifier when it is not received', () => {
    render(
      <FeedbackPage
        code="404"
        title="Página não encontrada"
        description="Esta fita não existe na coleção."
      >
        <a href="/nossa-jornada">Voltar para Nossa Jornada</a>
      </FeedbackPage>,
    )

    expect(screen.queryByText(/Error ID:/)).not.toBeInTheDocument()
  })
})
