import Link from 'next/link'
import type { ReactNode } from 'react'

interface MobileNavigationLinkProps {
  href: string
  label: string
  active: boolean
  children: ReactNode
  onNavigate: (href: string) => void
}

export function MobileNavigationLink({
  href,
  label,
  active,
  children,
  onNavigate,
}: MobileNavigationLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onNavigate(href)}
      aria-current={active ? 'page' : undefined}
      className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-1 text-center text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus ${
        active
          ? 'bg-brand-gold-500 text-background-primary'
          : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
      }`}
    >
      <span className="text-lg" aria-hidden="true">
        {children}
      </span>
      <span className="leading-3">{label}</span>
    </Link>
  )
}
