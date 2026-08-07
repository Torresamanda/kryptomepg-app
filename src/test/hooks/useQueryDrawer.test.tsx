import { useQueryDrawer } from '@/hooks/useQueryDrawer/useQueryDrawer'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockPush, mockReplace, mockUsePathname, mockUseSearchParams } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockReplace: vi.fn(),
  mockUsePathname: vi.fn(),
  mockUseSearchParams: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname,
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  useSearchParams: mockUseSearchParams,
}))

describe('useQueryDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockUsePathname.mockReturnValue('/biblioteca')
    mockUseSearchParams.mockReturnValue(new URLSearchParams())
  })

  it('is open when its query parameter is true', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('new-experience=true'))

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    expect(result.current.isOpen).toBe(true)
  })

  it('adds its query parameter while preserving existing parameters', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('filters=true'))

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    act(() => {
      result.current.open()
    })

    expect(mockPush).toHaveBeenCalledWith('/biblioteca?filters=true&new-experience=true', {
      scroll: false,
    })
  })

  it('removes only its own query parameter', () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('new-experience=true&filters=true'))

    const { result } = renderHook(() => useQueryDrawer('new-experience'))

    act(() => {
      result.current.close()
    })

    expect(mockReplace).toHaveBeenCalledWith('/biblioteca?filters=true', {
      scroll: false,
    })
  })
})
