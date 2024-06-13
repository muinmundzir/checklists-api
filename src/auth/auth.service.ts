import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { User } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    try {
      const isPriority = true;
      const user: User = await this.userService.findUserByEmail(
        email,
        isPriority,
      );

      const passwordMatch = await this.verifyPassword(user?.password, password);

      if (!passwordMatch)
        throw new UnauthorizedException('Wrong email or password');

      const payload = {
        sub: user.id,
        email: user.email,
        role: user.userRole.name,
      };

      return {
        data: {
          access_token: await this.jwtService.signAsync(payload),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyPassword(userPassword: string, inputPassword: string) {
    return await argon.verify(userPassword, inputPassword);
  }
}
