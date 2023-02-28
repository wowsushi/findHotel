export const Input = ({ name, error, label, ...props }) => {
  const inputId = `${name}-input`
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="text-sm text-gray-">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className="mt-2 mb-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Email"
        {...props}
      />
      {error ? <p className="text-rose-500 text-sm">{error.message}</p> : null}
    </div>
  )
}
