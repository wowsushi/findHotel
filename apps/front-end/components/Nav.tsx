import { BuildingOffice2Icon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

export const Nav: FC<PropsWithChildren> = ({ ...props }) => {
  return (
    <>
      <header>
        <nav className="bg-white py-4 fixed top-0 w-full z-10 shadow-lg px-8">
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
            <Link
              href="/login"
              className="bg-sky-500 text-white font-bold py-2 px-4 rounded"
            >
              登入
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
