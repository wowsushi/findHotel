import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsOptional } from 'class-validator'

export class GetRoomsDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  hotelId: number

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  startDate: Date

  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  endDate: Date

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  adult: number

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  child: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  room: number
}
