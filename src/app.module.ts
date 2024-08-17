import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeorm from '@app/config/typeorm';
import { UserModule } from '@app/user/user.module';
import { UserRoleModule } from '@app/user-role/user-role.module';
import { AuthModule } from '@app/auth/auth.module';
import { ChecklistModule } from '@app/checklist/checklist.module';
import { ChecklistItemModule } from '@app/checklist-item/checklist-item.module';

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
    ChecklistModule,
    ChecklistItemModule,
  ],
})
export class AppModule {}
