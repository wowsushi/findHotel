import { Transform, Type } from 'class-transformer'
import {
  IsDate,
  IsDefined,
  IsMobilePhone,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator'

class ConsumerDto {
  @IsMobilePhone('zh-TW')
  phone: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}
export class CreateOrderDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkInDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkOutDate: Date

  @IsNumber()
  roomId: number

  @IsString()
  note: string

  @IsNumber()
  people: number

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ConsumerDto)
  consumer: ConsumerDto
}
