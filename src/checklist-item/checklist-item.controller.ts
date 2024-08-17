import { Controller, Delete, Param, Patch } from '@nestjs/common';
import { ChecklistItemService } from './checklist-item.service';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';

@Roles(Role.User)
@ApiTags('Checklist Items')
@Controller('checklist-item')
export class ChecklistItemController {
  constructor(private readonly itemsService: ChecklistItemService) {}

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

  @Delete('/:itemId')
  @ApiCreatedResponse({
    description: 'Return succesfully deleted checklist',
  })
  @ApiParam({
    name: 'itemId',
    required: true,
    description: "Checklist's item id",
  })
  async delete(
    @Param() params: { checklistId: string },
    @GetUser() user: UserCtx,
  ) {
    return await this.itemsService.delete(params.checklistId, user.sub);
  }
}
