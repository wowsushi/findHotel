import { IsNumber } from 'class-validator'

export class GetRoomDto {
  @IsNumber()
  roomId: number
}
