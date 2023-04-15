import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SessionService } from '../helpers/session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ConfigService, SessionService],
})
export class UserModule {}
