import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from '@app/decorators/auth.decorator';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { CreateUser } from '@app/user/dto/create-user.dto';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/')
  @ApiCreatedResponse({
    description: 'Return succesfully created user',
  })
  @ApiBody({
    type: CreateUser,
    description: 'JSON structure for user object',
  })
  async addUser(@Body() userDto: CreateUser): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Roles(Role.User, Role.Driver)
  @Get('')
  @ApiOkResponse({
    description: 'Return list of users',
  })
  async findUsers() {
    return await this.userService.find();
  }
}
