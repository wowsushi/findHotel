import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Input } from '@/components'
import './index.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { HOTEL_QUERY, HotelQuery } from '../api/types/hotels'

const Index = () => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState([null, null])
  const schema: yup.ObjectSchema<HotelQuery> = yup.object().shape({
    area: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    adult: yup.number(),
    child: yup.number(),
    room: yup.number(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<HotelQuery>({ resolver: yupResolver(schema) })
  const handleSearchHotels = handleSubmit((data) => {
    sessionStorage.setItem(HOTEL_QUERY, JSON.stringify(data))
    router.push('/search')
  })

  return (
    <div
      className="bg-cover bg-center h-full py-8 lg:py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521747116042-5a810fda9664')",
      }}
    >
      <div className="container mx-auto max-w-lg px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 lg:mb-10">
          即刻預定非凡旅程
        </h1>
        <form className="w-full mx-auto" onSubmit={handleSearchHotels}>
          <div className="flex flex-wrap flex-col -mx-3 mb-6 md:flex-row">
            <fieldset className="md:w-1/3 px-3 mb-6 md:mb-0">
              <Input
                name="area"
                label="旅遊地點"
                register={register('area')}
                value="台北"
              />
            </fieldset>
            <fieldset className="md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
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
            </fieldset>
            <fieldset className="md:w-1/3 px-3 mb-6 md:mb-0">
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
            <fieldset className="md:w-1/3 px-3 mb-6 md:mb-0">
              <Input
                type="select"
                name="child"
                label="小孩"
                register={register('child')}
              >
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <option key={i}>{i}</option>
                  ))}
              </Input>
            </fieldset>
            <fieldset className="md:w-1/3 px-3 mb-6 md:mb-0">
              <Input
                type="select"
                name="room"
                label="房間"
                register={register('room')}
              >
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
              </Input>
            </fieldset>
          </div>
          <div className="flex items-center justify-center mt-0 lg:mt-10">
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
