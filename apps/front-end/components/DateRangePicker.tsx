import { FC } from 'react'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'
import { Input } from './Input'

type Props = {
  label?: string
  startDate: Date
  endDate: Date
  invertTextColor?: boolean
  inputMode?: string
  onChange: (update: [string, string]) => void
}

export const DateRangePicker: FC<Props> = ({
  label,
  invertTextColor,
  ...props
}) => {
  return (
    <>
      <label
        className={`block uppercase tracking-wide text-sm font-bold mb-2 ${
          invertTextColor ? 'text-white' : 'text-gray-700'
        }`}
      >
        {label}
      </label>
      <DatePicker
        className="mb-2 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
        dateFormat="yyyy/MM/dd"
        minDate={new Date()}
        maxDate={dayjs().add(30, 'd').toDate()}
        selectsRange
        customInput={<Input inputMode="none" />}
        {...props}
      />
    </>
  )
}
