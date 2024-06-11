import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from '@app/decorators/auth.decorator';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { CreateUser } from '@app/user/dto/create-user.dto';
import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/create')
  async addUser(@Body() userDto: CreateUser): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Roles(Role.User)
  @Get('')
  async findUsers() {
    return await this.userService.find();
  }
}
