import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@app/user/user.entity';
import { CreateUser } from '@app/user/dto/create-user.dto';
import { UserRoleService } from '@app/user-role/user-role.service';
import { UserRole } from '@app/user-role/user-role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userRoleService: UserRoleService,
  ) {}

  async find() {
    try {
      const users = await this.userRepository.find({
        relations: ['userRole'],
        select: ['id', 'name', 'email', 'createdAt', 'userRole'],
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({
        relations: ['userRole'],
        select: ['id', 'name', 'email', 'createdAt', 'userRole'],
        where: {
          id,
        },
      });

      if (!user) throw new NotFoundException();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string, priority: boolean = false) {
    try {
      const user = await this.userRepository.findOne({
        relations: ['userRole'],
        where: {
          email,
        },
      });

      if (!user && !priority) throw new NotFoundException();

      if (!priority) delete user?.password;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(userDto: CreateUser) {
    try {
      const { name, email, password, isUser = true } = userDto;
      const isPriority = true;

      const existUser = await this.findUserByEmail(email, isPriority);

      if (existUser)
        throw new ForbiddenException(
          `User with email: ${email} already registered.`,
        );

      let userRole: UserRole = null;
      if (isUser) {
        userRole = await this.userRoleService.findRoleByName('user');
      } else {
        userRole = await this.userRoleService.findRoleByName('driver');
      }

      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      user.userRoleId = userRole?.id;

      const { id } = await this.userRepository.save(user);

      return this.findUserById(id);
    } catch (error) {
      throw error;
    }
  }
}
