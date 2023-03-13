import { AppProps } from 'next/app'
import { Nav } from '@/components'
import './styles.css'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
  const { pageTitle } = pageProps

  const title = pageTitle ? `${pageTitle} | FINDHOTEL` : 'FINDHOTEL'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav></Nav>
      <main className="h-screen pt-[72px]">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default CustomApp
