import { useControlled } from '@/hooks'
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
      setTimeout(() => window.addEventListener('click', handleclosePopover), 0)
    }

    return () => {
      window.removeEventListener('click', handleclosePopover)
    }
  }, [anchorEl])

  const getPositionLeft = () => {
    return window.innerWidth - position.right
  }

  if (typeof window === 'undefined') return null
  if (!isOpen || !anchorEl || !position) {
    const node = document.getElementById(id)
    node && document.body.removeChild(node as Node)
    return
  }

  return (
    <Portal target={id}>
      <div
        className="bg-white absolute rounded-lg shadow-lg z-10 border border-gray-300"
        style={{ top: position.bottom, right: getPositionLeft() }}
      >
        <div className="p-2">{children}</div>
      </div>
    </Portal>
  )
}
