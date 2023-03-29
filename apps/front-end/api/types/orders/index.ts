import { OFindHotels } from '../hotels'
import { OFindRooms } from '../rooms'

export class EstimatedOrder {
  startDate: Date
  endDate: Date
  adult: number
  child: number
  room: number
  roomId: number
  hotelId: number
  hotelName: string
  roomName: string
  night: number
  price: number
  hasBreakfast: boolean
}

export interface Order {
  id: number
  startDate: string
  endDate: string
  price: number
  adult: number
  child: number
  night: number
  consumer: {
    firstName: string
    lastName: string
    phone: string
    email: string
    note: string
  }
  hotel: OFindHotels
  room: OFindRooms
}
