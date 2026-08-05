import type { ComponentPropsWithoutRef } from 'react'

type IconSize = 'md' | 'lg'

interface BrokenCassetteIconProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'size'> {
  size?: IconSize
}

const sizeClasses: Record<IconSize, string> = {
  md: 'h-28 w-44',
  lg: 'h-36 w-56',
}

export function BrokenCassetteIcon({ className, size = 'lg', ...props }: BrokenCassetteIconProps) {
  const iconClasses = [sizeClasses[size], 'shrink-0 [image-rendering:pixelated]', className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      viewBox="0 0 56 36"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClasses}
      aria-hidden="true"
      {...props}
    >
      <g transform="rotate(-3 14 18)">
        <rect
          x="2"
          y="5"
          width="23"
          height="24"
          rx="2"
          fill="#202333"
          stroke="#f3c94a"
          strokeWidth="2"
        />
        <rect x="6" y="12" width="12" height="12" fill="#090c16" stroke="#f3c94a" strokeWidth="2" />
        <rect x="11" y="15" width="2" height="6" fill="#f3c94a" />
        <rect x="8" y="17" width="8" height="2" fill="#f3c94a" />
        <rect x="19" y="11" width="3" height="12" fill="#f3c94a" />
      </g>

      <g transform="rotate(3 42 18)">
        <rect
          x="31"
          y="5"
          width="23"
          height="24"
          rx="2"
          fill="#202333"
          stroke="#f3c94a"
          strokeWidth="2"
        />
        <rect
          x="38"
          y="12"
          width="12"
          height="12"
          fill="#090c16"
          stroke="#f3c94a"
          strokeWidth="2"
        />
        <rect x="43" y="15" width="2" height="6" fill="#f3c94a" />
        <rect x="40" y="17" width="8" height="2" fill="#f3c94a" />
        <rect x="34" y="11" width="3" height="12" fill="#f3c94a" />
      </g>

      <path
        d="M25 6L29 12L26 18L30 24L27 31"
        stroke="#ff5c7a"
        strokeWidth="2"
        strokeLinecap="square"
        fill="none"
      />
      <path
        d="M29 12L33 9L35 12L31 16"
        stroke="#ff5c7a"
        strokeWidth="2"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  )
}
