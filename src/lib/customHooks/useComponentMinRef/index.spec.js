import { renderHook } from '@testing-library/react-hooks'

import useComponentRef, { INITIALDOMRECT } from './index'

const getDomRef = measurements => ({
  current: {
    getBoundingClientRect: () => measurements,
  },
})

describe('useComponentRef', () => {
  const cb = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should not setup new values if no new measurement has been passed', () => {
    renderHook(() => useComponentRef({}, cb))
    expect(cb).not.toHaveBeenCalled()
  })
  it('should not setup new values if new measurement are the same values', () => {
    const mockDomRef = getDomRef(INITIALDOMRECT)
    renderHook(() => useComponentRef(mockDomRef, cb))
    expect(cb).not.toHaveBeenCalled()
  })
  it('should call the callback with the highest measurement values', () => {
    const mockDomRef1 = getDomRef({
      height: 100,
      width: -1,
    })
    renderHook(() => useComponentRef(mockDomRef1, cb))
    expect(cb).toHaveBeenCalledWith({
      height: 100,
      width: 0,
      isNewDomRect: true,
    })

    cb.mockClear()

    const mockDomRef2 = getDomRef({
      height: -1,
      width: 100,
    })

    renderHook(() => useComponentRef(mockDomRef2, cb))
    expect(cb).toHaveBeenCalledWith({
      height: 0,
      width: 100,
      isNewDomRect: true,
    })
  })
})
