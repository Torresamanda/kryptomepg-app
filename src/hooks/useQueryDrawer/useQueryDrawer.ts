'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useSyncExternalStore } from 'react'

const drawerHistoryChangeEvent = 'kryptompeg:drawer-history-change'

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
  const searchParams = useSearchParams()

  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('popstate', onStoreChange)
    window.addEventListener(drawerHistoryChangeEvent, onStoreChange)

    return () => {
      window.removeEventListener('popstate', onStoreChange)
      window.removeEventListener(drawerHistoryChangeEvent, onStoreChange)
    }
  }, [])

  const getSnapshot = useCallback(
    () => new URLSearchParams(window.location.search).get(parameterName) === 'true',
    [parameterName],
  )

  const getServerSnapshot = useCallback(
    () => searchParams.get(parameterName) === 'true',
    [parameterName, searchParams],
  )

  const isOpen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const open = useCallback(() => {
    const params = new URLSearchParams(window.location.search)

    params.set(parameterName, 'true')
    window.history.pushState(window.history.state, '', createUrl(window.location.pathname, params))
    window.dispatchEvent(new Event(drawerHistoryChangeEvent))
  }, [parameterName])

  const close = useCallback(() => {
    const params = new URLSearchParams(window.location.search)

    params.delete(parameterName)
    window.history.replaceState(
      window.history.state,
      '',
      createUrl(window.location.pathname, params),
    )
    window.dispatchEvent(new Event(drawerHistoryChangeEvent))
  }, [parameterName])

  return { isOpen, open, close }
}
