import { IsArray, IsString } from 'class-validator'

export class CreateHotelDto {
  @IsString()
  phone: string

  @IsString()
  address: string

  @IsString()
  name: string

  @IsArray()
  pictures: string[]

  @IsString()
  checkInTime: string

  @IsString()
  checkOutTime: string

  @IsArray()
  facilities: number[]
}
