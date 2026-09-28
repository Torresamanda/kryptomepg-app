import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface BigNumberCardProps extends ComponentPropsWithoutRef<'article'> {
  label: string
  value: ReactNode
  valueClassName?: string
}

export function BigNumberCard({
  className,
  label,
  value,
  valueClassName,
  ...props
}: BigNumberCardProps) {
  const cardClasses = [
    'flex flex-col justify-center rounded-lg border border-border-default bg-surface-default p-4',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const valueClasses = [
    'font-sans text-3xl font-bold leading-none text-accent-blue-600',
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
