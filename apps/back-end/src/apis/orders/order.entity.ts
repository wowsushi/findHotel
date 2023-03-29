import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Room } from '../rooms/room.entity'
import { User } from '../users/user.entity'
import { Hotel } from '../hotels/hotel.entity'
import { Expose } from 'class-transformer'

export enum OrderStatus {
  Pending,
  Completed,
  Cancelled,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  expiredAt: Date

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column()
  price: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Completed,
  })
  status: OrderStatus

  @Column()
  adult: number

  @Column()
  child: number

  @Column()
  night: number

  @Column('simple-json')
  consumer: {
    firstName: string
    lastName: string
    phone: string
    email: string
    note: string
  }

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ManyToOne(() => Room, (room) => room.orders)
  room: Room

  @ManyToOne(() => Hotel, (hotel) => hotel.orders)
  hotel: Hotel
}
