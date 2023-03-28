import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class GetEstimatedOrderDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  adult: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  child: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  room: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  roomId: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  hotelId: number
}

export class OGetEstimatedOrder {
  @IsDate()
  startDate: Date

  @IsDate()
  endDate: Date

  @IsNumber()
  adult: number

  @IsNumber()
  child: number

  @IsNumber()
  room: number

  @IsNumber()
  roomId: number

  @IsNumber()
  hotelId: number

  @IsString()
  hotelName: string

  @IsString()
  roomName: string

  @IsNumber()
  night: number

  @IsNumber()
  price: number

  @IsNumber()
  hasBreakfast: boolean
}
