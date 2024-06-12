import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignIn {
  @ApiProperty({
    example: 'john.doe@mail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'X98a#@@#$*[jlHs]',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
