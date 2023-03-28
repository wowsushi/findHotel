import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { User } from '../users/user.entity'
import { AuthGuard } from '../../guards/auth.guard'
import { GetEstimatedOrderDto } from './dtos/get-esitmated-order-dto'

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User) {
    const order = await this.ordersService.create(body, user)
    return order
  }

  @Get('/getEstimated')
  async getEsitmatedOrder(@Query() query: GetEstimatedOrderDto) {
    const estimated = await this.ordersService.getEstimatedOrder(query)
    return estimated
  }

  @Get()
  async getOrders(@CurrentUser() user: User) {
    const orders = await this.ordersService.find(user)

    return orders
  }
}
