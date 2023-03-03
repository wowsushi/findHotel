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
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/185637104.jpg?k=799a29d3fc71a0f70c742ad13e1a203f691ed917008b570c967a5c934f6aace5&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/413501734.jpg?k=5555302d3da3cd08af76c40349293b99ad1e901e10c0688bf60ca0a4d627123b&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/202108270.jpg?k=41d3db00b79e0e72046c691048b6cdbccd8b9e9607c3f851df64edeeff1c7d70&o=&hp=1',
  ],
  checkInTime: '14:00',
  checkOutTime: '11:00',
}
export const HotelCard = () => {
  const item = card
  return (
    <section className="bg-white flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-sky-200 transition my-8 py-8 px-4">
      <div className="md:w-1/3">
        <Image
          // src={card.pictures[0]}
          src={'/'}
          alt={card.name}
          width={50}
          height={50}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="md:w-2/3 p-4">
        <h2 className="font-bold text-xl mb-2">{card.name}</h2>
        <p className="text-gray-700 text-base mb-2">{card.address}</p>
        <p className="text-gray-700 text-base mb-2">{card.phone}</p>
        <p className="text-gray-700 text-base mb-2">
          入住時間: {card.checkInTime} | 退房時間: {card.checkOutTime}
        </p>
        <div className="mb-2">
          <h3 className="font-bold text-lg mb-1">特色</h3>
          <ul className="list-disc list-inside">
            {card.facilitices.map((f) => (
              <li key={f.type}>{f.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
