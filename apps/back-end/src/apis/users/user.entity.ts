import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Order } from '../orders/order.entity'
import { Report } from '../reports/report.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: true })
  admin: boolean

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id)
  }
}
