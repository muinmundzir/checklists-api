import { Controller, Get, Param, Post } from '@nestjs/common';

import { OrderTripService } from '@app/order-trip/order-trip.service';
import { Role } from '@app/types/role.enum';
import { Roles } from '@app/decorators/role.decorator';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';

@Roles(Role.Driver)
@Controller('order-trips')
export class OrderTripController {
  constructor(private readonly orderTripService: OrderTripService) {}

  @Get('')
  async getAvailableTrips() {
    return await this.orderTripService.getTrips();
  }

  @Post('/:id')
  async confirmOrderTrip(
    @Param() param: { id: string },
    @GetUser() user: UserCtx,
  ) {
    return await this.orderTripService.confirmTrip(param.id, user);
  }
}
