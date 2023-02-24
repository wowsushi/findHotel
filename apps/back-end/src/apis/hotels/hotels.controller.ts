import { Body, Controller, Delete, Get, Post, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { Hotel } from './hotel.entity';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
    constructor(
        private hotelsService: HotelsService,
      ) {}
    
    @Post() 
    async createHotel(@Body() body: CreateHotelDto, @Session() session: any) {
        const hotel = await this.hotelsService.create(body);
        return hotel;
    }

    @Get()
    getHotels() {
        return null
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
