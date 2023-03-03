import { MutableRefObject, useEffect, useState } from 'react'

export const useGetPosition = (element): DOMRect => {
  const [positions, setPosition] = useState<DOMRect>()

  useEffect(() => {
    setPosition(element.current?.getBoundingClientRect())
  }, [element])

  return positions
}
