import { CheckIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { FC } from 'react'
import { utility } from '@findhotel/common'
import type { OFindHotels } from '@/types/hotels'

import Link from 'next/link'
import { AspectRatio } from './AspectRatio'
type Props = {
  hotel: OFindHotels
}

export const HotelCard: FC<Props> = ({ hotel }) => {
  return (
    <Link
      href={`/hotels/${hotel.id}`}
      className="bg-white flex rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-sky-200 transition mb-4 md:p-4 p-2 cursor-pointer text-sm md:text-base"
    >
      <div className="w-1/3 min-w-[150px]">
        <AspectRatio ratio={225 / 288}>
          <Image
            src={hotel.pictures[0]}
            alt={hotel.name}
            width={960}
            height={720}
            className="h-full w-full object-cover rounded"
          />
        </AspectRatio>
      </div>
      <div className="w-2/3 pl-4 md:px-4 pt-0 flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="font-bold text-xl mb-2 text-sky-700">{hotel.name}</h2>
          <p className="text-gray-700 mb-2 flex items-center">
            <MapPinIcon
              className="h-5 w-5 text-sky-400 mr-2"
              aria-hidden="true"
            />
            {hotel.address}
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <PhoneIcon
              className="h-5 w-5 text-sky-400 mr-2"
              aria-hidden="true"
            />
            {hotel.phone}
          </p>
          <p className="text-gray-700 hidden mb-4 md:block">
            入住時間：{hotel.checkInTime} ｜ 退房時間：{hotel.checkOutTime}
          </p>
          <div className="mb-2 hidden md:block">
            <h3 className="font-bold text-lg">特色</h3>
            <ul className="list-disc list-inside flex flex-wrap items-center">
              {hotel.facilities.map((f) => (
                <li key={f.type} className="p-1 mr-2 flex items-center">
                  <CheckIcon
                    className="h-5 w-5 text-green-500 mr-1"
                    aria-hidden="true"
                  />
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-end md:justify-center items-end">
          <span className="text-sm text-end md:order-2 mr-2 md:mr-0">
            最優惠價
          </span>
          <h3 className="font-bold text-2xl text-red-600 md:order-1">
            ${utility.numberToCurrency(hotel.bestPrice)}
          </h3>
        </div>
      </div>
    </Link>
  )
}
