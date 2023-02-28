import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { User } from '../users/user.entity'
import { AuthGuard } from '../../guards/auth.guard'

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User) {
    const order = await this.ordersService.create(body, user)
    return order
  }

  @Get()
  async getOrders(@CurrentUser() user: User) {
    const orders = await this.ordersService.find(user)

    return orders
  }
}
