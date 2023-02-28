import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Room } from '../rooms/room.entity'
import { User } from '../users/user.entity'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Order, OrderStatus } from './order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Room) private roomRepo: Repository<Room>
  ) {}

  async create(body: CreateOrderDto, user: User) {
    const { roomId, checkInDate, checkOutDate } = body

    const existingOrder = await this.orderRepo
      .createQueryBuilder('order')
      .where('roomId = :roomId', { roomId })
      .andWhere(
        ':checkInDate < order.checkOutDate AND :checkOutDate > order.checkInDate',
        { checkInDate, checkOutDate }
      )
      .getExists()

    if (existingOrder) {
      throw new BadRequestException('Room already reserved')
    }
    const order = this.orderRepo.create(body)
    const room = await this.roomRepo.findOne({ where: { id: roomId } })
    const ONE_DAY = 60 * 60 * 24 * 1000
    const EXPIRED_TIMER = 15 * 60 * 1000
    const reservedDate = Math.floor(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        ONE_DAY
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
}
