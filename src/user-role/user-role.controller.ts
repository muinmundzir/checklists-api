import { Controller, Get } from '@nestjs/common';

import { UserRoleService } from './user-role.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User Role')
@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Return all exist roles',
  })
  async findRoles() {
    return await this.userRoleService.getRoles();
  }
}
