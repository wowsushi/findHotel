import { HotelCard } from '../../components/HotelCard'
import { SearchArea } from '@/components'
import { useEffect, FC, useContext, useState } from 'react'
import { useFetch } from '@/hooks'
import { HotelQuery, HOTEL_QUERY, OFindHotels } from '@/types/hotels'
import { GlobalContext } from '../_app'

const Search: FC = () => {
  const { doRequest } = useFetch()
  const { globalState: searchState, setGlobalState: setSearchState } = useContext(GlobalContext)
  const { searchQuery } = searchState

  const [hotels, setHotels] = useState<OFindHotels[]>()
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

    setSearchState({ searchQuery: hotelQuery })
    setHotels(hotels)
  }
  return (
    <div className="container max-w-screen-xl mx-auto flex flex-col lg:flex-row">
      <SearchArea searchQuery={searchQuery} onSearch={handleSearchHotels} />
      <div className="py-4 px-2">
        {hotels?.length > 0 &&
          hotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
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
