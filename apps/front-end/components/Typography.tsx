import { ReactNode, FC } from 'react'
type Color = 'primary' | 'secondary' | 'price' | 'alert' | 'success' | 'default'

type Props = {
  children: ReactNode
  className?: string
  color?: Color
  colorLevel?: number
}
type TypographyComponent<T> = FC<T> & {
  H2: FC<T>
  H3: FC<T>
  H4: FC<T>
  Text1: FC<T>
}
const generateClassName = ({
  color = 'default',
  colorLevel = 500,
  className: restClassName,
  ...rest
}) => {
  let className = ''
  const ColorConfig: Record<Color, string> = {
    primary: 'sky',
    secondary: 'price',
    price: 'red',
    alert: 'red',
    success: 'green',
    default: 'slate',
  }

  if (color) {
    className += `text-${ColorConfig[color]}-${colorLevel}`
  }

  return className + ' ' + restClassName
}

const Typography: TypographyComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  return <p>{children}</p>
}

Typography.H2 = ({ children, className, ...props }: Props) => (
  <h3
    className={`font-bold text-xl mb-2 ${className ? className : ''}`}
    {...props}
  >
    {children}
  </h3>
)
Typography.H2.displayName = 'Typography.H2'

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

Typography.Text1 = ({
  children,
  color,
  colorLevel,
  className,
  ...props
}: Props) => (
  <p className={generateClassName({ color, colorLevel, className })} {...props}>
    {children}
  </p>
)
Typography.Text1.displayName = 'Typography.Text1'

export { Typography }
