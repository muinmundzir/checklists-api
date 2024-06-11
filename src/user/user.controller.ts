import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUser } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findUsers() {
    return await this.userService.getUsers();
  }

  @Post('')
  async addUser(@Body() userDto: CreateUser): Promise<User> {
    return await this.userService.createUser(userDto);
  }
}
