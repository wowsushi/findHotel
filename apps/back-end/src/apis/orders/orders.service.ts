import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { Repository } from 'typeorm'
import { HotelsService } from '../hotels/hotels.service'
import { RoomsService } from '../rooms/rooms.service'
import { User } from '../users/user.entity'
import { CreateOrderDto } from './dtos/create-order.dto'
import {
  GetEstimatedOrderDto,
  OGetEstimatedOrder,
} from './dtos/get-esitmated-order-dto'
import { Order, OrderStatus } from './order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private hotelsService: HotelsService,
    private roomsService: RoomsService
  ) {}

  async create(body: CreateOrderDto, user: User) {
    const { roomId, startDate, endDate } = body

    const existingOrder = await this.orderRepo
      .createQueryBuilder('order')
      .where('roomId = :roomId', { roomId })
      .andWhere(':startDate < order.endDate AND :endDate > order.startDate', {
        startDate,
        endDate,
      })
      .getExists()

    if (existingOrder) {
      throw new BadRequestException('Room already reserved')
    }
    const order = this.orderRepo.create(body)
    const room = await this.roomsService.findRoom(roomId)
    const hotel = await this.hotelsService.findHotel(room.hotel.id)
    const EXPIRED_TIMER = 15 * 60 * 1000
    const night = dayjs(endDate).diff(dayjs(startDate), 'd')

    order.price = room.discountPrice * night
    order.expiredAt = new Date(new Date().getTime() + EXPIRED_TIMER)
    order.status = OrderStatus.Completed
    order.user = user
    order.room = room
    order.night = night
    order.hotel = hotel

    return this.orderRepo.save(order)
  }

  async find(user: User) {
    const orders = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoin('room.hotel', 'hotel')
      .addSelect(['hotel.name'])
      .where('order.userId = :user', { user: user.id })
      .getMany()
    return orders
  }

  async findOne(orderId: number, user: User) {
    const _order = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoinAndSelect('order.hotel', 'hotel')
      .where('order.userId = :user', { user: user.id })
      .where('order.id = :orderId', { orderId })
      .getOneOrFail()

    const order = {
      ..._order,
      hotel: {
        ..._order.hotel,
        facilities: this.roomsService.getFacilities(_order.room.facilities),
      },
    }

    return order
  }

  async getEstimatedOrder({
    startDate,
    endDate,
    hotelId,
    roomId,
    ...rest
  }: GetEstimatedOrderDto) {
    const hotel = await this.hotelsService.findHotel(hotelId)
    const room = await this.roomsService.findRoom(roomId)

    if (!hotel || !room) {
      throw new BadRequestException('Hotel or Room not found')
    }

    const night = dayjs(endDate).diff(dayjs(startDate), 'd')
    const price = room.discountPrice * night
    const estimated: OGetEstimatedOrder = {
      ...rest,
      startDate,
      endDate,
      hotelId,
      roomId,
      night,
      price,
      hotelName: hotel.name,
      roomName: room.name,
      hasBreakfast: room.hasBreakfast,
    }

    return estimated
  }
}
