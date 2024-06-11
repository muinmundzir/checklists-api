import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { CreateUser } from '@app/user/dto/create-user.dto';
import { Public } from '@app/auth/auth.metadata';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/create')
  async addUser(@Body() userDto: CreateUser): Promise<User> {
    Logger.log('kungfu');
    return await this.userService.create(userDto);
  }

  @Get('')
  async findUsers() {
    return await this.userService.find();
  }
}
