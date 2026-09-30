# useDragScroll

## Purpose

Adds direct pointer dragging to a horizontally scrollable container, such as a row of cards.

## Public API

`useDragScroll<T>()` returns pointer handlers to spread on a scrollable element.

## Usage

```tsx
const dragScroll = useDragScroll<HTMLDivElement>()

return (
  <div {...dragScroll} className="drag-scroll overflow-x-auto">
    ...
  </div>
)
```

## Behavior

- Supports mouse and touch pointers.
- Ignores drags that start on links, buttons, and form controls so their clicks remain available.
- Does not render a visual scrollbar.

## Limitations

- The consuming element must provide horizontal overflow through its own styles.
- It only handles horizontal dragging; vertical page scrolling remains the browser's responsibility.
