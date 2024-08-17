import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChecklistItemController } from './checklist-item.controller';
import { ChecklistItemService } from './checklist-item.service';
import { ChecklistItem } from './checklist-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistItem])],
  controllers: [ChecklistItemController],
  providers: [ChecklistItemService],
  exports: [ChecklistItemService],
})
export class ChecklistItemModule {}
