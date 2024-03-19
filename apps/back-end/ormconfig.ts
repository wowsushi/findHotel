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
console.log(process.env.DB_NAME)
switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      database: process.env.DB_DATABASE_NAME,
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
    Object.assign(dbConfig, {
      type: 'mysql',
      host: 'find-hotel-db-do-user-16085651-0.c.db.ondigitalocean.com',
      port: '25060',
      username: 'doadmin',
      password: 'AVNS_q9aTVXJDoz0aQO5cYVh',
      database: 'dev_db',
      entities: [User, Report, Room, Hotel, Order],
      // entities: [join(__dirname, './**/*.entity{.ts,.js}')]
    })
    break
  default:
    throw new Error('unknown environment')
}

export { dbConfig }
