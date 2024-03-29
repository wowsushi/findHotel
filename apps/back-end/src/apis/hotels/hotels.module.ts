import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '../orders/order.entity'
import { Room } from '../rooms/room.entity'
import { RoomsService } from '../rooms/rooms.service'
import { Hotel } from './hotel.entity'
import { HotelsController } from './hotels.controller'
import { HotelsService } from './hotels.service'

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Order, Room])],
  controllers: [HotelsController],
  providers: [HotelsService, RoomsService],
})
export class HotelsModule {}
