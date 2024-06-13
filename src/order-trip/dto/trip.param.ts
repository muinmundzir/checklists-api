import { IsUUID } from 'class-validator';

export class TripParam {
  @IsUUID()
  id: string;
}
