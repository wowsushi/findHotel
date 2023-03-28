import { AppProps } from 'next/app'
import { Nav } from '@/components'
import './styles.css'
import Head from 'next/head'
import dayjs from 'dayjs'
import buildClient from '../api/build-client'
import { HotelQuery, OFindHotels } from '@/types/hotels'
import { createContext, Dispatch, useReducer } from 'react'
require('dayjs/locale/zh-tw')

dayjs.locale('zh-tw')

export type SearchState = {
  searchQuery: HotelQuery
  hotels: OFindHotels[]
}

export type SearchReducerProps = {
  searchState: SearchState
  setSearchState: Dispatch<Partial<SearchState>>
}

export const initSearchState = {
  searchQuery: {
    area: '台北',
    startDate: '',
    endDate: '',
    adult: 1,
    child: 0,
    room: 1,
  },
  hotels: [],
}

export const SearchContext = createContext<SearchReducerProps>({
  searchState: initSearchState,
  setSearchState: () => {
    throw new Error('SearchContext not difined')
  },
})

const searchReducer = (
  prevState: SearchState,
  updatedProperty: Partial<SearchState>
) => ({
  ...prevState,
  ...updatedProperty,
})

function CustomApp({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: any }) {
  const { pageTitle } = pageProps
  const title = pageTitle ? `${pageTitle} | FINDHOTEL` : 'FINDHOTEL'
  const [searchState, setSearchState] = useReducer(
    searchReducer,
    initSearchState
  )

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav currentUser={currentUser}></Nav>
      <main className="h-screen pt-[72px]">
        <SearchContext.Provider value={{ searchState, setSearchState }}>
          <Component {...pageProps} />
        </SearchContext.Provider>

        <div id="portal-root"></div>
      </main>
    </>
  )
}

CustomApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/auth/whoami')

  let pageProps = {}

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps({
      ...appContext.ctx,
      client,
    })
  }

  return {
    pageProps,
    currentUser: data,
  }
}

export default CustomApp
