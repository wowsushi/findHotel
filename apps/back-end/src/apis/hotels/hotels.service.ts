import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../orders/order.entity'
import { Room } from '../rooms/room.entity'
import { RoomsService } from '../rooms/rooms.service'
import { CreateHotelDto } from './dtos/create-hotel.dto'
import { FindHotelsDto } from './dtos/find-hotels.dto'
import { Hotel } from './hotel.entity'

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private roomsService: RoomsService
  ) {}

  async create(body: CreateHotelDto) {
    const existingHotel = await this.hotelRepo.findOne({
      where: { phone: body.phone },
    })
    if (existingHotel) {
      throw new BadRequestException('Hotel exist')
    }

    const hotel = this.hotelRepo.create(body)
    return this.hotelRepo.save(hotel)
  }

  async findAvailableHotels({
    adult = 0,
    child = 0,
    room = 0,
    startDate,
    endDate,
  }: FindHotelsDto) {
    const people = adult + child
    const _hotels = await this.hotelRepo
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.rooms', 'room')
      .leftJoinAndSelect('room.orders', 'order')
      .where('room.people >= :people', { people })
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

    const hotels = _hotels.map(({ rooms, facilities, ...rest }) => {
      const lowerestRoom = rooms.sort(
        (a, b) => a.discountPrice - b.discountPrice
      )[0]

      return {
        ...rest,
        bestPrice: lowerestRoom.discountPrice,
        facilities: this.roomsService.getFacilities(facilities),
      }
    })
    return hotels
  }

  async findRooms(hotelId: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id: hotelId },
      relations: ['rooms'],
    })

    const rooms = hotel.rooms.map((room) => ({
      ...room,
      facilities: this.roomsService.getFacilities(room.facilities),
    }))

    return rooms
  }

  async findHotel(id: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id },
      relations: ['rooms'],
    })

    return hotel
  }
}
