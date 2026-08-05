# useQueryDrawer

## Purpose

`useQueryDrawer` synchronizes a drawer's open state with a boolean query parameter in the current URL.

## API

```ts
useQueryDrawer(parameterName: string)
```

Returns:

- `isOpen`: `true` when the parameter value is `true`.
- `open()`: adds `<parameterName>=true` to the URL.
- `close()`: removes only `<parameterName>` from the URL.

## Usage

```tsx
const newExperienceDrawer = useQueryDrawer('new-experience')

<Button onClick={newExperienceDrawer.open}>Add experience</Button>
<NewExperienceDrawer open={newExperienceDrawer.isOpen} onClose={newExperienceDrawer.close} />
```

## Behavior

- `open()` uses navigation history, so the browser back button can close the drawer.
- Existing query parameters are preserved when a drawer opens or closes.
- Multiple drawers can use separate parameters, such as `new-experience` or `filters`.
- Reloading a URL with `<parameterName>=true` keeps the drawer open.

## Limitations

- The hook manages only the open state; it does not persist form values.
- The parameter must equal the string `true` to open the drawer.
- Components using this hook must be client components.
