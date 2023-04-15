import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { SessionService } from '../helpers/session.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [BookController],
  providers: [BookService, SessionService],
})
export class BookModule {}
