import { Controller, Get } from '@nestjs/common';

import { OrderTripService } from '@app/order-trip/order-trip.service';
import { Role } from '@app/types/role.enum';
import { Roles } from '@app/decorators/role.decorator';

@Roles(Role.Driver)
@Controller('order-trips')
export class OrderTripController {
  constructor(private readonly orderTripService: OrderTripService) {}

  @Get('')
  async getAvailableTrips() {
    return await this.orderTripService.getTrips();
  }
}
