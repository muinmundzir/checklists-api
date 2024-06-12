import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

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

  @Get('/current')
  async getCurrentTrip(@GetUser() user: UserCtx) {
    return await this.tripService.findCurrent(user.sub);
  }

  @Post('')
  async addTrip(@Body() tripDto: CreateTrip, @GetUser() user: UserCtx) {
    return await this.tripService.create(tripDto, user);
  }

  @Patch('/:id')
  async cancelTrip(@Param() param: { id: string }, @GetUser() user: UserCtx) {
    return await this.tripService.cancel(param.id, user);
  }
}
