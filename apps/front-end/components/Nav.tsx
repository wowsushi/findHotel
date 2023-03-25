import { useFetch } from '@/hooks'
import { BuildingOffice2Icon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Button } from './Button'

type CurrentUser = {
  id: number
  email: string
}

type Props = {
  currentUser: CurrentUser
}
export const Nav: FC<PropsWithChildren<Props>> = ({
  currentUser,
  ...props
}) => {
  const router = useRouter()
  const { doRequest } = useFetch()
  const handleLogOut = async () => {
    await doRequest({
      url: '/auth/signout',
      method: 'post',
    })

    router.reload()
  }
  const isShowLogin = !router.pathname.includes('login')
  return (
    <>
      <header>
        <nav className="bg-white py-4 fixed top-0 w-full z-10 shadow-lg px-4 lg:px-8">
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
              {currentUser ? (
                <>
                  {/* 你好 {currentUser.email} */}
                  <Button variant="primary" onClick={handleLogOut}>
                    登出
                  </Button>
                </>
              ) : (
                isShowLogin && (
                  <Link
                    href="/login"
                    className="bg-sky-500 text-white py-2 px-4 rounded"
                  >
                    登入
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
