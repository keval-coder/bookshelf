import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Name is required.',
  })
  @IsString()
  name: string;
}
