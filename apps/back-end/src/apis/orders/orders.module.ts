import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from '../rooms/room.entity'
import { User } from '../users/user.entity'
import { Order } from './order.entity'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, Room, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
