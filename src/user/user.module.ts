import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { UserRoleModule } from '@app/user-role/user-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserRoleModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
