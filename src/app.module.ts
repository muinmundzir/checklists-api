import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeorm from '@app/config/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@app/user/user.module';
import { UserRoleModule } from '@app/user-role/user-role.module';
import { AuthModule } from '@app/auth/auth.module';
import { TripModule } from '@app/trip/trip.module';
import { OrderTripModule } from '@app/order-trip/order-trip.module';

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
