import { Modal } from '@/components'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../pages/_app'

type Props = (Component: NextPage) => NextPage
export const withAuth: Props = (Component) => {
  const AuthenticatedComponents: NextPage = (props) => {
    const router = useRouter()
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const isAuthenticated = globalState.currentUser

    useEffect(() => {
      setGlobalState({ needAuth: true })
      if (!isAuthenticated) {
        Modal.alert('請先登入', () => {
          router.push(`login?returnUrl=${encodeURIComponent(router.asPath)}`)
        })
      }

      return () => setGlobalState({ needAuth: false })
    }, [isAuthenticated, router, setGlobalState])

    return isAuthenticated ? <Component {...props} /> : null
  }

  return AuthenticatedComponents
}
