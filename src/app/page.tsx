'use client'

import { BookOpenIcon, GameControllerIcon, StarIcon, TrophyIcon } from '@/assets/icons'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { LoginForm } from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-6 py-10">
      <BookOpenIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-10 size-12 text-brand-purple-500 opacity-30 md:left-[15%] md:top-[18%] md:size-20"
        weight="duotone"
      />
      <GameControllerIcon
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-5 size-12 text-accent-blue-500 opacity-30 md:bottom-[18%] md:right-[15%] md:size-20"
        weight="duotone"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-1/3 hidden -rotate-6 rounded border border-brand-gold-500/40 bg-brand-gold-900/30 px-2 py-1 font-memory text-xs text-brand-gold-400 md:block"
      >
        1UP
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-8 hidden rotate-3 border-x-2 border-brand-purple-500/50 px-2 py-1 font-memory text-xs text-brand-purple-300 md:block"
      >
        LVL 01
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[22%] top-[20%] hidden md:block"
      >
        <StarIcon className="size-5 text-brand-gold-500 opacity-45" weight="fill" />
        <StarIcon className="ml-6 mt-2 size-3 text-brand-gold-300 opacity-35" weight="fill" />
      </div>
      <TrophyIcon
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[20%] left-[23%] hidden size-9 -rotate-12 text-brand-gold-600 opacity-25 md:block"
        weight="duotone"
      />
      <div className="relative w-full max-w-md rounded-xl border border-border-default bg-surface-elevated p-6 shadow-2xl shadow-background-primary/40 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-memory text-sm text-brand-gold-500">Kryptompeg</p>
            <h1 className="mt-2 text-2xl font-semibold text-text-primary">Continue sua jornada</h1>
          </div>
          <div className="flex -space-x-3" aria-hidden="true">
            <UserAvatar variant="female" size="md" className="bg-surface-default" />
            <UserAvatar variant="male" size="md" className="bg-surface-default" />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
