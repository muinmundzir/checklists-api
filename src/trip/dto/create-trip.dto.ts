import { IsNotEmpty } from 'class-validator';

export class CreateTrip {
  @IsNotEmpty({ message: 'Start location is required.' })
  startLocation: string;

  @IsNotEmpty({ message: 'Destination is required.' })
  endLocation: string;
}
