import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { GlobalError, UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  name: string
  error?: GlobalError
  label?: string
  register?: UseFormRegisterReturn
  type?: 'date' | HTMLInputTypeAttribute
} & InputHTMLAttributes<HTMLInputElement>
export const Input: FC<Props> = ({
  name,
  error,
  label,
  register,
  placeholder,
  type,
  children,
  ...props
}) => {
  const inputId = `${name}-input`

  switch (type) {
    case 'select': {
      return (
        <>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
            htmlFor={name}
          >
            {label}
          </label>
          <div className="relative mb-2">
            <select
              className="inline-block mt-2 mb-1 relative w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              id={name}
              {...register}
            >
              {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 11l3-3 3 3h-6z" />
              </svg>
            </div>
          </div>
        </>
      )
    }
  }
  return (
    <div className="mb-2">
      <label htmlFor={inputId} className="text-gray-700 text-xs font-bold mb-2">
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
