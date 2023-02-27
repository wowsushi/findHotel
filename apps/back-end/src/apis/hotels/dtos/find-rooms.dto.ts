import { Transform } from 'class-transformer'

export class FindRoomsDto {
  @Transform(({ value }) => parseInt(value))
  hotelId: number
}
