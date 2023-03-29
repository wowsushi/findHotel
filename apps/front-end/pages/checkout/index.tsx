import { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import * as yup from 'yup'
import { Button, Input, Modal, Typography } from '@/components'
import { utility } from '@findhotel/common'
import { useRouter } from 'next/router'
import { useFetch } from '@/hooks'
import { EstimatedOrder } from '@/types/orders'
import { HOTEL_QUERY } from '@/types/hotels'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SearchContext } from '../_app'
const { H3 } = Typography

type FormValues = {
  lastName: string
  firstName: string
  phone: string
  email: string
  note?: string
}
const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  lastName: yup.string().required('必填'),
  firstName: yup.string().required('必填'),
  phone: yup.string().required('必填'),
  email: yup.string().required('必填').email('請輸入有效email'),
  note: yup.string(),
})

const Checkout = () => {
  const router = useRouter()
  const { doRequest } = useFetch()
  const { searchState } = useContext(SearchContext)
  const { searchQuery } = searchState
  const [order, setOrder] = useState<EstimatedOrder>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (!searchQuery) return
    const { startDate, endDate, adult, room, roomId } = searchQuery

    if (!!startDate && !!endDate && !!adult && !!room && !!roomId) {
      handleGetEstimatedOrder(searchQuery)
    } else {
      Modal.alert('查無訂單資訊', () => router.push('/'))
    }
  }, [searchQuery])

  const handleBookRoom = handleSubmit(async (data) => {
    console.log(data)
    const res = await doRequest({
      url: '/orders',
      method: 'post',
      data: {
        ...searchQuery,
        consumer: data,
      },
    })

    if (res.success) {
      sessionStorage.removeItem(HOTEL_QUERY)
      router.replace(`/complete?orderId=${res.id}`)
      return
    }

    Modal.alert('系統錯誤！')
  })

  const handleGetEstimatedOrder = async (query) => {
    const data = await doRequest({
      url: '/orders/getEstimated',
      params: query,
    })
    setOrder(data)
  }

  if (!order) return null
  const people = order.adult + order.child

  return (
    <form
      className="container max-w-screen-xl mx-auto flex flex-col justify-center lg:flex-row lg:p-8 lg:gap-4 lg:items-start"
      onSubmit={handleBookRoom}
    >
      <section className="lg:border border-slate-200 rounded-lg lg:bg-sky-100 lg:w-[300px]">
        <div className="bg-white px-4 py-2 mb-1 lg:rounded-t-lg">
          <H3>{order.hotelName}</H3>
          <div className="text-sm text-slate-500">
            <p className="mb-2">
              {order.room} 房，{order.roomName}
            </p>
            <p className="mb-2">
              <span>{people} 人</span>
              <span>，</span>
              <span>{order.adult} 大人</span>
              <span>，</span>
              <span>{order.child} 小孩</span>
              <span>，</span>
              <span>{order.hasBreakfast ? '含' : '不含'}早餐</span>
            </p>
            <p className="mb-2">
              <span>{order.night} 晚，</span>
              <span>{dayjs(order.startDate).format('YYYY/MM/DD(dd)')}</span>
              <span> ~ </span>
              <span>{dayjs(order.endDate).format('YYYY/MM/DD(dd)')}</span>
            </p>
          </div>
        </div>

        <div className="bg-sky-100 p-4 mb-1 flex justify-between">
          <span>總價（入住時支付）：</span>
          <span className="text-lg font-bold text-red-500">
            ${utility.numberToCurrency(order.price)}
          </span>
        </div>
      </section>

      <section className="lg:w-1/2 p-4 mb-4 bg-white lg:border border-slate-200 rounded-lg flex-grow">
        <H3>訂房資訊</H3>
        <div className="lg:w-1/2">
          <Input
            label="姓氏"
            name="lastName"
            error={errors.lastName}
            register={register('lastName')}
          />
          <Input
            label="名字"
            name="firstName"
            error={errors.firstName}
            register={register('firstName')}
          />
          <Input
            label="手機"
            name="phone"
            error={errors.phone}
            register={register('phone')}
          />
          <Input
            label="電子郵件"
            name="email"
            error={errors.email}
            register={register('email')}
          />
          <Input label="特殊需求" name="note" register={register('note')} />
        </div>
        <div className="mt-8 flex justify-end">
          <Button variant="primary" className="w-full lg:w-40" type="submit">
            完成訂房
          </Button>
        </div>
      </section>
    </form>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      pageTitle: '預訂房間',
    },
  }
}

export default Checkout
