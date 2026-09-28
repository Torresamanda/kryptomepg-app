import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

describe('ImageWithFallback', () => {
  it('uses the generic image when the source is unavailable', () => {
    render(<ImageWithFallback src={null} alt="Imagem não disponível" />)

    expect(screen.getByAltText('Imagem não disponível').getAttribute('src')).toContain(
      'url=%2Fnot-found.png',
    )
  })

  it('uses the provided source when it is available', () => {
    render(<ImageWithFallback src="/memories/forest-companions.png" alt="Capa da lembrança" />)

    expect(screen.getByAltText('Capa da lembrança').getAttribute('src')).toContain(
      'url=%2Fmemories%2Fforest-companions.png',
    )
  })

  it('uses the generic image after a loading error', () => {
    render(<ImageWithFallback src="/missing-cover.png" alt="Capa indisponível" />)

    fireEvent.error(screen.getByAltText('Capa indisponível'))

    expect(screen.getByAltText('Capa indisponível').getAttribute('src')).toContain(
      'url=%2Fnot-found.png',
    )
  })
})
