import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrip {
  @ApiProperty({
    example: 'Bandung',
    required: true,
  })
  @IsNotEmpty({ message: 'Start location is required.' })
  startLocation: string;

  @ApiProperty({
    example: 'Jakarta',
    required: true,
  })
  @IsNotEmpty({ message: 'Destination is required.' })
  endLocation: string;
}
