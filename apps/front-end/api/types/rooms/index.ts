import { Facility } from '../hotels'

export interface OFindRooms {
  id: string
  type: number
  name: string
  defaultPrice: number
  discountPrice: number
  facilities: Facility[]
  people: number
  amount: number
  pictures: string[]
  hasBreakfast: boolean
}
