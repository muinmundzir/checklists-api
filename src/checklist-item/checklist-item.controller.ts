import { Controller, Param, Patch } from '@nestjs/common';
import { ChecklistItemService } from './checklist-item.service';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Checklist Items')
@Controller('checklist-item')
export class ChecklistItemController {
  constructor(private readonly itemsService: ChecklistItemService) {}

  @Roles(Role.User)
  @Patch('/:itemId')
  @ApiCreatedResponse({
    description: 'Return succesfully created checklist',
  })
  @ApiParam({
    name: 'itemId',
    required: true,
    description: "Checklist's item id",
  })
  async toggle(@Param() params: { itemId: string }) {
    return await this.itemsService.toggleComplete(params.itemId);
  }
}
