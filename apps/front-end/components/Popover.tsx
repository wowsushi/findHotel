import { useControlled } from '@/hooks'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Portal } from './Portal'

type Props = {
  id: string
  open?: boolean
  anchorEl?: null | Element
  children: ReactNode
  onClose?: () => void
}

export const Popover: FC<Props> = ({
  id,
  open: _isOpen,
  anchorEl,
  children,
  onClose,
}) => {
  const router = useRouter()

  const [position, setPosition] = useState<DOMRect>()
  const [isOpen] = useControlled<boolean>({
    controlled: _isOpen,
    default: false,
  })
  useEffect(() => {
    function handleclosePopover(event) {
      if (event.target.closest(`#${id}`)) return
      onClose && onClose()
    }
    if (anchorEl) {
      const elPosition = anchorEl.getBoundingClientRect()
      setPosition(elPosition)
      setTimeout(() => window.addEventListener('click', handleclosePopover))
    }

    return () => {
      window.removeEventListener('click', handleclosePopover)
    }
  }, [anchorEl])

  useEffect(() => {
    router.events.on('routeChangeComplete', onClose)

    return () => router.events.off('routeChangeComplete', onClose)
  })

  const getPositionLeft = () => {
    return window.innerWidth - position.right
  }

  if (typeof window === 'undefined') return null
  if (!isOpen || !anchorEl || !position) {
    return
  }

  return (
    <Portal target={id}>
      <div
        className="bg-white fixed rounded-lg shadow-lg z-10 border border-gray-300"
        style={{ top: position.bottom, right: getPositionLeft() }}
      >
        <div className="p-2">{children}</div>
      </div>
    </Portal>
  )
}
