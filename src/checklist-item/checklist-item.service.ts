import { Injectable, NotFoundException } from '@nestjs/common';
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

  async toggleComplete(itemId: string) {
    try {
      const item = await this.itemRepository.findOne({
        where: {
          id: itemId,
        },
      });

      if (!item) throw new NotFoundException('Item not found');

      item.isCompleted = !item.isCompleted;

      const savedItem = await this.itemRepository.save(item);

      return {
        data: savedItem,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(itemId: string, userId: string) {
    try {
      const checklist = await this.itemRepository.findOne({
        relations: ['checklist', 'checklist.user'],
        where: {
          id: itemId,
          checklist: {
            userId,
          },
        },
      });

      await this.itemRepository.remove(checklist);

      return {
        data: 'Checklist item has been deleted',
      };
    } catch (error) {
      throw error;
    }
  }
}
