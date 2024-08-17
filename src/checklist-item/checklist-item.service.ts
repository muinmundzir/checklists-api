import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChecklistItem } from './checklist-item.entity';
import { CreateItem } from './dto/create-item.dto';

@Injectable()
export class ChecklistItemService {
  constructor(
    @InjectRepository(ChecklistItem)
    private itemRepository: Repository<ChecklistItem>,
  ) {}

  async create(itemsDto: CreateItem[], checklistId: string) {
    try {
      const items = itemsDto?.map((item) => {
        const checklistItem = new ChecklistItem();
        checklistItem.content = item.content;
        checklistItem.checklistId = checklistId;
        checklistItem.isCompleted = false;

        return checklistItem;
      });

      return await this.itemRepository.save(items);
    } catch (error) {
      throw error;
    }
  }
}
