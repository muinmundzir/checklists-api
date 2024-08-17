import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ChecklistItemService } from '@app/checklist-item/checklist-item.service'
import { Checklist } from '@app/checklist/checklist.entity'
import { CreateChecklist } from '@app/checklist/dto/create-checklist.dto'

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(Checklist)
    private checklistRepository: Repository<Checklist>,
    private itemsService: ChecklistItemService,
  ) {}

  async find(userId: string) {
    try {
      const checklists = await this.checklistRepository.find({
        relations: ['items'],
        where: {
          userId,
        },
      })

      return {
        data: checklists,
      }
    } catch (error) {
      throw error
    }
  }

  async create(checklistDto: CreateChecklist, userId: string) {
    try {
      const { title, headerUrl, items } = checklistDto

      const checklist = new Checklist()
      checklist.title = title
      checklist.headerUrl = headerUrl
      checklist.userId = userId

      const savedChecklist = await this.checklistRepository.save(checklist)

      await this.itemsService.create(items, savedChecklist.id)

      const data = await this.checklistRepository.findOne({
        relations: ['items'],
        where: {
          id: savedChecklist.id,
        },
      })

      return {
        data,
      }
    } catch (error) {
      throw error
    }
  }

  async delete(checklistId: string, userId: string) {
    try {
      const checklist = await this.checklistRepository.findOne({
        where: {
          id: checklistId,
          userId,
        },
      })

      await this.checklistRepository.remove(checklist)

      return {
        data: 'Checklist has been deleted',
      }
    } catch (error) {
      throw error
    }
  }
}
