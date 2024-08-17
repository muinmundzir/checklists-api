import { Body, Controller, Post } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ApiCreatedResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateChecklist } from './dto/create-checklist.dto';
import { GetUser } from '@app/decorators/get-user.decorator';
import { UserCtx } from '@app/types/user-ctx.type';
import { Roles } from '@app/decorators/role.decorator';
import { Role } from '@app/types/role.enum';

@ApiTags('Checklists')
@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Roles(Role.User)
  @Post('/')
  @ApiCreatedResponse({
    description: 'Return succesfully created checklist',
  })
  @ApiBody({
    type: CreateChecklist,
    description: 'JSON structure for checklist object',
  })
  async addUser(
    @Body() checklistDto: CreateChecklist,
    @GetUser() user: UserCtx,
  ) {
    return await this.checklistService.create(checklistDto, user.sub);
  }
}
