import { ButtonHTMLAttributes, FC } from 'react'

type Props = {
  variant: 'primary' | 'link'
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
export const Button: FC<Props> = ({
  children,
  variant,
  type,
  fullWidth,
  className,
  ...props
}) => {
  const styles = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 ',
    link: 'text-gray-600 hover:text-gray-700 focus:ring-gray-200 ',
  }

  return (
    <button
      type={type}
      className={`group relative flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        styles[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
