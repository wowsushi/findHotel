import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

export const DateRangePicker = ({ label, ...props }) => {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <DatePicker
        className="mb-2 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
        selectsRange={true}
        {...props}
      />
    </>
  )
}
