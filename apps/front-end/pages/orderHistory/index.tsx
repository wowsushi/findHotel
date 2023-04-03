import { Empty, Typography } from '@/components'
import { withAuth } from '@/hoc'
import { Order } from '@/types/orders'
import { utility } from '@findhotel/common'
import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
import { NextPage, NextPageContext } from 'next'
import Link from 'next/link'
const { H2, H3, Text1 } = Typography

type Props = {
  model: Order[]
}

const _OrderHistory: NextPage<Props> = ({ model }) => {
  return (
    <div className="container max-w-screen-xl mx-auto py-4 px-2">
      <H2>查詢訂單</H2>
      {model?.length > 0 ? (
        <ul>
          {model.map((item) => (
            <Link href={`/orderHistory/${item.id}`} key={item.id}>
              <li className="rounded-lg border border-slate-400 p-4 mb-4 bg-white">
                <div className="flex justify-between">
                  <H3>{item.room.hotel.name}</H3>
                  <Text1
                    color="price"
                    colorLevel={500}
                    className="text-end font-bold lg:text-xl"
                  >
                    ${utility.numberToCurrency(item.price)}
                  </Text1>
                </div>
                <Text1>
                  {dayjs(item.startDate).format('YYYY/MM/DD(dd)')} ~{' '}
                  {dayjs(item.endDate).format('YYYY/MM/DD(dd)')}
                </Text1>
                <Text1>入住{item.night}晚</Text1>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <Empty>還沒有任何旅程</Empty>
      )}
    </div>
  )
}

const OrderHistory = withAuth(_OrderHistory)

OrderHistory.getInitialProps = async (
  context: NextPageContext & { client: AxiosInstance }
) => {
  const { data } = await context.client.get(`/orders`)
  return { model: data, pageTitle: '訂單查詢' }
}

export default OrderHistory
