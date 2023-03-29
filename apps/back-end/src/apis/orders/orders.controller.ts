import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dtos/create-order.dto'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common'
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
    if (order) {
      return { success: true, id: order.id }
    }

    return { success: false }
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

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: number, @CurrentUser() user: User) {
    const order = await this.ordersService.findOne(orderId, user)

    return order
  }
}
