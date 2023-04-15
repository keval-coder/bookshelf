import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BookService } from './books.service';
import { BookWantToReadDto, CreateBookDto, PaginationDto } from './books.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileName } from '../helpers/filename.service';
import { diskStorage } from 'multer';
import { JwtAuthGaurd } from '../auth/jwt-auth.gaurd';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FileName.destinationPath,
        filename: FileName.customFileName,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new Book.' })
  @ApiBearerAuth()
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.bookService.createBook(createBookDto, file);
  }

  @Get()
  @UseGuards(JwtAuthGaurd)
  @ApiOperation({ summary: 'Find All Book.' })
  @ApiBearerAuth()
  async findAllBooks(@Query() paginationDto: PaginationDto) {
    return await this.bookService.findAllBooks(paginationDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGaurd)
  @ApiOperation({ summary: 'User want to read book or not.' })
  @ApiBearerAuth()
  async wantToReadBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookWantToReadDto: BookWantToReadDto,
  ) {
    return await this.bookService.wantsToRead(id, bookWantToReadDto);
  }
}
