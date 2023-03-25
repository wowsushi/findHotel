import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator'
import { RoomType } from '../room.entity'

enum FacilityType {
  breakfast,
  luggageStorage,
  washingMachine,
  dryer,
}

export class CreateRoomDto {
  @IsString()
  name: string

  @IsEnum(RoomType)
  type: number

  @IsNumber()
  defaultPrice: number

  @IsNumber()
  discountPrice: number

  @IsEnum(FacilityType, {
    each: true,
  })
  facilities: number[]

  @IsNumber()
  people: number

  @IsNumber()
  amount: number

  @IsArray()
  pictures: string[]

  @IsNumber()
  hotelId: number
}
