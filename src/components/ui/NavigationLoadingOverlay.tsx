import { PlatformLoader } from './PlatformLoader'

interface NavigationLoadingOverlayProps {
  visible: boolean
}

export function NavigationLoadingOverlay({ visible }: NavigationLoadingOverlayProps) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-40" aria-live="polite">
      <PlatformLoader />
    </div>
  )
}
