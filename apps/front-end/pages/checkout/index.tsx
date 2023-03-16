import { FC } from 'react'
import { HotelProps } from '../search'
import dayjs from 'dayjs'
import { Button, Input, Typography } from '@/components'
import { utility } from '@findhotel/common'
import { useRouter } from 'next/router'
const { H3 } = Typography
const fakeHotel = {
  id: '1',
  phone: '0286535353',
  address: '台中南屯区向上路三段221號',
  price: 2300,
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
  rooms: [
    {
      id: '1',
      name: '豪華雙人房',
      people: 2,
      price: 3300,
      hasBreakfast: true,
    },
    {
      id: '2',
      name: '豪華單人房',
      people: 1,
      price: 2300,
      hasBreakfast: false,
    },
  ],
}

const querysData = {
  roomAmount: 2,
  people: 2,
  startDate: Date.now(),
  endDate: Date.now() + 60 * 60 * 24 * 1000,
  roomId: 1,
}

const fakeRoom = {
  id: '2',
  name: '豪華單人房',
  people: 1,
  price: 2300,
  hasBreakfast: false,
}

type Props = {
  hotel: HotelProps
}
const Checkout: FC<Props> = ({ hotel = fakeHotel }) => {
  const router = useRouter()
  const { startDate, endDate, roomAmount, people } = querysData
  const night = dayjs(endDate).diff(dayjs(startDate), 'd')
  const room = fakeRoom

  const handleBookRoom = () => {
    router.push('/complete')
  }
  return (
    <div className="container max-w-screen-xl mx-auto flex flex-col justify-center lg:flex-row lg:p-8 lg:gap-4 lg:items-start">
      <section className="lg:border border-slate-200 rounded-lg lg:bg-sky-100 lg:w-[300px]">
        <div className="bg-white px-4 py-2 mb-1 lg:rounded-t-lg">
          <H3>{hotel.name}</H3>
          <div className="text-sm text-slate-500">
            <p className="mb-2">
              {roomAmount} 房，{room.name}
            </p>
            <p className="mb-2">
              <span>{people} 人</span>
              <span>，</span>
              <span>含早餐</span>
            </p>
            <p className="mb-2">
              <span>{night} 晚，</span>
              <span>{dayjs(startDate).format('YYYY/MM/DD(dd)')}</span>
              <span> ~ </span>
              <span>{dayjs(endDate).format('YYYY/MM/DD(dd)')}</span>
            </p>
          </div>
        </div>

        <div className="bg-sky-100 p-4 mb-1 flex justify-between">
          <span>總價（入住時支付）：</span>
          <span className="text-lg font-bold text-red-500">
            ${utility.numberToCurrency(hotel.price)}
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
