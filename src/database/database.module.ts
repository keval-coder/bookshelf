import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookEntity } from './entities/books.entity';
import { BookCategoriesEntity } from './entities/book-categories.entity';

const repo = TypeOrmModule.forFeature([
  UserEntity,
  BookEntity,
  BookCategoriesEntity,
]);

const database = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT')),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_NAME'),
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
      dateStrings: true,
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [database, repo],
  exports: [repo],
})
export class DatabaseModule {}
