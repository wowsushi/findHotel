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
    const ONE_DAY = 60 * 60 * 24 * 1000
    const EXPIRED_TIMER = 15 * 60 * 1000
    const reservedDate = Math.floor(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / ONE_DAY
    )
    order.price = room.discountPrice * reservedDate
    order.expiredAt = new Date(new Date().getTime() + EXPIRED_TIMER)
    order.status = OrderStatus.Pending
    order.user = user
    order.room = room

    return this.orderRepo.save(order)
  }

  async find(user: User) {
    const orders = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoinAndSelect('room.hotel', 'hotel')
      .where('order.userId = :user', { user: user.id })
      .getMany()
    return orders
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
