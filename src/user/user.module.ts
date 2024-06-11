import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { UserRoleModule } from '@app/user-role/user-role.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { RoleGuard } from '@app/auth/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserRoleModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    UserService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
