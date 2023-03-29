import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Hotel } from '../hotels/hotel.entity'
import { Order } from '../orders/order.entity'
import { CreateRoomDto } from './dtos/create-room.dto'
import { GetRoomsDto } from './dtos/get-rooms-dto'
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
    room.hasBreakfast = Math.random() > 0.5

    return this.roomRepo.save(room)
  }

  async findRooms({
    adult,
    child,
    room,
    startDate,
    endDate,
    hotelId,
  }: GetRoomsDto) {
    const people = adult + child
    if (!adult || !room || !startDate || !endDate || !hotelId) return []

    const rooms = await this.roomRepo
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.orders', 'order')
      .where('room.people >= :people', { people })
      .andWhere('room.hotel = :hotelId', { hotelId })
      .andWhere('room.amount >= :room', { room })
      .andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('order.roomId')
            .from(Order, 'order')
            .where(':startDate < order.endDate AND :endDate > order.startDate')
            .getQuery()
          return `room.id NOT IN ${subQuery}`
        },
        { startDate, endDate }
      )
      .getMany()

    return rooms
  }

  getFacilities(facilityList: number[]): Facility[] {
    return facilityList.map((f) => facilities[f])
  }

  async findRoom(id: number) {
    return await this.roomRepo.findOne({
      where: { id },
      relations: ['hotel'],
    })
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
