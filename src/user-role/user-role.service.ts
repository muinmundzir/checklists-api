import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { UserRole } from '@app/user-role/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async getRoles() {
    try {
      const roles = await this.userRoleRepository.find();

      return { data: roles };
    } catch (error) {
      throw error;
    }
  }

  async findRoleByName(roleName: string) {
    try {
      const role = await this.userRoleRepository.findOne({
        where: {
          name: ILike(`%${roleName.toLowerCase()}%`),
        },
      });

      if (!role) throw new NotFoundException();

      return role;
    } catch (error) {
      throw error;
    }
  }
}
