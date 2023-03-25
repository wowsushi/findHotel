import { HotelCard } from '../../components/HotelCard'
import { SearchArea } from '@/components'
import { useReducer, createContext, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { IFindHotels } from '@/types/hotels'

enum SearchAction {
  GET_HOTELS = 'GET_HOTELS',
}

export const SearchContext = createContext({ state: {}, dispatch: {} })
const searchReducer = (state, action) => {
  switch (action.type) {
    case SearchAction.GET_HOTELS: {
      return {
        ...state,
        hotels: action.payload.hotels,
      }
    }
  }
}

const Search = () => {
  const { doRequest } = useFetch()
  const [state, dispatch] = useReducer(searchReducer, { hotels: [] })
  const { hotels } = state

  useEffect(() => {
    const hotelQuery = sessionStorage.getItem('hotelQuery')
    if (hotelQuery) {
      handleSearchHotels(JSON.parse(hotelQuery))
    }
  }, [])

  const handleSearchHotels = async (hotelQuery: IFindHotels) => {
    const hotels = await doRequest({
      url: '/hotels',
      method: 'get',
      params: hotelQuery,
    })
    console.log(hotels)
    dispatch({
      type: 'GET_HOTELS',
      payload: { hotels },
    })
  }
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      <div className="container max-w-screen-xl mx-auto flex flex-col lg:flex-row">
        <SearchArea onSearch={handleSearchHotels} />
        <div className="py-4 px-2">
          {hotels?.length > 0 &&
            hotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
        </div>
      </div>
    </SearchContext.Provider>
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
