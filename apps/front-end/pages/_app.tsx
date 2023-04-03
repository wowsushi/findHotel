import { AppProps } from 'next/app'
import { Nav } from '@/components'
import './styles.css'
import Head from 'next/head'
import dayjs from 'dayjs'
import buildClient from '../api/build-client'
import { SearchQuery, HOTEL_QUERY, OFindHotels } from '@/types/hotels'
import { createContext, Dispatch, useEffect, useMemo, useReducer } from 'react'
import { CurrentUser } from '@/types/users'
require('dayjs/locale/zh-tw')

dayjs.locale('zh-tw')

export type GlobalState = {
  searchQuery: SearchQuery
  currentUser: CurrentUser
  needAuth: boolean
}

export type GlobalReducerProps = {
  globalState?: GlobalState
  setGlobalState: Dispatch<Partial<GlobalState>>
}

export const GlobalContext = createContext<GlobalReducerProps>({
  setGlobalState: () => {
    throw new Error('GlobalContext not defined')
  },
})

const globalReducer = (
  prevState: GlobalState,
  updatedProperty: Partial<GlobalState>
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
}: AppProps & { currentUser: CurrentUser }) {
  const { pageTitle } = pageProps
  const title = pageTitle ? `${pageTitle} | FINDHOTEL` : 'FINDHOTEL'
  const initGlobalState = {
    searchQuery: undefined,
    currentUser,
    needAuth: false,
  }
  const [globalState, setGlobalState] = useReducer(
    globalReducer,
    initGlobalState
  )

  useEffect(() => {
    if (window.sessionStorage) {
      const searchQuery = JSON.parse(sessionStorage.getItem(HOTEL_QUERY))
      !!searchQuery && setGlobalState({ searchQuery })
    }
  }, [])
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="FINDHOTEL" key="title" />
        <meta
          property="og:description"
          content="即刻預訂非凡行程，下一次旅行的意義由你決定！"
        />
        <meta
          property="og:image"
          content="https://github.com/wowsushi/findHotel/blob/main/apps/front-end/public/ogimage.png?raw=true"
        />
      </Head>
      <GlobalContext.Provider value={{ globalState, setGlobalState }}>
        <Nav></Nav>
        <main className="h-screen pt-[72px]">
          <Component {...pageProps} />
        </main>
      </GlobalContext.Provider>
    </>
  )
}

CustomApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx)

  const getUserInfo = async () => {
    if (typeof window === 'undefined') {
      const res = await client.get('/auth/whoami')
      return res.data
    }
    return null
  }

  let pageProps = {}

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps({
      ...appContext.ctx,
      client,
    })
  }

  return {
    pageProps,
    currentUser: await getUserInfo(),
  }
}

export default CustomApp
