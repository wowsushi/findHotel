import { AppProps } from 'next/app'
import { Nav } from '@/components'
import './styles.css'
import Head from 'next/head'
import dayjs from 'dayjs'
import buildClient from '../api/build-client'
require('dayjs/locale/zh-tw')

dayjs.locale('zh-tw')
function CustomApp({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: any }) {
  const { pageTitle } = pageProps
  const title = pageTitle ? `${pageTitle} | FINDHOTEL` : 'FINDHOTEL'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav currentUser={currentUser}></Nav>
      <main className="h-screen pt-[72px]">
        <Component {...pageProps} />
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
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    )
  }

  return {
    pageProps,
    currentUser: data,
  }
}

export default CustomApp
