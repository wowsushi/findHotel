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
import { FC } from 'react'
import { HotelProps } from '../search'
import { Room } from '../hotels/[hotelId]'
const { H2, H3, H4, Text1 } = Typography

const fakeData = {
  hotel: {
    id: '1',
    phone: '0286535353',
    address: '台中南屯区向上路三段221號',
    name: '王子大飯店',
    facilitices: [
      {
        type: 1,
        name: '早餐',
      },
      {
        type: 2,
        name: '健身房',
      },
      {
        type: 3,
        name: '泳池',
      },
      {
        type: 4,
        name: '兒童遊戲室',
      },
    ],
    pictures: [
      'https://image-store.asiayo.com/bnb/38649/960xauto/desc_8MU7ew70K6OCFm.jpg',
      'https://image-store.asiayo.com/bnb/25993/960xauto/desc_5WyvN3f4rVbMiz.jpg',
      'https://image-store.asiayo.com/bnb/38649/370xauto/desc_aiSWIiLX3cBIPj.jpg',
    ],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    room: {
      id: '1',
      name: '豪華雙人房',
      people: 2,
      price: 3300,
      hasBreakfast: true,
    },
  },
  id: '8464546',
  startDate: Date.now(),
  endDate: Date.now() + 60 * 60 * 24 * 1000,
  night: 1,
  amount: 13565,
  note: '備註區',
  people: {
    adult: 2,
    child: 0,
  },
}

type Props = {
  model: {
    hotel: Omit<HotelProps, 'rooms'> & { room: Room }
    id: number
    startDate: number
    endDate: number
    night: number
    amount: number
    note: string
    people: {
      adult: number
      child: number
    }
  }
}
const OrderHistoryDetail: FC<Props> = ({ model }) => {
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
            ${utility.numberToCurrency(model.amount)}
          </span>
        </section>

        <section className="p-2 pt-4">
          <H4>給店家的留言</H4>
          <p className="text-gray-700 mb-2 flex items-center">{model.note}</p>
        </section>

        <section className="pt-4 px-2 mb-4">
          <H3>預定房型</H3>
          <li
            className="min-h-[130px] flex justify-between xl:w-1/2"
            key={model.hotel.room.id}
          >
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
              <H4 className="text-xl font-medium mb-2">
                {model.hotel.room.name}
              </H4>
              <Text1 className="mb-2">
                大人 {model.people.adult} 人 / 小孩 {model.people.child} 人
              </Text1>
              {model.hotel.room.hasBreakfast ? (
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
            {model.hotel.facilitices.map((f) => (
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
export async function getServerSideProps(context) {
  return {
    props: {
      model: fakeData,
      pageTitle: '訂房明細',
    },
  }
}

export default OrderHistoryDetail
