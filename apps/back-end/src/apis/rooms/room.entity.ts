import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';

  interface Facilities {
    type: number,
    name: string
  }
  @Entity()
  export class Room {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    type: string;
  
    @Column()
    availableDate: Date;

    @Column()
    defaultPrice: number;
    
    @Column()
    discountPrice: number;
    
    @Column()
    hasBreakfast: boolean;

    @Column()
    checkInDate: Date;

    @Column()
    checkOutDate: Date;

    @Column('simple-json')
    facilities: Facilities;

    @Column()
    people: number;

    @Column()
    price: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel
  }
  