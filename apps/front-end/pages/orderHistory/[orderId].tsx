import Image from 'next/image'

import { AspectRatio, Typography } from '@/components'
import { utility } from '@findhotel/common'
import {
  MapPinIcon,
  PhoneIcon,
  ExclamationCircleIcon,
  CheckIcon,
} from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import { AxiosInstance } from 'axios'
import { NextPage, NextPageContext } from 'next'
import { Order } from '@/types/orders'
const { H2, H3, H4, Text1 } = Typography

type Props = {
  model: Order
}

const OrderHistoryDetail: NextPage<Props> = ({ model }) => {
  return (
    <div className="lg:py-8">
      <div className="container max-w-screen-xl mx-auto py-4  divide-y divide-solid divide-slate-300 lg:bg-white lg:rounded-xl lg:p-6 lg:shadow">
        <section className="px-2 mb-4">
          <Text1 className="text-end">訂房編號：{model.id}</Text1>
          <H2>{model.hotel.name}</H2>
          <div className="mb-4">
            <p className="text-gray-700 mb-2 flex items-center">
              <MapPinIcon
                className="h-5 w-5 text-sky-400 mr-2"
                aria-hidden="true"
              />
              {model.hotel.address}
            </p>
            <p className="text-gray-700 mb-2 flex items-center">
              <PhoneIcon
                className="h-5 w-5 text-sky-400 mr-2"
                aria-hidden="true"
              />
              {model.hotel.phone}
            </p>
          </div>
          <Text1 className="text-gray-700 mb-2 flex items-center">
            入住時間：{dayjs(model.startDate).format('YYYY/MM/DD(dd)')}{' '}
            {model.hotel.checkInTime} 後
          </Text1>
          <Text1 className="text-gray-700 mb-2 flex items-center">
            退房時間：{dayjs(model.endDate).format('YYYY/MM/DD(dd)')}{' '}
            {model.hotel.checkOutTime} 前
          </Text1>
          <Text1>入住 {model.night} 晚</Text1>
        </section>

        <section className="bg-sky-100 p-4 flex justify-between">
          <span>總價（入住時支付）：</span>
          <span className="text-lg font-bold text-red-500">
            ${utility.numberToCurrency(model.price)}
          </span>
        </section>

        <section className="p-2 pt-4">
          <H4>給店家的留言</H4>
          <p className="text-gray-700 mb-2 flex items-center">
            {model.consumer.note}
          </p>
        </section>

        <section className="pt-4 px-2 mb-4">
          <H3>預定房型</H3>
          <li className="min-h-[130px] flex justify-between xl:w-1/2">
            <div className="w-1/3">
              <AspectRatio ratio={1}>
                <Image
                  src={model.hotel.pictures[0]}
                  alt={model.hotel.name}
                  width={960}
                  height={720}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
            <div className="w-2/3 px-6">
              <H4 className="text-xl font-medium mb-2">{model.room.name}</H4>
              <Text1 className="mb-2">
                大人 {model.adult} 人 / 小孩 {model.child} 人
              </Text1>
              {model.room.hasBreakfast ? (
                <p className="text-red-500 mb-2">含早餐</p>
              ) : (
                <Text1 className="mb-2 line-through">不含早餐</Text1>
              )}
              <p className="text-green-500 text-sm flex items-center">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-green-500 mr-1"
                  aria-hidden="true"
                />
                免費取消
              </p>
            </div>
          </li>
        </section>
        <section className="pt-4 px-2">
          <H3>設施</H3>
          <ul className="list-disc list-inside grid grid-cols-2 items-center mb-4">
            {model.hotel.facilities.map((f) => (
              <li key={f.type} className="p-1 mr-2 flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-1"
                  aria-hidden="true"
                />
                {f.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

OrderHistoryDetail.getInitialProps = async (
  context: NextPageContext & { client: AxiosInstance }
) => {
  const { orderId } = context.query
  const { data } = await context.client.get(`/orders/${orderId}`)

  return { model: data, pageTitle: '訂房明細' }
}

export default OrderHistoryDetail
