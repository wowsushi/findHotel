import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { FC, useEffect, useState } from 'react'
import { Button, DateRangePicker, Input } from '@/components'
import type { HotelQuery } from '../api/types/hotels'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

type Props = {
  searchQuery: HotelQuery
  onSearch: (hotelQuery: HotelQuery) => void
}

export const SearchArea: FC<Props> = ({ searchQuery, onSearch }) => {
  const router = useRouter()
  const [, setDateRange] = useState([null, null])
  const [isShowSearchArea, setIsShowSearchArea] = useState(false)
  const schema: yup.ObjectSchema<HotelQuery> = yup.object().shape({
    area: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    adult: yup.number(),
    child: yup.number(),
    room: yup.number(),
  })

  const { register, handleSubmit, setValue } = useForm<HotelQuery>({
    resolver: yupResolver(schema),
    defaultValues: searchQuery,
  })

  useEffect(() => {
    if (!searchQuery) return

    Object.entries(searchQuery).forEach(([key, value]) => {
      if (key) {
        setValue(key as keyof HotelQuery, value)
      }
    })
  }, [searchQuery, setValue])

  const handleToggleSearchArea = () => {
    setIsShowSearchArea(!isShowSearchArea)
  }

  const renderDateRange = (
    startDate: HotelQuery['startDate'],
    endDate: HotelQuery['endDate']
  ) => {
    if (!startDate || !endDate) return '請選擇'

    return `${dayjs(startDate).format('YYYY/MM/DD(dd)')} ~ ${dayjs(
      endDate
    ).format('YYYY/MM/DD(dd)')}`
  }

  const handleSearchHotels = handleSubmit((data) => {
    setIsShowSearchArea(false)
    !!onSearch && onSearch(data)
  })

  if (!searchQuery) return null

  return (
    <section className="w-full lg:max-w-xs py-0 lg:py-4 mr-4 px-0 lg:px-2 fixed lg:sticky top-[44px] lg:top-[88px] z-10">
      <div className="lg:hidden flex justify-between items-center p-2 bg-sky-200">
        <p>{renderDateRange(searchQuery?.startDate, searchQuery?.endDate)}</p>
        <Button variant="primary" onClick={handleToggleSearchArea}>
          選擇
        </Button>
      </div>

      <form
        className={`bg-sky-200 rounded p-4 sticky top-[88px] lg:block ${
          isShowSearchArea ? 'block' : 'hidden'
        }`}
        id="search-area"
        onSubmit={handleSearchHotels}
      >
        {!router.pathname.includes('hotel') && (
          <fieldset className="mb-2">
            <Input
              name="area"
              label="旅遊地點"
              register={register('area')}
              value={searchQuery?.area || '台北'}
              readOnly
              inputMode="none"
            />
          </fieldset>
        )}
        <fieldset className="mb-2">
          <DateRangePicker
            label="住房日期"
            startDate={searchQuery.startDate && new Date(searchQuery.startDate)}
            endDate={searchQuery.endDate && new Date(searchQuery.endDate)}
            onChange={(update) => {
              setValue('startDate', update[0])
              setValue('endDate', update[1])
              setDateRange(update)
            }}
          />
        </fieldset>
        <fieldset className="mb-2">
          <Input
            label="房間"
            name="room"
            type="select"
            register={register('room')}
          >
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
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <option key={i}>{i}</option>
                ))}
            </Input>
          </fieldset>
        </div>
        <Button variant="primary" type="submit" fullWidth={true}>
          搜尋
        </Button>
      </form>
    </section>
  )
}
