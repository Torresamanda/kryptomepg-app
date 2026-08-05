'use client'

import { usePathname } from 'next/navigation'
import { BookOpenIcon, ClockIcon, FemaleAvatarIcon, HeartIcon, PlusIcon } from '@/assets/icons'
import { isActiveRoute } from './navigationItems'
import { MobileNavigationLink } from './MobileNavigationLink'

interface MobileNavigationProps {
  onAddExperience: () => void
}

export function MobileNavigation({ onAddExperience }: MobileNavigationProps) {
  const pathname = usePathname()

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
        >
          <HeartIcon weight="fill" />
        </MobileNavigationLink>
        <MobileNavigationLink
          href="/biblioteca"
          label="Biblioteca"
          active={isActiveRoute(pathname, '/biblioteca')}
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
        >
          <ClockIcon />
        </MobileNavigationLink>

        <div className="flex flex-col items-center gap-1 text-xs font-medium text-text-secondary">
          <span className="flex size-9 items-center justify-center rounded-full border border-border-default bg-surface-elevated">
            <FemaleAvatarIcon size="xs" variant="secondary" />
          </span>
          Perfil
        </div>
      </div>
    </nav>
  )
}
