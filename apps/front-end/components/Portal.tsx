import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal = ({ children, target }) => {
  const isSetRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])
  if (isSetRef.current) return

  if (mounted) {
    const existingTarget = document.querySelector(target)
    if (!existingTarget) {
      const container = document.createElement('div')
      container.className = target
      document.body.appendChild(container)
    }
    isSetRef.current = true
  }
  return mounted
    ? createPortal(children, document.querySelector(`.${target}`))
    : null
}
