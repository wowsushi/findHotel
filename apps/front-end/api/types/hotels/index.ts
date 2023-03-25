export interface IFindHotels {
  area: string
  startDate: string
  endDate: string
  adult: number
  child: number
  room: number
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
