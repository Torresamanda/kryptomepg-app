import '@testing-library/jest-dom/vitest'
import { createElement, type ComponentPropsWithoutRef, type MouseEvent } from 'react'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, onClick, ...props }: ComponentPropsWithoutRef<'a'>) =>
    createElement(
      'a',
      {
        ...props,
        onClick: (event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault()
          onClick?.(event)
        },
      },
      children,
    ),
}))

afterEach(() => {
  cleanup()
})
