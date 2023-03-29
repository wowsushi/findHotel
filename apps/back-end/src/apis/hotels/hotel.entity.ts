import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Room } from '../rooms/room.entity'
import { Order } from '../orders/order.entity'
import { Facility } from '../rooms/rooms.service'

export interface Address {
  lat: number
  lng: number
  fullAddress: string
}

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  phone: string

  @Column()
  address: string

  @Column()
  name: string

  @Column()
  checkInTime: string

  @Column()
  checkOutTime: string

  @Column('simple-array')
  pictures: string[]

  @Column('simple-array')
  facilities: number[]

  @OneToMany(() => Room, (room) => room.hotel, {
    cascade: true,
  })
  rooms: Room[]

  @OneToMany(() => Order, (order) => order.hotel, {
    cascade: true,
  })
  orders: Order[]
}
