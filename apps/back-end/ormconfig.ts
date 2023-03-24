import { join } from 'path'
import { Hotel } from './src/apis/hotels/hotel.entity'
import { Order } from './src/apis/orders/order.entity'
import { Report } from './src/apis/reports/report.entity'
import { Room } from './src/apis/rooms/room.entity'
import { User } from './src/apis/users/user.entity'

const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
  charset: 'utf8mb4',
  collation: 'utf8mb4_general_ci',
}

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      synchronize: true,
      database: 'findhotel',
      entities: [User, Report, Room, Hotel, Order],
      // entities: [join(__dirname, './**/*.entity{.ts,.js}')]
    })
    break
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [__dirname + '**/*.entity.ts'],
      migrationsRun: true,
    })
    break
  case 'production':
    break
  default:
    throw new Error('unknown environment')
}

export { dbConfig }
