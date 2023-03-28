import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hotel } from '../hotels/hotel.entity'
import { HotelsService } from '../hotels/hotels.service'
import { Room } from '../rooms/room.entity'
import { RoomsService } from '../rooms/rooms.service'
import { User } from '../users/user.entity'
import { Order } from './order.entity'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, Room, User, Hotel])],
  controllers: [OrdersController],
  providers: [OrdersService, RoomsService, HotelsService],
})
export class OrdersModule {}
