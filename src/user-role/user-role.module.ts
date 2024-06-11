import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleService } from '@app/user-role/user-role.service';
import { UserRoleController } from '@app/user-role/user-role.controller';
import { UserRole } from '@app/user-role/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService],
  controllers: [UserRoleController],
  exports: [UserRoleService],
})
export class UserRoleModule {}
