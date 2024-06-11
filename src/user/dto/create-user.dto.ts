import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsBoolean()
  isUser: boolean;
}
