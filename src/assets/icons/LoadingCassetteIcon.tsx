import type { ComponentPropsWithoutRef } from 'react'

type IconSize = 'sm' | 'md'

interface LoadingCassetteIconProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'size'> {
  size?: IconSize
}

const sizeClasses: Record<IconSize, string> = {
  sm: 'h-14 w-24',
  md: 'h-20 w-32',
}

export function LoadingCassetteIcon({
  className,
  size = 'md',
  ...props
}: LoadingCassetteIconProps) {
  const iconClasses = [sizeClasses[size], 'shrink-0 [image-rendering:pixelated]', className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      viewBox="0 0 48 30"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClasses}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="1"
        y="3"
        width="46"
        height="24"
        rx="2"
        fill="#202333"
        stroke="#f3c94a"
        strokeWidth="2"
      />
      <rect x="20" y="9" width="8" height="12" rx="1" fill="#f3c94a" />

      <g className="animate-spin" style={{ transformOrigin: '11px 15px' }}>
        <circle cx="11" cy="15" r="6" fill="#090c16" stroke="#f3c94a" strokeWidth="3" />
        <rect x="10" y="10" width="2" height="10" fill="#f3c94a" />
        <rect x="6" y="14" width="10" height="2" fill="#f3c94a" />
      </g>
      <g className="animate-spin" style={{ transformOrigin: '37px 15px' }}>
        <circle cx="37" cy="15" r="6" fill="#090c16" stroke="#f3c94a" strokeWidth="3" />
        <rect x="36" y="10" width="2" height="10" fill="#f3c94a" />
        <rect x="32" y="14" width="10" height="2" fill="#f3c94a" />
      </g>
    </svg>
  )
}
