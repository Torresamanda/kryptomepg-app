import type { ComponentPropsWithoutRef } from 'react'

type PageContainerProps = ComponentPropsWithoutRef<'div'>

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  const classes = ['mx-auto w-full max-w-8xl px-6 py-8 lg:px-8 lg:py-10', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
