import { useState } from 'react'
import { Button, Input, DateRangePicker, Modal } from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { HOTEL_QUERY, HotelQuery } from '../api/types/hotels'

const Index = () => {
  const router = useRouter()
  const [, setDateRange] = useState([null, null])
  const schema: yup.ObjectSchema<HotelQuery> = yup.object().shape({
    area: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    adult: yup.number(),
    child: yup.number(),
    room: yup.number(),
  })

  const { register, handleSubmit, setValue, getValues } = useForm<HotelQuery>({
    resolver: yupResolver(schema),
  })
  const handleSearchHotels = handleSubmit((data) => {
    sessionStorage.setItem(HOTEL_QUERY, JSON.stringify(data))
    router.push('/search')
  })
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="before:bg-cover before:bg-center h-full py-8 lg:py-32 before:fixed before:inset-0 bg-no-repeat before:blur-[2px] before:brightness-75 before:bg-[url('/bg.jpg')]">
      <div className="container mx-auto max-w-lg px-4 relative module-inside">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 lg:mb-10">
          即刻預訂非凡旅程!
        </h1>
        <form className="w-full mx-auto py-4" onSubmit={handleSearchHotels}>
          <div className="flex flex-wrap flex-col -mx-3 mb-6 md:flex-row">
            <fieldset className="md:w-1/3 px-3 mb-6 md:mb-0">
              <Input
                name="area"
                label="旅遊地點"
                value="台北"
                readOnly
                invertTextColor
              />
            </fieldset>
            <fieldset className="md:w-1/2 px-3 mb-6">
              <DateRangePicker
                startDate={
                  getValues('startDate') && new Date(getValues('startDate'))
                }
                endDate={getValues('endDate') && new Date(getValues('endDate'))}
                label="入住日期"
                invertTextColor
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
                name="room"
                label="房間"
                register={register('room')}
                invertTextColor
              >
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
              </Input>
            </fieldset>
            <div className="grid grid-cols-2 gap-2 mb-2 md:flex flex-1 md:gap-6">
              <fieldset className="md:w-1/2 pl-3 mb-6 md:mb-0">
                <Input
                  type="select"
                  name="adult"
                  label="大人"
                  register={register('adult')}
                  invertTextColor
                >
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <option key={i}>{i + 1}</option>
                    ))}
                </Input>
              </fieldset>
              <fieldset className="md:w-1/2 pr-3 mb-6 md:mb-0">
                <Input
                  type="select"
                  name="child"
                  label="小孩"
                  register={register('child')}
                  invertTextColor
                >
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <option key={i}>{i}</option>
                    ))}
                </Input>
              </fieldset>
            </div>
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
