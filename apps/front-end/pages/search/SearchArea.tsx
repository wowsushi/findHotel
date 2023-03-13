import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, DateRangePicker, Input } from '@/components'

type FormValues = {
  area: string
  startDate: string
  endDate: string
  adult: number
  child: number
}
export const SearchArea = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    area: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    adult: yup.number(),
    child: yup.number(),
  })
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })
  return (
    <section className="w-1/2 mr-4">
      <div className="bg-sky-200 rounded p-4 sticky top-[88px]">
        <fieldset className="mb-2">
          <Input
            name="area"
            label="旅遊地點"
            register={register('area')}
            value="台北"
          />
        </fieldset>
        <fieldset className="mb-2">
          <DateRangePicker
            label="住房日期"
            startDate={getValues('startDate')}
            endDate={getValues('endDate')}
            onChange={(update) => {
              setValue('startDate', update[0])
              setValue('endDate', update[1])
              setDateRange(update)
            }}
          />
        </fieldset>
        <fieldset className="mb-2">
          <Input label="房間" name="room" type="select">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
          </Input>
        </fieldset>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <fieldset>
            <Input
              type="select"
              name="adult"
              label="大人"
              register={register('adult')}
            >
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
            </Input>
          </fieldset>
          <fieldset>
            <Input
              type="select"
              name="child"
              label="小孩"
              register={register('child')}
            >
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
            </Input>
          </fieldset>
        </div>
        <Button variant="primary" type="submit" fullWidth={true}>
          搜尋
        </Button>
      </div>
    </section>
  )
}
