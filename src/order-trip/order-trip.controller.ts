import { Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { OrderTripService } from '@app/order-trip/order-trip.service';
import { Role } from '@app/types/role.enum';
import { Roles } from '@app/decorators/role.decorator';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TripParam } from './dto/trip.param';

@ApiTags('Order Trip')
@Roles(Role.Driver)
@Controller('order-trips')
export class OrderTripController {
  constructor(private readonly orderTripService: OrderTripService) {}

  @Get('')
  @ApiOkResponse({
    description: 'Return all available users created trips',
  })
  async getAvailableTrips() {
    return await this.orderTripService.getTrips();
  }

  @Get('/history')
  @ApiOkResponse({
    description: "Return history of driver's order trips",
  })
  async getOrderHistory(@GetUser() driver: UserCtx) {
    return await this.orderTripService.getOrderTripsHistory(driver.sub);
  }

  @Get('/current')
  @ApiOkResponse({
    description: 'Return current ongoing order trips',
  })
  async getCurrent(@GetUser() driver: UserCtx) {
    return await this.orderTripService.getCurrentOrderTrip(driver.sub);
  }

  @Post('/:id')
  @ApiParam({
    name: 'id',
    description: 'Trip id',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Return created order trip with its related trip',
  })
  async confirmOrderTrip(@Param() param: TripParam, @GetUser() user: UserCtx) {
    return await this.orderTripService.confirmTrip(param.id, user);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    description: 'Order trip id',
    required: true,
  })
  @ApiOkResponse({
    description: 'Return cancelled order trip',
  })
  async cancelOrderTrip(@Param() param: TripParam, @GetUser() user: UserCtx) {
    return await this.orderTripService.cancelTrip(param.id, user);
  }

  @Post('/:id/completed')
  @ApiParam({
    name: 'id',
    description: 'Order trip id',
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Return completed order trip with its related trip',
  })
  async completeOrderTrip(@Param() param: TripParam, @GetUser() user: UserCtx) {
    return await this.orderTripService.completeTrip(param.id, user);
  }
}
