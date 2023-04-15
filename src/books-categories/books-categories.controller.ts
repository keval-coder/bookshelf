import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookCategoryService } from './books-categories.service';
import { JwtAuthGaurd } from '../auth/jwt-auth.gaurd';
import { CreateCategoryDto } from './books-categories.dto';

@ApiTags('Book Categories')
@Controller('book-categories')
export class BookCategoriesController {
  constructor(private bookCategoryService: BookCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGaurd)
  @ApiOperation({ summary: 'Create a new book category.' })
  @ApiBearerAuth()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.bookCategoryService.createCategory(createCategoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGaurd)
  @ApiOperation({ summary: 'Find all categories.' })
  @ApiBearerAuth()
  async getAllCategories() {
    return await this.bookCategoryService.findAllCategories();
  }
}
