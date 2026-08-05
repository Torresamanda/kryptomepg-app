import { UserAvatar } from '@/components/ui/UserAvatar'
import type { CurrentUser } from '@/features/auth/types/CurrentUser'

interface ProfileSummaryProps {
  user: CurrentUser
}

export function ProfileSummary({ user }: ProfileSummaryProps) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-border-default bg-surface-default px-6 py-10 text-center shadow-lg sm:px-10 sm:py-12">
      <UserAvatar variant={user.avatarVariant} size="xl" />
      <h1 className="mt-6 text-3xl font-bold text-text-primary">{user.name}</h1>
    </section>
  )
}
