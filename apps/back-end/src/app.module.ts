import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './apis/users/users.module'
import { ReportsModule } from './apis/reports/reports.module'
import cookieSession from 'cookie-session'
import { dbConfig } from '../ormconfig'
import { HotelsModule } from './apis/hotels/hotels.module'
import { RoomsModule } from './apis/rooms/rooms.module'
import { OrdersModule } from './apis/orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ReportsModule,
    HotelsModule,
    RoomsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          signed: false,
          secure: false,
          keys: [this.configService.get('COOKIE_KEY')],
        })
      )
      .forRoutes('*')
  }
}
