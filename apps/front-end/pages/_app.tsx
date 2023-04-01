import { AppProps } from 'next/app'
import { Nav } from '@/components'
import './styles.css'
import Head from 'next/head'
import dayjs from 'dayjs'
import buildClient from '../api/build-client'
import { SearchQuery, HOTEL_QUERY, OFindHotels } from '@/types/hotels'
import { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react'
require('dayjs/locale/zh-tw')

dayjs.locale('zh-tw')

export type SearchState = {
  searchQuery: SearchQuery
  hotels: OFindHotels[]
}

export type SearchReducerProps = {
  searchState: SearchState
  setSearchState: Dispatch<Partial<SearchState>>
}

export const initSearchState = {
  searchQuery: undefined,
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
) => {
  return {
    ...prevState,
    ...updatedProperty,
  }
}

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

  useEffect(() => {
    if (window.sessionStorage) {
      const searchQuery = JSON.parse(sessionStorage.getItem(HOTEL_QUERY))
      !!searchQuery && setSearchState({ searchQuery })
    }
  }, [])

  const searchValues = useMemo(
    () => ({ searchState, setSearchState }),
    [searchState]
  )

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav currentUser={currentUser}></Nav>
      <main className="h-screen pt-[72px]">
        <SearchContext.Provider value={searchValues}>
          <Component {...pageProps} />
        </SearchContext.Provider>
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
