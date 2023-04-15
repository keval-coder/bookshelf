import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './books/books.module';
import { BookCategoryModule } from './books-categories/books-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    BookModule,
    BookCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
