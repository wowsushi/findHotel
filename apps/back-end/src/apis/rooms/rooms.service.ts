import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Hotel } from '../hotels/hotel.entity'
import { CreateRoomDto } from './dtos/create-room.dto'
import { Room } from './room.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>
  ) {}

  async create(body: CreateRoomDto) {
    const { hotelId } = body
    const hotel = await this.hotelRepo.findOneBy({ id: hotelId })
    if (!hotel) {
      throw new BadRequestException('Hotel not Found')
    }

    const room = this.roomRepo.create(body)
    room.hotel = hotel

    return this.roomRepo.save(room)
  }

  getFacilities(facilityList: number[]): Facility[] {
    return facilityList.map((f) => facilities[f])
  }
}

export type Facility = {
  type: number
  name: string
}

const facilities = [
  {
    type: 0,
    name: '寄物櫃',
  },
  {
    type: 1,
    name: '電梯',
  },
  {
    type: 2,
    name: '健身房',
  },
  {
    type: 3,
    name: '泳池',
  },
  {
    type: 4,
    name: '兒童遊戲室',
  },
  {
    type: 5,
    name: '自助烘衣設備',
  },
  {
    type: 6,
    name: '自助洗衣設備',
  },
]
