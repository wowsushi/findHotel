import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Room } from '../rooms/room.entity'

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

  @OneToMany(() => Room, (room) => room.hotel, {
    cascade: true,
  })
  rooms: string
}
