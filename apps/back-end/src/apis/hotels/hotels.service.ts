import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelsService {
    constructor(@InjectRepository(Hotel) private repo: Repository<Hotel>) { }


    create(body: CreateHotelDto) {
        const existingHotel = this.repo.find({ where: { phone: body.phone }})

        if (existingHotel) {
            throw new BadRequestException('Hotel exist')
        }
        
        const hotel = this.repo.create(body);

        return this.repo.save(hotel);
    }

}
