import { Injectable } from '@nestjs/common'
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
    const room = this.roomRepo.create(body)
    room.hotel = hotel

    return this.roomRepo.save(room)
  }
}
