'use client'

import { useCallback, useRef, type PointerEvent } from 'react'

interface DragState {
  pointerId: number | null
  startScrollLeft: number
  startX: number
}

function startsOnInteractiveControl(target: EventTarget | null) {
  return (
    target instanceof Element &&
    target.closest('a, button, input, select, textarea, [role="button"]') !== null
  )
}

/**
 * Adds pointer-based horizontal dragging to a scrollable element.
 */
export function useDragScroll<T extends HTMLElement>() {
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startScrollLeft: 0,
    startX: 0,
  })

  const finishDrag = useCallback((event: PointerEvent<T>) => {
    const state = dragStateRef.current
    if (state.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    state.pointerId = null
  }, [])

  const onPointerDown = useCallback((event: PointerEvent<T>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (startsOnInteractiveControl(event.target)) return

    const state = dragStateRef.current
    state.pointerId = event.pointerId
    state.startScrollLeft = event.currentTarget.scrollLeft
    state.startX = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [])

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const state = dragStateRef.current
    if (state.pointerId !== event.pointerId) return

    const distance = event.clientX - state.startX
    event.currentTarget.scrollLeft = state.startScrollLeft - distance
  }, [])

  return {
    onPointerCancel: finishDrag,
    onPointerDown,
    onPointerMove,
    onPointerUp: finishDrag,
  }
}
