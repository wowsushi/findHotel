import { ArrayContains, IsArray, IsEmail, IsJSON, IsString } from 'class-validator';
import type { Address } from '../hotel.entity';

export class CreateHotelDto {
    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsString()
    name: string;

    @IsArray()
    pictures: string[]

}
