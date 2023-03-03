import { FC, InputHTMLAttributes } from 'react'
import { GlobalError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  name: string
  error: GlobalError
  label: string
  register: UseFormRegisterReturn
} & InputHTMLAttributes<HTMLInputElement>
export const Input: FC<Props> = ({
  name,
  error,
  label,
  register,
  placeholder,
  ...props
}) => {
  const inputId = `${name}-input`
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="text-sm text-gray-">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className="mt-2 mb-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
        placeholder={placeholder}
        {...register}
        {...props}
      />
      {error ? <p className="text-rose-500 text-sm">{error.message}</p> : null}
    </div>
  )
}
