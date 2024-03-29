import { FC, ReactNode, useEffect, useRef } from 'react'
import { useControlled } from '@/hooks'
import { getContainer, Portal } from './Portal'
import { Button } from './Button'
import * as ReactDOMClient from 'react-dom/client'
import { XMarkIcon } from '@heroicons/react/20/solid'

type Props = {
  isOpen?: boolean
  header?: ReactNode
  target?: string
  children?: ReactNode
  root?: ReactDOMClient.Root
  maskClosable?: boolean
  closable?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}
type ModalComponent<T> = FC<T> & {
  alert: (
    msg: string,
    onConfirm?: Props['onConfirm'],
    onCancel?: Props['onCancel']
  ) => void
}

const _Modal: FC<Props> = ({
  isOpen: _isOpen,
  target = 'modal',
  header,
  children,
  root,
  closable = true,
  maskClosable = true,
  onConfirm,
  onCancel,
  ...props
}) => {
  const [isOpen, setIsOpen] = useControlled<boolean>({
    controlled: _isOpen,
    default: true,
  })

  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.add('disabled-scroll')

    return () => {
      body.classList.remove('disabled-scroll')
      const node = document.getElementById(target)
      node && document.body.removeChild(node as Node)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    onCancel && onCancel()
  }

  const handleConfirm = () => {
    handleClose()
    onConfirm && onConfirm()
  }

  if (!isOpen) {
    // https://tinyurl.com/5n8yvm28
    setTimeout(() => {
      root?.unmount()
    })
  }

  return (
    <section className="absolute top-0 left-0 bottom-0 right-0 z-10">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 bg-black/50"
        onClick={() => maskClosable && handleClose()}
      ></div>
      <div className="absolute top-1/2 left-1/2 translate-y-[-100%] translate-x-[-50%] bg-white rounded-2xl p-2  min-w-[300px]">
        <div className="text-center py-4">
          <div>{!!header && header}</div>
          {closable ? (
            <span
              className="cursor-pointer absolute top-2 right-2"
              onClick={handleClose}
            >
              <XMarkIcon
                className="h-7 w-7 text-sky-700 group-hover:text-sky-400"
                aria-hidden="true"
              />
            </span>
          ) : null}
        </div>
        <div className="min-h-[80px] px-4">{children}</div>
        <div className="flex gap-4">
          <Button variant="primary" fullWidth={true} onClick={handleConfirm}>
            確認
          </Button>
        </div>
      </div>
    </section>
  )
}

export const Modal: ModalComponent<Props> = ({ children, ...props }) => {
  if (!props.isOpen) return null

  return (
    <Portal target="modal" lockScreen={false}>
      <_Modal {...props}>{children}</_Modal>
    </Portal>
  )
}

Modal.alert = (msg, onConfirm, onCancel) => {
  const target = 'modal'
  getContainer(target)
  const root = ReactDOMClient.createRoot(document.getElementById(target))
  root.render(
    <_Modal
      onConfirm={onConfirm}
      target={target}
      onCancel={onCancel}
      root={root}
    >
      {msg}
    </_Modal>
  )
}
