import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TripService } from '@app/trip/trip.service';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';
import { CreateTrip } from '@app/trip/dto/create-trip.dto';
import { UserParam } from '@app/trip/dto/user.param';

@ApiTags('Trip')
@Roles(Role.User)
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get('')
  @ApiOkResponse({
    description: 'Return list of signed in user trip history',
  })
  @ApiBadGatewayResponse({ description: 'Server error' })
  async getTrips(@GetUser() user: UserCtx) {
    return await this.tripService.findAll(user.sub);
  }

  @Get('/current')
  @ApiOkResponse({
    description: 'Return current pending/accepted trip',
  })
  async getCurrentTrip(@GetUser() user: UserCtx) {
    return await this.tripService.findCurrent(user.sub);
  }

  @Post('')
  @ApiCreatedResponse({
    description: 'Return succesfully created trip',
  })
  @ApiNotFoundResponse({
    description: 'Trip not found',
  })
  @ApiBody({
    type: CreateTrip,
    description: 'JSON structure for trip object',
  })
  async addTrip(@Body() tripDto: CreateTrip, @GetUser() user: UserCtx) {
    return await this.tripService.create(tripDto, user);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    description: 'Trip id',
    required: true,
  })
  @ApiOkResponse({
    description: 'Return cancelled trip',
  })
  @ApiNotFoundResponse({
    description: 'Trip not found',
  })
  async cancelTrip(@Param() param: UserParam, @GetUser() user: UserCtx) {
    return await this.tripService.cancel(param.id, user);
  }
}
