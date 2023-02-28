import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Room } from '../rooms/room.entity'
import { User } from '../users/user.entity'

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
  checkInDate: Date

  @Column()
  checkOutDate: Date

  @Column()
  price: number

  @Column()
  note: string

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Completed,
  })
  status: OrderStatus

  @Column()
  people: number

  @Column('simple-json')
  consumer: {
    firstName: string
    lastName: string
    phone: string
  }

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ManyToOne(() => Room, (room) => room.orders)
  room: Room
}
