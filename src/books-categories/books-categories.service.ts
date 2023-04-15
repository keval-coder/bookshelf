import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateCategoryDto } from './books-categories.dto';
import { BookCategoriesEntity } from '../database/entities/book-categories.entity';

@Injectable()
export class BookCategoryService {
  constructor(private conn: Connection) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const categoryExist = await this.conn
      .getRepository(BookCategoriesEntity)
      .findOne({
        where: { name },
      });
    if (categoryExist)
      throw new BadRequestException('Category name is already used.');

    const category = await this.conn.getRepository(BookCategoriesEntity).save({
      name,
    });

    return {
      data: category,
      message: 'Category created successfully.',
    };
  }

  async findAllCategories() {
    const categories = await this.conn
      .getRepository(BookCategoriesEntity)
      .find();

    return {
      data: categories,
    };
  }
}
