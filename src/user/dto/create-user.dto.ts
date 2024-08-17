import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: 'john.doe@mail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'X98a#@@#$*[jlHs]',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
