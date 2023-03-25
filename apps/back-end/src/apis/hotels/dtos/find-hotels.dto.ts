import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsOptional } from 'class-validator'

export class FindHotelsDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  adult: number

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  child: number

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  room: number
}
