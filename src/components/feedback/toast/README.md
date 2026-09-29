# Toast notifications

## Purpose

This module provides the application-wide toast notification area and a small API for meaningful asynchronous mutations.

## Public API

- `ToastProvider`: renders the single `react-toastify` container for the application.
- `notify.promise(operation, messages)`: displays a loading message while `operation` is pending, then replaces it with a success or error message. It resolves or rejects with the original operation result.

## Usage

Render `ToastProvider` once in the root layout. Use `notify.promise` in a client component when a person creates, edits, or deletes persisted data.

```tsx
const goal = await notify.promise(createGoal({ title, audience }), {
  loading: 'Criando meta...',
  success: 'Meta adicionada com sucesso.',
  error: 'Não foi possível adicionar a meta. Tente novamente.',
})
```

## Behavior

- Toasts appear in the top-right corner and close automatically after five seconds once completed.
- A pending toast is replaced in place by the matching result, so one operation creates one notification.
- The provider uses the application's dark theme and semantic color tokens.
- `notify.promise` rethrows failures after showing the error toast, allowing the calling component to preserve local recovery behavior.

## Limitations

- Do not use toasts for field validation; keep validation messages next to the relevant input.
- Do not use toasts for lightweight interface actions such as navigation, opening a modal, or filtering.
- The module does not expose a notification for every event. Reserve it for meaningful create, update, and delete operations.
