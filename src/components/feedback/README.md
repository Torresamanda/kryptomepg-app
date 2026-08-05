# Feedback Page

## Purpose

`FeedbackPage` provides a consistent, user-friendly layout for application feedback states such as missing routes, unauthenticated access, and unexpected errors.

## Public API

The component accepts a status `code`, `title`, `description`, optional `errorId`, and action elements through `children`.

## Usage

```tsx
<FeedbackPage code="404" title="Tape not found" description="This tape is not in the collection.">
  <Link href="/nossa-jornada">Back to journey</Link>
</FeedbackPage>
```

## Behavior

- Displays the shared broken cassette visual.
- Shows only user-safe error information.
- Renders caller-provided actions so each state can offer the appropriate recovery path.

## Limitations

- It does not decide which action should be shown for an authentication state.
- It does not log errors or generate error identifiers.
