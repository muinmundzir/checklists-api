import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { Checklist } from './checklist.entity';
import { ChecklistItemModule } from '@app/checklist-item/checklist-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Checklist]), ChecklistItemModule],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule {}
