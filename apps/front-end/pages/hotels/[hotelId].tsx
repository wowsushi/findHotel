import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  AspectRatio,
  Button,
  Empty,
  SearchArea,
  Slider,
  Typography,
  Loading,
} from '@/components'
import {
  MapPinIcon,
  PhoneIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid'
import { utility } from '@findhotel/common'
import { useRouter } from 'next/router'
import { HotelQuery, HOTEL_QUERY, OFindHotels } from '@/types/hotels'
import { useFetch } from '@/hooks'
import { GlobalContext } from '../_app'
import { OFindRooms } from '@/types/rooms'
import { NextPage, NextPageContext } from 'next'
import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
const { H3, H4, Text1 } = Typography

type Props = {
  hotel: OFindHotels
  pageTitle: string
}

const HotelDetail: NextPage<Props> = ({ hotel, ...rest }) => {
  const router = useRouter()
  const { doRequest, loading } = useFetch()
  const [rooms, setRooms] = useState<OFindRooms[]>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const { searchQuery } = globalState

  useEffect(() => {
    const handleSearchRoom = async (query: HotelQuery) => {
      if (!query) return
      const hotelId = router.query.hotelId
      const rooms = await doRequest({
        url: '/rooms/findRooms',
        method: 'get',
        params: {
          ...query,
          hotelId,
        },
      })

      setRooms(rooms)
    }
    if (searchQuery) {
      handleSearchRoom(searchQuery)
    }
  }, [searchQuery, router, doRequest])

  const handleBookRoom = async (roomId: number) => {
    const startDate = dayjs(searchQuery.startDate).toISOString()
    const endDate = dayjs(searchQuery.endDate).toISOString()
    const query = {
      ...searchQuery,
      roomId,
      hotelId: +router.query.hotelId,
      startDate,
      endDate,
    }
    sessionStorage.setItem(HOTEL_QUERY, JSON.stringify(query))
    await router.push('/checkout')
    setGlobalState({ searchQuery: query })
  }

  return (
    <div className="container max-w-screen-xl mx-auto flex flex-col lg:flex-row pt-[54px] lg:pt-0">
      <SearchArea
        searchQuery={searchQuery}
        onSearch={(query) => setGlobalState({ searchQuery: query })}
      />
      <div className="overflow-hidden">
        <h1 className="text-3xl font-bold m-4">{hotel.name}</h1>
        <Slider className="lg:hidden">
          {hotel.pictures?.map((p) => (
            <AspectRatio ratio={1 / 2} key={p}>
              <Image
                src={p}
                alt={hotel.name}
                width={960}
                height={720}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          ))}
        </Slider>
        <div className="lg:grid grid-cols-4 grid-rows-2 gap-2 hidden">
          <div className="col-span-2 row-span-2">
            <AspectRatio ratio={354 / 346}>
              <Image
                src={hotel.pictures[0]}
                alt={hotel.name}
                width={960}
                height={720}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
          <div className="col-start-3 col-span-2">
            <AspectRatio ratio={1 / 2}>
              <Image
                src={hotel.pictures[1]}
                alt={hotel.name}
                width={960}
                height={720}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
          <div className="col-star-3 col-span-2">
            <AspectRatio ratio={1 / 2}>
              <Image
                src={hotel.pictures[2]}
                alt={hotel.name}
                width={960}
                height={720}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        <div className="px-4 pb-4 my-2 divide-y divide-solid divide-slate-300 bg-white">
          <section className="pt-4">
            <H3>簡介</H3>
            <div className="mb-4">
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
              <div className="mb-2">
                <p>入住時間：{hotel.checkInTime}</p>
              </div>
              <div className="mb-2">
                <p>退房時間：{hotel.checkOutTime}</p>
              </div>
            </div>
          </section>

          <section className="pt-4">
            <H3>房型</H3>
            <Loading loading={loading}>
              {rooms.length > 0 ? (
                <ul className="mb-4 flex flex-col xl:flex-row gap-4">
                  {rooms.map((room) => (
                    <li
                      className="rounded-lg border border-slate-400 min-h-[130px] flex justify-between shadow-md xl:w-1/2"
                      key={room.id}
                    >
                      <div className="w-2/3 border-r border-r-slate-400 p-6">
                        <H4 className="text-xl font-medium mb-2">
                          {room.name}
                        </H4>
                        {room.hasBreakfast ? (
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
                      <div className="w-1/3 flex flex-col p-2 justify-center items-center">
                        <span className="text-xs">每晚</span>
                        <span className="text-red-500 text-2xl font-bold mb-2">
                          ${utility.numberToCurrency(room.discountPrice)}
                        </span>
                        <Button
                          variant="primary"
                          fullWidth={true}
                          className="md:w-1/2"
                          onClick={() => handleBookRoom(room.id)}
                        >
                          預定
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty>
                  目前沒有可預定的房間，選擇其他日期或人數來取得房型與價格
                </Empty>
              )}
            </Loading>
          </section>

          <section className="pt-4">
            <H3>設施</H3>
            <ul className="list-disc list-inside grid grid-cols-2 items-center mb-4">
              {hotel.facilities?.map((f) => (
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

          <section className="text-sm pt-4">
            <H3>退訂政策</H3>
            <article className="mb-4">
              <H4>如何知道該房型的退訂政策？</H4>
              <Text1>
                每個房型會有不同的取消規定，點擊房型資訊中的查看退訂政策或免費取消文字，可以看到詳細的相關規定。
              </Text1>
            </article>
            <article className="mb-4">
              <H4>如果我想要修改或取消這個預訂該怎麼辦？</H4>
              <Text1>
                預訂完成後，您所收到的訂房成功電子郵件上會附有直接前往會員中心的連結，在會員中心您可以自行查詢/列印訂單明細，或取消訂房。如需修改訂單內容，須先取消原訂單，再重新成立新訂單。
              </Text1>
            </article>
            <article className="mb-4">
              <H4 className="font-medium text-base mb-4">退款相關資訊</H4>
              <Text1>
                所有因取消預訂或提前退房所產生的退費，只要符合退款規定，FindHotel將依照您原先選擇的付款方式進行退款
                (包括 :
                信用卡、ATM轉帳與電子支付)。退款皆採取人工流程，作業不含六日及國定假日。
                信用卡退款約 3-14
                工作天退至您原消費卡，實際仍依各發卡行工作日數為準。ATM 退款約
                3-5
                工作天退至您指定帳戶。電子錢包或其他支付方法，實際退款時間依各支付退款辦法辦理。
              </Text1>
            </article>
          </section>

          <section className="text-sm pt-4">
            <H3>常見問題</H3>
            <article className="mb-4">
              <H4>▶ 旅宿附近有哪些景點或地標？</H4>
              <Text1>
                根據旅宿詳細地址，可安排位於該城市及周邊區域的熱門景點出遊、或參考各旅宿資訊頁面中的「附近地標」規劃出遊行程及路線。
              </Text1>
            </article>
            <article className="mb-4">
              <H4>▶ 入住旅宿的價格是多少？</H4>
              <Text1>
                入住旅宿的房價會依照您的需求及入住條件而有所不同，請先選擇您預計入住的日期，以了解各房型及方案的房價。
              </Text1>
            </article>
            <article className="mb-4">
              <H4>▶ 入住是否有停車場可以停車？</H4>
              <Text1>
                選擇入住此旅宿可先參考旅宿資訊頁面的「服務與設施」、查看「交通服務/設施」項目，可了解旅宿是否提供免費/付費停車場、周邊是否有其他停車場、是否有提供叫車服務或者自行車友善程度等相關交通服務資訊。若「服務與設施」項目中未顯示，表示未提供此服務/設施。
              </Text1>
            </article>
          </section>
        </div>
      </div>
    </div>
  )
}

HotelDetail.getInitialProps = async (
  context: NextPageContext & { client: AxiosInstance }
) => {
  const { hotelId } = context.query
  const { data } = await context.client.get(`/hotels/${hotelId}`)

  return { hotel: data, pageTitle: data.name }
}

export default HotelDetail
