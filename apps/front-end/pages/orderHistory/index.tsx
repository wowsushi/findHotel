import { Typography } from '@/components'
import { utility } from '@findhotel/common'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'
import { HotelProps } from '../search'
const { H2, H3, Text1 } = Typography
const fakeData = [
  {
    id: '58784',
    hotel: {
      id: '1',
      phone: '0286535353',
      address: '台中南屯区向上路三段221號',
      name: '王子大飯店',
    },
    checkInDate: Date.now(),
    checkOutDate: Date.now() + 60 * 60 * 24 * 1000,
    night: 1,
    amount: 2330,
  },
  {
    id: '58884',
    hotel: {
      id: '1',
      phone: '0286535353',
      address: '台中南屯区向上路三段221號',
      name: '王子大飯店',
    },
    checkInDate: Date.now(),
    checkOutDate: Date.now() + 60 * 60 * 24 * 1000,
    night: 1,
    amount: 2330,
  },
  {
    id: '541584',
    hotel: {
      id: '1',
      phone: '0286535353',
      address: '台中南屯区向上路三段221號',
      name: '王子大飯店',
    },
    checkInDate: Date.now(),
    checkOutDate: Date.now() + 60 * 60 * 24 * 1000,
    night: 1,
    amount: 2330,
  },
  {
    id: '9589',
    hotel: {
      id: '1',
      phone: '0286535353',
      address: '台中南屯区向上路三段221號',
      name: '王子大飯店',
    },
    checkInDate: Date.now(),
    checkOutDate: Date.now() + 60 * 60 * 24 * 1000,
    night: 1,
    amount: 2330,
  },
  {
    id: '48484',
    hotel: {
      id: '1',
      phone: '0286535353',
      address: '台中南屯区向上路三段221號',
      name: '王子大飯店',
    },
    checkInDate: Date.now(),
    checkOutDate: Date.now() + 60 * 60 * 24 * 1000,
    night: 1,
    amount: 2330,
  },
]

type Props = {
  listData: {
    id: number
    hotel: Pick<HotelProps, 'id' | 'phone' | 'address' | 'name'>
    checkInDate: number
    checkOutDate: number
    night: number
    amount: number
  }[]
}

const OrderHistory: FC<Props> = ({ listData }) => {
  return (
    <div className="container max-w-screen-xl mx-auto py-4 px-2">
      <H2>查詢訂單</H2>
      <ul>
        {listData.map((item) => (
          <Link href={`/orderHistory/${item.id}`} key={item.id}>
            <li className="rounded-lg border border-slate-400 p-4 mb-4 bg-white">
              <div className="flex justify-between">
                <H3>{item.hotel.name}</H3>
                <Text1
                  color="price"
                  colorLevel={500}
                  className="text-end font-bold lg:text-xl"
                >
                  ${utility.numberToCurrency(item.amount)}
                </Text1>
              </div>
              <Text1>
                {dayjs(item.checkInDate).format('YYYY/MM/DD(dd)')} ~{' '}
                {dayjs(item.checkOutDate).format('YYYY/MM/DD(dd)')}
              </Text1>
              <Text1>入住{item.night}晚</Text1>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      listData: fakeData,
      pageTitle: '訂單查詢',
    },
  }
}

export default OrderHistory
