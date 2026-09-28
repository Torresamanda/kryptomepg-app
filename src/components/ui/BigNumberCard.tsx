import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface BigNumberCardProps extends ComponentPropsWithoutRef<'article'> {
  hoverValueClassName?: string
  label: string
  value: ReactNode
  valueClassName?: string
}

export function BigNumberCard({
  className,
  hoverValueClassName = 'group-hover:text-accent-blue-700',
  label,
  value,
  valueClassName,
  ...props
}: BigNumberCardProps) {
  const cardClasses = [
    'group flex flex-col justify-center rounded-lg border border-border-default bg-surface-default p-4 transition-colors hover:bg-surface-elevated',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const valueClasses = [
    'font-sans text-3xl font-bold leading-none text-accent-blue-600 transition-colors',
    hoverValueClassName,
    valueClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClasses} {...props}>
      <p className={valueClasses}>{value}</p>
      <p className="mt-3 text-sm text-text-secondary">{label}</p>
    </article>
  )
}
