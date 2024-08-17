import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItem {
  @ApiProperty({
    example: 'Mengerjakan laporan bimbingan',
    required: true,
  })
  @IsNotEmpty({ message: 'Content is required.' })
  content: string;
}
