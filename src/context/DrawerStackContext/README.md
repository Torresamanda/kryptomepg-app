# Drawer Stack Context

## Purpose

`DrawerStackProvider` coordinates drawers rendered in the same application subtree. It tracks their opening order, identifies the top drawer, and locks page scrolling while at least one drawer is open.

## Public API

- `DrawerStackProvider`: wraps the application area that can render drawers.
- `useDrawerStack`: returns the registration and stack-inspection functions consumed by the generic `Drawer` component.

## Usage

Wrap the authenticated application layout once:

```tsx
import { DrawerStackProvider } from '@/context/DrawerStackContext/DrawerStackContext'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <DrawerStackProvider>{children}</DrawerStackProvider>
}
```

`Drawer` handles registration automatically. Application features should use `Drawer` instead of calling `useDrawerStack` directly.

## Behavior

- The most recently registered drawer is the top drawer.
- The top drawer receives the highest stacking order and is responsible for interaction and keyboard handling.
- Page scrolling is locked while the stack contains at least one drawer.
- When the top drawer closes, the previous drawer remains registered and can become interactive again.

## Limitations

- This context does not control URL query parameters or form data.
- It is a client-side module and must only be used from client components.
