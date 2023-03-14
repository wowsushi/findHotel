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
  const [isShowSearchArea, setIsShowSearchArea] = useState(false)
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

  const handleToggleSearchArea = () => {
    setIsShowSearchArea(!isShowSearchArea)
  }

  return (
    <section className="w-full lg:w-1/2 py-0 lg:py-4 mr-4 px-0 lg:px-2 sticky top-[72px] lg:top-[88px]">
      <div className="lg:hidden flex justify-between items-center p-2 bg-sky-200">
        <p>2023/01/12 ~ 2023/01/13</p>
        <Button variant="primary" onClick={handleToggleSearchArea}>
          選擇
        </Button>
      </div>

      <div
        className={`bg-sky-200 rounded p-4 sticky top-[88px] lg:block ${
          isShowSearchArea ? 'block' : 'hidden'
        }`}
      >
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
