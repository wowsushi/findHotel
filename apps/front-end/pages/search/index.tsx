import { HotelCard } from './HotelCard'
import { SearchArea } from './SearchArea'
type Facility = {
  type: number
  name: string
}
export type HotelProps = {
  id: string
  phone: string
  address: string
  name: string
  facilitices: Facility[]
  pictures: string[]
  checkInTime: string
  checkOutTime: string
  price: number
}

const hotel = {
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
    'https://image-store.asiayo.com/bnb/38649/960xauto/desc_8MU7ew70K6OCFm.jpg',
    'https://image-store.asiayo.com/bnb/38649/370xauto/desc_aiSWIiLX3cBIPj.jpg',
  ],
  checkInTime: '14:00',
  checkOutTime: '11:00',
  price: 2230,
}

const Search = () => {
  return (
    <div className="container max-w-screen-lg mx-auto  flex flex-col lg:flex-row">
      <SearchArea />
      <div className="py-4 px-2">
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
        <HotelCard hotel={hotel} />
      </div>
    </div>
  )
}
export async function getStaticProps(context) {
  return {
    props: {
      pageTitle: '現在就預訂飯店！',
    },
  }
}
export default Search
