import { useLayoutEffect, useState } from 'react'

export const INITIALDOMRECT = {
  height: 0,
  width: 0,
}

export default (domRef, fn) => {
  const boundingCLientRect = domRef.current ? domRef.current.getBoundingClientRect() : {}
  const [domRect, setDomRect] = useState(INITIALDOMRECT)

  useLayoutEffect(() => {
    const newDomRect = Object.keys(domRect).reduce((acc, ele) => {
      const isNewDomRect = boundingCLientRect[ele] && boundingCLientRect[ele] > domRect[ele]
      return {
        ...acc,
        [ele]: isNewDomRect ? boundingCLientRect[ele] : domRect[ele],
        isNewDomRect: acc.isNewDomRect || isNewDomRect,
      }
    }, {})

    if (newDomRect.isNewDomRect) {
      setDomRect(newDomRect)
      fn(newDomRect)
    }
  }, [boundingCLientRect])
}
