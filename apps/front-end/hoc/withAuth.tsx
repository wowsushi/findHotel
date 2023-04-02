import { Modal } from '@/components'
import { useRouter } from 'next/router'
import { FC, useContext, useEffect } from 'react'
import { GlobalContext } from '../pages/_app'

type Props = (Component: FC) => FC
export const withAuth: Props = (Component) => {
  const AuthenticatedComponents = (props) => {
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
