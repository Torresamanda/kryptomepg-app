export const navigationItems = [
  { href: '/nossa-jornada', label: 'Nossa jornada', mobileLabel: 'Jornada' },
  { href: '/biblioteca', label: 'Biblioteca', mobileLabel: 'Biblioteca' },
  { href: '/linha-do-tempo', label: 'Linha do tempo', mobileLabel: 'Linha do tempo' },
]

export function isActiveRoute(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href)
}
