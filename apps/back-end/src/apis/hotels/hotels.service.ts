import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../orders/order.entity'
import { Room } from '../rooms/room.entity'
import { CreateHotelDto } from './dtos/create-hotel.dto'
import { FindHotelsDto } from './dtos/find-hotels.dto'
import { Hotel } from './hotel.entity'

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(Order) private orderRepo: Repository<Order>
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

  findAvailableHotels({ people, checkInDate, checkOutDate }: FindHotelsDto) {
    const hotels = this.roomRepo
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.orders', 'order')
      .where('room.people >= :people', { people })
      .andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('order.roomId')
            .from(Order, 'order')
            .where(
              ':checkInDate < order.checkOutDate AND :checkOutDate > order.checkInDate'
            )
            .getQuery()
          return `room.id NOT IN ${subQuery}`
        },
        { checkInDate, checkOutDate }
      )
      .leftJoinAndSelect('room.hotel', 'hotel')
      .getMany()

    return hotels
  }

  async findRooms(hotelId: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id: hotelId },
      relations: ['rooms'],
    })

    return hotel.rooms
  }

  async findHotel(id: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id },
      relations: ['rooms'],
    })

    return hotel
  }
}
