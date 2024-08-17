import { CreateItem } from '@app/checklist-item/dto/create-item.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChecklist {
  @ApiProperty({
    example: 'Tugas Minggu Pertama',
    required: true,
  })
  @IsNotEmpty({ message: 'Title is required.' })
  title: string;

  @ApiProperty({
    example: 'https://buffer.com/library/free-images/',
  })
  @IsOptional()
  headerUrl: string;

  @ApiProperty({ type: [CreateItem] })
  items: CreateItem[];
}
