import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BookCategoriesController } from './books-categories.controller';
import { BookCategoryService } from './books-categories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BookCategoriesController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}
