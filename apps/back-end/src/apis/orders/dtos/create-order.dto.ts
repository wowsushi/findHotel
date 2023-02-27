import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsString } from 'class-validator'

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
}
