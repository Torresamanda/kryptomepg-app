import type { ComponentPropsWithoutRef } from 'react'
import { FemaleAvatarIcon, MaleAvatarIcon } from '@/assets/icons'
import type { AvatarVariant } from '@/features/auth/types/CurrentUser'

type UserAvatarSize = 'sm' | 'md' | 'xl'

interface UserAvatarProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  variant: AvatarVariant
  size?: UserAvatarSize
}

const sizeClasses: Record<UserAvatarSize, string> = {
  sm: 'size-9',
  md: 'size-10',
  xl: 'size-32',
}

export function UserAvatar({ className, size = 'md', variant, ...props }: UserAvatarProps) {
  const classes = [
    'flex shrink-0 items-center justify-center rounded-full border border-brand-gold-500 bg-surface-elevated',
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const AvatarIcon = variant === 'female' ? FemaleAvatarIcon : MaleAvatarIcon

  return (
    <span className={classes} {...props}>
      <AvatarIcon className="size-3/4!" />
    </span>
  )
}
