import { FC, PropsWithChildren } from 'react'
import { Portal } from './Portal'

type Props = {
  isOpen: boolean
  name: string
}
export const PopUp: FC<PropsWithChildren<Props>> = ({
  isOpen,
  children,
  name,
  ...props
}) => {
  if (!isOpen) return null
  return (
    <Portal target={name}>
      <div {...props}>{children}</div>
    </Portal>
  )
}
