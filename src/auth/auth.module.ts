import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@app/user/user.entity';
import { UserModule } from '@app/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '2 days',
      },
    }),
    UserModule,
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
