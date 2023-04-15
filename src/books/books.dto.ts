import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Title is required.',
  })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Author is required.',
  })
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Category is required.',
  })
  @IsNumber()
  categoryId: number;
}

export class PaginationDto {
  @ApiProperty()
  @Transform((page) => Number(page), { toClassOnly: true })
  @IsNotEmpty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @Transform((limit) => Number(limit), { toClassOnly: true })
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  order?: [
    'book.id' | 'book.title' | 'book.author' | 'category.name',
    'ASC' | 'DESC',
  ];

  @ApiPropertyOptional()
  search: string;

  @ApiPropertyOptional()
  wantToRead: string;
}

export class BookWantToReadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  wantToRead: boolean;
}
