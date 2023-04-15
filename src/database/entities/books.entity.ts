import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BookReadingStatus } from '../../utils/enums/database.enum';
import { BookCategoriesEntity } from './book-categories.entity';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'int', default: null })
  categoryId: number;

  @ManyToOne(() => BookCategoriesEntity, (category) => category.id)
  category: BookCategoriesEntity;

  @Column({ type: 'text' })
  cover_image: string;

  @Column({
    type: 'enum',
    enum: BookReadingStatus,
    default: BookReadingStatus.remain,
  })
  book_reading_status: BookReadingStatus;

  @Column({ type: 'boolean', default: false })
  user_want_to_read: boolean;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
