import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Input } from '@/components'
import './index.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type FormValues = {
  area: string
  startDate: string
  endDate: string
  people: number
}
const Index = () => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState([null, null])
  const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    area: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    people: yup.number(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    router.push('/search')
  })

  return (
    <div
      className="bg-cover bg-center h-full py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521747116042-5a810fda9664')",
      }}
    >
      <div className="container mx-auto max-w-lg px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-10">
          即刻預定非凡旅程
        </h1>
        <form className="w-full mx-auto" onSubmit={onSubmit}>
          <div className="flex flex-wrap flex-col -mx-3 mb-6 md:flex-row">
            <div className="md:w-1/3 px-3 mb-6 md:mb-0">
              <Input
                name="area"
                label="旅遊地點"
                register={register('area')}
                value="台北"
              />
            </div>
            <div className="md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-start-date"
              >
                入住日期
              </label>
              <DatePicker
                className="mt-2 mb-1 relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                selectsRange={true}
                startDate={getValues('startDate')}
                endDate={getValues('endDate')}
                onChange={(update) => {
                  setValue('startDate', update[0])
                  setValue('endDate', update[1])
                  setDateRange(update)
                }}
              />
            </div>
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-guests"
              >
                入住人數
              </label>
              <div className="relative">
                <select
                  className="inline-block mt-2 mb-1 relative w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  id="grid-guests"
                  {...register('people')}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
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
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <Button variant="primary" type="submit">
              搜尋
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
