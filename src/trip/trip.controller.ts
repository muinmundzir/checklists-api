import { Controller, Get } from '@nestjs/common';

import { TripService } from '@app/trip/trip.service';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Roles(Role.User)
  @Get('')
  async getTrips(@GetUser() user: UserCtx) {
    return await this.tripService.findAll(user.sub);
  }
}
