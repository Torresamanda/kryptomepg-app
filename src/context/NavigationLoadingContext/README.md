# Navigation Loading Context

## Purpose

`NavigationLoadingProvider` displays delayed loading feedback during client-side route transitions.

## Public API

- `NavigationLoadingProvider`: wraps the application area containing navigation links.
- `useNavigationLoading`: exposes `startNavigation(href)` for links that should trigger loading feedback.

## Usage

```tsx
const { startNavigation } = useNavigationLoading()

<Link href="/biblioteca" onClick={() => startNavigation('/biblioteca')}>
  Library
</Link>
```

## Behavior

- The overlay appears only after a 200 ms delay.
- Fast route transitions complete before the delay and show no loading UI.
- Once visible, the overlay remains visible for at least 350 ms.
- The provider hides the overlay when `usePathname()` reports the destination route.

## Limitations

- Links must call `startNavigation` to opt in to the feedback.
- The context tracks pathname changes, not query-parameter-only changes.
- It does not replace loading states for server data fetched after a route is rendered.
