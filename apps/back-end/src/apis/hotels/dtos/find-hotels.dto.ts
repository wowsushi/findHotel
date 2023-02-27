import { Transform } from 'class-transformer'
import { IsDate, IsNumber } from 'class-validator'

export class FindHotelsDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkInDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate()
  checkOutDate: Date

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  people: number
}
