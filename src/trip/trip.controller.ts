import { Body, Controller, Get, Post } from '@nestjs/common';

import { TripService } from '@app/trip/trip.service';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';
import { CreateTrip } from '@app/trip/dto/create-trip.dto';

@Roles(Role.User)
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('')
  async getTrips(@GetUser() user: UserCtx) {
    return await this.tripService.findAll(user.sub);
  }

  @Post('')
  async addTrip(@Body() tripDto: CreateTrip, @GetUser() user: UserCtx) {
    return this.tripService.create(tripDto, user);
  }
}
