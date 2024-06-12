import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeorm from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { OrderTripModule } from './order-trip/order-trip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await configService.get('typeorm'),
    }),
    UserModule,
    UserRoleModule,
    AuthModule,
    TripModule,
    OrderTripModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
