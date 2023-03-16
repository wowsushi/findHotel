import Image from 'next/image'
import { Typography } from '@/components'
import Link from 'next/link'

const { Text1 } = Typography
const Complete = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-4 gap-4">
      <div className="w-1/2 mb-4 lg:w-80">
        <Image
          src={'/note.png'}
          alt="order-complete"
          width={500}
          height={500}
        />
      </div>
      <div>
        <Text1>
          您已完成訂房，可以在
          <Link href="/orderHistory" className="text-blue-500 underline ">
            我的訂單
          </Link>
          中，查看您的訂房資訊，謝謝。
        </Text1>
      </div>
    </div>
  )
}

export default Complete
