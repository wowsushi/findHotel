import { Transform, Type } from 'class-transformer'
import {
  IsDate,
  IsDefined,
  IsMobilePhone,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  IsEmail,
  ValidateNested,
  IsOptional,
} from 'class-validator'

class ConsumerDto {
  @IsMobilePhone('zh-TW')
  phone: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  @IsOptional()
  note: string
}
export class CreateOrderDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date

  @IsNumber()
  roomId: number

  @IsNumber()
  child: number

  @IsNumber()
  adult: number

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ConsumerDto)
  consumer: ConsumerDto
}
