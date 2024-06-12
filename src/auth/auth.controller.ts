import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from '@app/auth/auth.service';
import { SignIn } from '@app/auth/dto/sign-in.dto';
import { Public } from '@app/decorators/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Return jwt after succesfully sign in',
  })
  @ApiNotFoundResponse({
    description: 'Account not found',
  })
  @ApiBody({
    type: SignIn,
    description: 'JSON structure for user sign in',
  })
  async signIn(@Body() signInDto: SignIn) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
