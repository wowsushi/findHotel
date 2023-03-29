export interface HotelQuery {
  area: string
  startDate: string
  endDate: string
  adult: number
  child: number
  room: number
}

export interface SearchQuery extends HotelQuery {
  roomId?: number
}

export interface OFindHotels {
  id: string
  address: string
  bestPrice: number
  checkInTime: string
  checkOutTime: string
  facilities: Facility[]
  name: string
  phone: string
  pictures: string[]
}

export interface Facility {
  type: number
  name: string
}

export const HOTEL_QUERY = 'hotelQuery'
