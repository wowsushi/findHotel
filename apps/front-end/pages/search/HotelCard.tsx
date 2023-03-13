import { PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
const card = {
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
export const HotelCard = () => {
  return (
    <section className="bg-white flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-sky-200 transition mb-4 p-4 cursor-pointer">
      <div className="md:w-1/3">
        <Image
          src={card.pictures[0]}
          alt={card.name}
          width={960}
          height={720}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="md:w-2/3 p-4 pt-0">
        <h2 className="font-bold text-xl mb-2 text-sky-700">{card.name}</h2>
        <p className="text-gray-700 text-base mb-2">{card.address}</p>
        <p className="text-gray-700 text-base mb-2 flex items-center">
          <PhoneIcon
            className="h-5 w-5 text-sky-500 group-hover:text-sky-400 mr-2"
            aria-hidden="true"
          />
          {card.phone}
        </p>
        <p className="text-gray-700 text-base mb-2">
          入住時間: {card.checkInTime} | 退房時間: {card.checkOutTime}
        </p>
        <div className="mb-2">
          <h3 className="font-bold text-lg mb-1">特色</h3>
          <ul className="list-disc list-inside flex">
            {card.facilitices.map((f) => (
              <li key={f.type} className="p-1">
                {f.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
