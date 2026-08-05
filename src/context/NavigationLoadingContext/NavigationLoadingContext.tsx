'use client'

import type { MutableRefObject, ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationLoadingOverlay } from '@/components/ui/NavigationLoadingOverlay'

const displayDelayMs = 200
const minimumDisplayMs = 350

interface NavigationLoadingContextValue {
  startNavigation: (href: string) => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextValue | null>(null)

interface NavigationLoadingProviderProps {
  children: ReactNode
}

function clearTimer(timerRef: MutableRefObject<ReturnType<typeof setTimeout> | null>) {
  if (!timerRef.current) return
  clearTimeout(timerRef.current)
  timerRef.current = null
}

/**
 * Shows a delayed loading overlay while client-side navigation is in progress.
 *
 * The overlay is skipped for fast transitions and remains visible long enough to avoid flicker.
 */
export function NavigationLoadingProvider({ children }: NavigationLoadingProviderProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const targetRef = useRef<string | null>(null)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const visibleSinceRef = useRef<number | null>(null)
  const isVisibleRef = useRef(false)

  const hideOverlay = useCallback(() => {
    clearTimer(hideTimerRef)
    isVisibleRef.current = false
    visibleSinceRef.current = null
    setIsVisible(false)
  }, [])

  const finishNavigation = useCallback(() => {
    if (!targetRef.current) return

    targetRef.current = null
    clearTimer(delayTimerRef)

    if (!isVisibleRef.current || !visibleSinceRef.current) return

    const elapsed = performance.now() - visibleSinceRef.current
    const remainingTime = Math.max(minimumDisplayMs - elapsed, 0)

    if (remainingTime === 0) {
      hideOverlay()
      return
    }

    hideTimerRef.current = setTimeout(hideOverlay, remainingTime)
  }, [hideOverlay])

  useEffect(() => {
    finishNavigation()
  }, [finishNavigation, pathname])

  useEffect(() => {
    return () => {
      clearTimer(delayTimerRef)
      clearTimer(hideTimerRef)
    }
  }, [])

  const startNavigation = useCallback(
    (href: string) => {
      if (href === pathname || targetRef.current === href) return

      targetRef.current = href
      clearTimer(delayTimerRef)
      clearTimer(hideTimerRef)

      if (isVisibleRef.current) return

      delayTimerRef.current = setTimeout(() => {
        visibleSinceRef.current = performance.now()
        isVisibleRef.current = true
        setIsVisible(true)
      }, displayDelayMs)
    },
    [pathname],
  )

  const contextValue = useMemo<NavigationLoadingContextValue>(
    () => ({ startNavigation }),
    [startNavigation],
  )

  return (
    <NavigationLoadingContext.Provider value={contextValue}>
      {children}
      <NavigationLoadingOverlay visible={isVisible} />
    </NavigationLoadingContext.Provider>
  )
}

/**
 * Returns the function that starts delayed loading feedback for a route transition.
 *
 * @throws Error when called outside a `NavigationLoadingProvider` subtree.
 */
export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext)

  if (!context) {
    throw new Error('Navigation links must be rendered inside a NavigationLoadingProvider.')
  }

  return context
}
