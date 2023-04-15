import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, Connection } from 'typeorm';
import { SessionService } from '../helpers/session.service';
import { BookWantToReadDto, CreateBookDto, PaginationDto } from './books.dto';
import { BookEntity } from '../database/entities/books.entity';
import { BookCategoriesEntity } from '../database/entities/book-categories.entity';

@Injectable()
export class BookService {
  constructor(private conn: Connection, private session: SessionService) {}

  async createBook(createBookDto: CreateBookDto, file: Express.Multer.File) {
    const user = this.session.user;
    const { title, author, categoryId } = createBookDto;

    const bookExist = await this.conn.getRepository(BookEntity).findOne({
      where: {
        title,
        userId: user.id,
      },
    });
    if (bookExist) throw new BadRequestException('Title is already used.');

    const validCategory = await this.conn
      .getRepository(BookCategoriesEntity)
      .findOne({
        where: { id: categoryId },
      });
    if (!validCategory) throw new BadRequestException('Category is not valid.');

    const book = await this.conn.getRepository(BookEntity).save({
      title,
      author,
      categoryId,
      cover_image: file.filename,
      userId: user.id,
    });
    if (!book)
      throw new BadRequestException('Book is not created! Please try again.');

    return {
      data: book,
      message: 'Book created successfully.',
    };
  }

  async findAllBooks(paginationDto: PaginationDto) {
    const user = this.session.user;
    const { page, limit, order, search, wantToRead } = paginationDto;

    const skippedItems = ((page || 1) - 1) * limit;
    const column_search = ['book.title', 'book.author', 'category.name'];

    const order_value = order || ['book.id', 'DESC'];

    const qb = this.conn
      .getRepository(BookEntity)
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .andWhere('book.userId = :userId', { userId: user.id });

    if (wantToRead === 'true') {
      qb.andWhere('book.user_want_to_read = :wantToRead', { wantToRead: true });
    } else if (wantToRead === 'false') {
      qb.andWhere('book.user_want_to_read = :wantToRead', {
        wantToRead: false,
      });
    }

    const bookCount = await qb.getCount();

    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          column_search.map((field) => {
            qb.orWhere(field + ' LIKE :fieldVal', {
              fieldVal: '%' + search + '%',
            });
          });
        }),
      );
    }

    const bookFilteredCount = await qb.getCount();
    const books = await qb
      .skip(skippedItems)
      .take(limit)
      .orderBy(order_value[0], order_value[1])
      .getMany();

    return {
      total: bookCount,
      filtered: bookFilteredCount,
      data: books,
      page,
      limit,
      message: 'Books fetched successfully.',
    };
  }

  async wantsToRead(id: number, bookWantToReadDto: BookWantToReadDto) {
    const { wantToRead } = bookWantToReadDto;

    const bookExist = await this.conn.getRepository(BookEntity).findOne({
      where: { id },
    });
    if (!bookExist) throw new BadRequestException('Book not found.');

    await this.conn.getRepository(BookEntity).save({
      id,
      user_want_to_read: wantToRead,
    });

    return {
      message: `User ${wantToRead ? 'want to read' : 'does not want to read.'}`,
    };
  }
}
