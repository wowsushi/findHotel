import Image from 'next/image'
import { Typography } from '@/components'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { Text1 } = Typography

const Complete = () => {
  const router = useRouter()

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
          預定成功，您的訂單編號 {router.query.orderId} 可以在
          <Link href="/orderHistory" className="text-blue-500 underline ">
            我的訂單
          </Link>
          中，查看您的訂房資訊，謝謝。
        </Text1>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      pageTitle: '完成訂房',
    },
  }
}

export default Complete
