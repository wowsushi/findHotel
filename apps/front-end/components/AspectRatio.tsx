import { cloneElement, FC, ReactElement } from 'react'

type Props = {
  children: ReactElement
  ratio: number
}

export const AspectRatio: FC<Props> = ({ children, ratio }) => {
  return (
    <div className="relative" style={{ paddingTop: `${ratio * 100}%` }}>
      {cloneElement(children, {
        ...children.props,
        className: children.props.className + ' absolute top-0 left-0',
      })}
    </div>
  )
}
