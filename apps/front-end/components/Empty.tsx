import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'
import { AspectRatio } from './AspectRatio'

export const Empty: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-full m-4">
      <figure className="w-full max-w-md">
        <AspectRatio ratio={1}>
          <Image width={1200} height={1200} src="/empty.png" alt="empty" />
        </AspectRatio>
      </figure>
      <figcaption>{children}</figcaption>
    </div>
  )
}
