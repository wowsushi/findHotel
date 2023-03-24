import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const getContainer = (target) => {
  const existingTarget = document.getElementById(target)
  if (!existingTarget) {
    const container = document.createElement('div')
    container.id = target
    document.body.appendChild(container)
  }
}

export const Portal = ({ children, target }) => {
  const isSetRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])
  if (isSetRef.current) return

  if (mounted) {
    getContainer(target)
    isSetRef.current = true
  }
  return mounted
    ? createPortal(children, document.getElementById(target))
    : null
}
