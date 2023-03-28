import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateRoomDto } from './dtos/create-room.dto'
import { GetRoomDto } from './dtos/get-room-dto'
import { RoomsService } from './rooms.service'

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  async createRoom(@Body() body: CreateRoomDto) {
    const room = await this.roomsService.create(body)

    return room
  }

  @Get()
  async getRoom(@Query() { roomId }: GetRoomDto) {
    const room = await this.roomsService.findRoom(roomId)

    return room
  }
}
