import { IsUUID } from 'class-validator';

export class UserParam {
  @IsUUID()
  id: string;
}
