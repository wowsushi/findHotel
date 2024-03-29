import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { RoomsService } from '../rooms/rooms.service'
import { CreateHotelDto } from './dtos/create-hotel.dto'
import { FindHotelsDto } from './dtos/find-hotels.dto'
import { HotelsService } from './hotels.service'

@Controller('hotels')
export class HotelsController {
  constructor(
    private hotelsService: HotelsService,
    private roomsService: RoomsService
  ) {}

  @Post()
  async createHotel(@Body() body: CreateHotelDto) {
    const hotel = await this.hotelsService.create(body)
    return hotel
  }

  @Get()
  async getHotels(@Query() query: FindHotelsDto, @Body() body) {
    const hotels = await this.hotelsService.findAvailableHotels(query)
    return hotels
  }

  @Get('findRooms')
  async findRooms(@Query('hotelId') hotelId: string) {
    const rooms = await this.hotelsService.findRooms(+hotelId)

    return rooms
  }

  @Get(':id')
  async findHotel(@Param('id') id: string) {
    const hotel = await this.hotelsService.findHotel(+id)

    return {
      ...hotel,
      facilities: this.roomsService.getFacilities(hotel.facilities),
    }
  }

  @Post(':id')
  updateHotels() {
    return null
  }

  @Delete(':id')
  deleteHotels() {
    return null
  }
}
