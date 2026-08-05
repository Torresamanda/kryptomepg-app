'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpenIcon, ClockIcon, HeartIcon, PlusIcon } from '@/assets/icons'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { useNavigationLoading } from '@/context/NavigationLoadingContext/NavigationLoadingContext'
import type { CurrentUser } from '@/features/auth/types/CurrentUser'
import { isActiveRoute } from './navigationItems'
import { MobileNavigationLink } from './MobileNavigationLink'

interface MobileNavigationProps {
  onAddExperience: () => void
  user: CurrentUser
}

export function MobileNavigation({ onAddExperience, user }: MobileNavigationProps) {
  const pathname = usePathname()
  const { startNavigation } = useNavigationLoading()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border-default bg-surface-default px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden"
      aria-label="Navegação móvel"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 items-end gap-1">
        <MobileNavigationLink
          href="/nossa-jornada"
          label="Jornada"
          active={isActiveRoute(pathname, '/nossa-jornada')}
          onNavigate={startNavigation}
        >
          <HeartIcon weight="fill" />
        </MobileNavigationLink>
        <MobileNavigationLink
          href="/biblioteca"
          label="Biblioteca"
          active={isActiveRoute(pathname, '/biblioteca')}
          onNavigate={startNavigation}
        >
          <BookOpenIcon />
        </MobileNavigationLink>
        <button
          type="button"
          onClick={onAddExperience}
          className="cursor-pointer -mt-8 flex flex-col items-center gap-1 text-sm font-medium text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-focus"
        >
          <span className="flex size-14 items-center justify-center rounded-full border-2 border-border-default bg-brand-gold-500 text-background-primary shadow-lg transition-transform duration-200 hover:-translate-y-0.5">
            <PlusIcon size={28} weight="bold" />
          </span>
          Adicionar
        </button>
        <MobileNavigationLink
          href="/linha-do-tempo"
          label="Linha do tempo"
          active={isActiveRoute(pathname, '/linha-do-tempo')}
          onNavigate={startNavigation}
        >
          <ClockIcon />
        </MobileNavigationLink>
        <Link
          href="/perfil"
          aria-label={`Ver perfil de ${user.name}`}
          onClick={() => startNavigation('/perfil')}
          className="flex flex-col items-center gap-1 rounded-md text-xs font-medium text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
        >
          <UserAvatar variant={user.avatarVariant} size="sm" />
          Perfil
        </Link>
      </div>
    </nav>
  )
}
