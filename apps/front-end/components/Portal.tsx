import { FC, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
  target: string
  lockScreen?: boolean
}
export const getContainer = (target) => {
  const existingTarget = document.getElementById(target)
  if (!existingTarget) {
    const container = document.createElement('div')
    container.id = target
    document.body.appendChild(container)
  }
}

export const Portal: FC<Props> = ({ children, target, lockScreen = true }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const body = document.querySelector('body')
    body.classList.add('disabled-scroll')
    return () => {
      body.classList.remove('disabled-scroll')
      const node = document.getElementById(target)
      node && document.body.removeChild(node as Node)
    }
  }, [])

  if (typeof window === 'undefined') return null
  getContainer(target)

  return createPortal(children, document.getElementById(target))
}
