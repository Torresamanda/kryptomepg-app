'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FemaleAvatarIcon } from '@/assets/icons'
import { isActiveRoute, navigationItems } from './navigationItems'

interface ActiveIndicator {
  left: number
  width: number
}

export function DesktopNavigation() {
  const pathname = usePathname()
  const navigationRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [indicator, setIndicator] = useState<ActiveIndicator | null>(null)

  const updateIndicator = useCallback(() => {
    const activeItem = navigationItems.find((item) => isActiveRoute(pathname, item.href))
    const navigation = navigationRef.current
    const activeLink = activeItem ? linkRefs.current[activeItem.href] : null

    if (!navigation || !activeLink) return

    const navigationBounds = navigation.getBoundingClientRect()
    const linkBounds = activeLink.getBoundingClientRect()
    const indicatorInset = 24

    setIndicator({
      left: linkBounds.left - navigationBounds.left,
      width: Math.max(linkBounds.width - indicatorInset * 2, 24),
    })
  }, [pathname])

  useLayoutEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  return (
    <header className="hidden border-b border-border-default bg-background-primary md:block">
      <div className="mx-auto flex h-20 max-w-8xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="Kryptompeg — Nossa jornada">
          <Image src="/logo.svg" alt="Kryptompeg" width={120} height={48} priority />
        </Link>

        <nav
          ref={navigationRef}
          className="relative flex items-center gap-4"
          aria-label="Navegação principal"
        >
          {navigationItems.map((item, index) => (
            <div key={item.href} className="flex items-center gap-4">
              <Link
                ref={(element) => {
                  linkRefs.current[item.href] = element
                }}
                href={item.href}
                aria-current={isActiveRoute(pathname, item.href) ? 'page' : undefined}
                className="pb-2 font-memory text-1xl leading-none uppercase text-text-primary transition-colors hover:text-brand-gold-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-focus"
              >
                {item.label}
              </Link>
              {index < navigationItems.length - 1 && (
                <span aria-hidden="true" className="size-2 rounded-full bg-brand-gold-500" />
              )}
            </div>
          ))}
          {indicator && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 h-0.5 rounded-full bg-brand-gold-500 transition-[transform,width] duration-300 ease-out"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
          )}
        </nav>

        <div className="flex size-10 items-center justify-center rounded-full border border-brand-gold-500 bg-surface-elevated">
          <FemaleAvatarIcon size="sm" />
        </div>
      </div>
    </header>
  )
}
