import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Input, Typography } from '@/components'
import { utility } from '@findhotel/common'
import { useRouter } from 'next/router'
import { useFetch } from '@/hooks'
import { EstimatedOrder } from '@/types/orders'
import { HOTEL_QUERY } from '@/types/hotels'
const { H3 } = Typography

const Checkout = () => {
  const router = useRouter()
  const { doRequest } = useFetch()
  const [order, setOrder] = useState<EstimatedOrder>()
  useEffect(() => {
    const hotelQuery = sessionStorage.getItem(HOTEL_QUERY)
    if (hotelQuery) {
      handleGetEstimatedOrder(JSON.parse(hotelQuery))
    }
  }, [])

  const handleBookRoom = () => {
    router.push('/complete')
  }

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
    <div className="container max-w-screen-xl mx-auto flex flex-col justify-center lg:flex-row lg:p-8 lg:gap-4 lg:items-start">
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
          <Input label="姓氏" name="lastName" />
          <Input label="名字" name="firstName" />
          <Input label="手機" name="phone" />
          <Input label="電子郵件" name="email" />
          <Input label="特殊需求" name="note" />
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            variant="primary"
            className="w-full lg:w-40"
            onClick={handleBookRoom}
          >
            完成訂房
          </Button>
        </div>
      </section>
    </div>
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
