import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async getRoles() {
    try {
      const roles = await this.userRoleRepository.find();

      return roles;
    } catch (error) {
      Logger.log(error);
    }
  }

  async findRoleByName(roleName: string) {
    try {
      const role = await this.userRoleRepository.findOne({
        where: {
          name: ILike(`%${roleName.toLowerCase()}%`),
        },
      });

      return role;
    } catch (error) {
      Logger.log(error);
    }
  }
}
