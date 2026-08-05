import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'default' | 'icon'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-gold-500 text-background-primary hover:bg-brand-gold-400',
  ghost: 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'min-h-10 rounded-md px-4 py-2 text-sm font-medium',
  icon: 'size-10 rounded-md',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, size = 'default', type = 'button', variant = 'primary', ...props },
  ref,
) {
  const classes = [
    'inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <button ref={ref} type={type} className={classes} {...props} />
})
