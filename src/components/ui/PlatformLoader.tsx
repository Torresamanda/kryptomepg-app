import { LoadingCassetteIcon } from '@/assets/icons'

interface PlatformLoaderProps {
  embedded?: boolean
}

export function PlatformLoader({ embedded = false }: PlatformLoaderProps) {
  return (
    <div
      className={
        embedded
          ? 'flex items-center justify-center'
          : 'flex min-h-dvh items-center justify-center bg-background-primary px-6'
      }
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-xs text-center">
        <LoadingCassetteIcon className="mx-auto" />
        <p className="mt-6 font-memory text-lg text-brand-gold-500 animate-pulse">
          CARREGANDO JORNADA...
        </p>
        <div
          aria-hidden="true"
          className="relative mt-4 h-2 overflow-hidden rounded-full bg-surface-elevated"
        >
          <span className="absolute inset-y-0 w-1/3 rounded-full bg-brand-gold-500 animate-loading-progress" />
        </div>
        <span className="sr-only">Carregando jornada</span>
      </div>
    </div>
  )
}
