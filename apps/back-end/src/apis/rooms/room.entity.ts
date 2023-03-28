import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Hotel } from '../hotels/hotel.entity'
import { Order } from '../orders/order.entity'
export enum RoomType {
  Single,
  Twin,
  Double,
  Quadruple,
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: number

  @Column()
  name: string

  @Column()
  defaultPrice: number

  @Column()
  discountPrice: number

  @Column('simple-array')
  facilities: number[]

  @Column()
  people: number

  @Column()
  amount: number

  @Column()
  hasBreakfast: boolean

  @Column('simple-array')
  pictures: string[]

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel

  @ManyToOne(() => Order, (order) => order.room, {
    cascade: true,
  })
  @JoinColumn()
  orders: Order[]
}
