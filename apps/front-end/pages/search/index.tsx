import { HotelCard } from '../../components/HotelCard'
import { Empty, Loading, SearchArea } from '@/components'
import { useEffect, FC, useContext, useState } from 'react'
import { useFetch } from '@/hooks'
import { HotelQuery, HOTEL_QUERY, OFindHotels } from '@/types/hotels'
import { GlobalContext } from '../_app'

const Search: FC = () => {
  const { doRequest, loading } = useFetch()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const { searchQuery } = globalState
  const [hotels, setHotels] = useState<OFindHotels[]>([])
  useEffect(() => {
    const hotelQuery = sessionStorage.getItem(HOTEL_QUERY)
    if (hotelQuery) {
      handleSearchHotels(JSON.parse(hotelQuery))
    }
  }, [])

  const handleSearchHotels = async (hotelQuery: HotelQuery) => {
    const hotels = await doRequest({
      url: '/hotels',
      method: 'get',
      params: hotelQuery,
    })

    setGlobalState({ searchQuery: hotelQuery })
    setHotels(hotels)
  }
  return (
    <div className="container max-w-screen-xl mx-auto flex flex-col lg:flex-row pt-[54px] lg:pt-0">
      <SearchArea searchQuery={searchQuery} onSearch={handleSearchHotels} />
      <div className="py-4 px-2 flex-1">
        {hotels?.length > 0 ? (
          <>
            {hotels.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </>
        ) : (
          <Empty loading={loading}>你選擇的時段與人數並無合適房間</Empty>
        )}
        <Loading loading={loading}></Loading>
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  return {
    props: {
      pageTitle: '現在就預訂飯店！',
    },
  }
}
export default Search
