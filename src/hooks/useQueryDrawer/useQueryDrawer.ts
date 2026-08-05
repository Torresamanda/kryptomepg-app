'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

function createUrl(pathname: string, params: URLSearchParams) {
  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

/**
 * Synchronizes a drawer's open state with a boolean query parameter in the current URL.
 *
 * Opening the drawer adds `<parameterName>=true` to the URL while preserving other query
 * parameters. Closing it removes only that parameter.
 *
 * @param parameterName - The query parameter that represents the drawer state, such as
 * `new-experience` or `filters`.
 * @returns An object containing `isOpen`, derived from the current URL, and the `open` and
 * `close` functions used to update that state.
 */
export function useQueryDrawer(parameterName: string) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const isOpen = searchParams.get(parameterName) === 'true'

  const open = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(parameterName, 'true')
    router.push(createUrl(pathname, params), { scroll: false })
  }, [parameterName, pathname, router, searchParams])

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete(parameterName)
    router.replace(createUrl(pathname, params), { scroll: false })
  }, [parameterName, pathname, router, searchParams])

  return { isOpen, open, close }
}
