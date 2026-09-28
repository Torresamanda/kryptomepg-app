import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockUseSearchParams } = vi.hoisted(() => ({
  mockUseSearchParams: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useSearchParams: mockUseSearchParams,
}))

describe('useQueryDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.spyOn(window.history, 'pushState')
    vi.spyOn(window.history, 'replaceState')

    window.history.replaceState(null, '', '/biblioteca')
    mockUseSearchParams.mockReturnValue(new URLSearchParams())
  })

  it('is open when its query parameter is true', () => {
    window.history.replaceState(null, '', '/biblioteca?new-experience=true')

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    expect(result.current.isOpen).toBe(true)
  })

  it('is closed when its query parameter is not true', () => {
    window.history.replaceState(null, '', '/biblioteca?new-experience=false')

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    expect(result.current.isOpen).toBe(false)
  })

  it('adds its query parameter while preserving existing parameters', () => {
    window.history.replaceState(null, '', '/biblioteca?filters=true')

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    act(() => {
      result.current.open()
    })

    expect(window.history.pushState).toHaveBeenCalledWith(
      window.history.state,
      '',
      '/biblioteca?filters=true&new-experience=true',
    )
    expect(result.current.isOpen).toBe(true)
  })

  it('removes only its own query parameter', () => {
    window.history.replaceState(null, '', '/biblioteca?new-experience=true&filters=true')

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    act(() => {
      result.current.close()
    })

    expect(window.history.replaceState).toHaveBeenCalledWith(
      window.history.state,
      '',
      '/biblioteca?filters=true',
    )
    expect(result.current.isOpen).toBe(false)
  })
})
