import { useFetch } from '@/hooks'
import { Bars3Icon, BuildingOffice2Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useContext, useState } from 'react'
import { GlobalContext } from '../pages/_app'
import { Button } from './Button'
import { Popover } from './Popover'

const MENU_POPOVER = 'menu-popover'

export const Nav: FC<PropsWithChildren> = () => {
  const router = useRouter()
  const { doRequest } = useFetch()
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement>()
  const handleClickMenu = (e: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLoginIn = () => {
    router.push(`/login?returnUrl=${encodeURIComponent(router.asPath)}`)
  }

  const handleLogOut = async () => {
    await doRequest({
      url: '/auth/signout',
      method: 'post',
      onSuccess: async () => {
        if (globalState.needAuth) {
          await router.push('/')
          setGlobalState({ currentUser: null })
          return
        }

        router.reload()
      },
    })
  }

  const openMenu = !!anchorEl
  const isShowMenuIcon = !['/login', '/signup'].includes(router.pathname)
  return (
    <>
      <header>
        <nav className="bg-white py-2 lg:py-4 fixed top-0 w-full z-10 shadow-lg px-4 lg:px-8">
          <div className="container flex justify-between items-center mx-auto">
            <Link
              href="/"
              className="text-sky-500 font-bold text-lg flex items-center"
            >
              <BuildingOffice2Icon
                className="h-5 w-5 text-sky-700 group-hover:text-sky-400 mr-2"
                aria-hidden="true"
              />
              FINDHOTEL
            </Link>
            <div className="flex gap-4 items-center">
              {isShowMenuIcon ? (
                <Bars3Icon
                  className="h-5 w-5 text-gray-700 hover:text-gray-500 mr-2 cursor-pointer transition-colors"
                  aria-hidden="true"
                  aria-describedby={MENU_POPOVER}
                  onClick={handleClickMenu}
                />
              ) : null}
              <Popover
                id={MENU_POPOVER}
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
              >
                {globalState.currentUser ? (
                  <>
                    <Button
                      variant="link"
                      onClick={() => router.push('/orderHistory')}
                    >
                      訂單查詢
                    </Button>
                    <Button variant="link" fullWidth onClick={handleLogOut}>
                      登出
                    </Button>
                  </>
                ) : (
                  <Button variant="link" onClick={handleLoginIn}>
                    登入
                  </Button>
                )}
              </Popover>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
