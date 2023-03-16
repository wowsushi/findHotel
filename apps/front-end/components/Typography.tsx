import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
  className?: string
}
type TypographyComponent<T> = FC<T> & {
  H3: FC<T>
  H4: FC<T>
  Text1: FC<T>
}

const Typography: TypographyComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  return <p>{children}</p>
}

Typography.H3 = ({ children, className, ...props }: Props) => (
  <h3
    className={`font-bold text-lg mb-2 ${className ? className : ''}`}
    {...props}
  >
    {children}
  </h3>
)
Typography.H3.displayName = 'Typography.H3'

Typography.H4 = ({ children, className, ...props }: Props) => (
  <h4 className={`font-medium text-base mb-2 ${className}`} {...props}>
    {children}
  </h4>
)
Typography.H4.displayName = 'Typography.H3'

Typography.Text1 = ({ children, className, ...props }: Props) => (
  <p className={`text-slate-500 ${className}`} {...props}>
    {children}
  </p>
)
Typography.Text1.displayName = 'Typography.Text1'

export { Typography }
