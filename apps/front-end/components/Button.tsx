export const Button = ({ children, variant, type, ...props }) => {
  const styles = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 ',
  }

  return (
    <button
      type={type}
      className={`group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles[variant]}`}
      {...type}
    >
      {children}
    </button>
  )
}
