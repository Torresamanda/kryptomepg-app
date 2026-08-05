'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface DrawerStackContextValue {
  registerDrawer: (id: string) => void
  unregisterDrawer: (id: string) => void
  getDrawerIndex: (id: string) => number
  isTopDrawer: (id: string) => boolean
}

const DrawerStackContext = createContext<DrawerStackContextValue | null>(null)

interface DrawerStackProviderProps {
  children: ReactNode
}

/**
 * Coordinates the visual stack and page scroll lock for every drawer in its subtree.
 *
 * Wrap the part of the application that renders drawers with this provider.
 */
export function DrawerStackProvider({ children }: DrawerStackProviderProps) {
  const [drawerStack, setDrawerStack] = useState<string[]>([])

  const registerDrawer = useCallback((id: string) => {
    setDrawerStack((currentStack) => [...currentStack.filter((drawerId) => drawerId !== id), id])
  }, [])

  const unregisterDrawer = useCallback((id: string) => {
    setDrawerStack((currentStack) => currentStack.filter((drawerId) => drawerId !== id))
  }, [])

  useEffect(() => {
    if (drawerStack.length === 0) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [drawerStack.length])

  const contextValue = useMemo<DrawerStackContextValue>(
    () => ({
      registerDrawer,
      unregisterDrawer,
      getDrawerIndex: (id) => drawerStack.indexOf(id),
      isTopDrawer: (id) => drawerStack.at(-1) === id,
    }),
    [drawerStack, registerDrawer, unregisterDrawer],
  )

  return <DrawerStackContext.Provider value={contextValue}>{children}</DrawerStackContext.Provider>
}

/**
 * Returns the drawer stack controls exposed by {@link DrawerStackProvider}.
 *
 * @throws Error when called outside a `DrawerStackProvider` subtree.
 */
export function useDrawerStack() {
  const context = useContext(DrawerStackContext)

  if (!context) {
    throw new Error('Drawer must be rendered inside a DrawerStackProvider.')
  }

  return context
}
