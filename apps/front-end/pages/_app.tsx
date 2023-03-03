import { AppProps } from 'next/app'
import Head from 'next/head'
import { Nav } from '@/components'
import './styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
  const { pageTitle } = pageProps
  return (
    <>
      <Head>
        <title> {pageTitle ? `${pageTitle} | ` : ''} FINDHOTEL</title>
      </Head>
      <Nav>
        <main className="h-screen pt-[72px]">
          <Component {...pageProps} />
        </main>
      </Nav>
    </>
  )
}

export default CustomApp
