import { Facility, OFindHotels } from '../hotels'

export interface OFindRooms {
  id: number
  type: number
  name: string
  defaultPrice: number
  discountPrice: number
  facilities: Facility[]
  people: number
  amount: number
  pictures: string[]
  hasBreakfast: boolean
  hotel?: OFindHotels
}
