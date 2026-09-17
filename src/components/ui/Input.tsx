import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, id, label, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const errorId = `${inputId}-error`

  const classes = [
    'min-h-11 w-full rounded-md border bg-surface-default px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted',
    'border-border-default hover:border-text-muted focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/30',
    'aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:ring-error/30',
    'disabled:cursor-not-allowed disabled:opacity-50',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="grid gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={classes}
        aria-describedby={error ? errorId : undefined}
        aria-errormessage={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
})
