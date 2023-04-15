import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { Connection } from 'typeorm';
import { RegisterUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from '../helpers/session.service';

@Injectable()
export class UserService {
  constructor(
    private conn: Connection,
    private configService: ConfigService,
    private session: SessionService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const { username, email, password, address } = registerUserDto;

    const userExist = await this.conn
      .getRepository(UserEntity)
      .createQueryBuilder('users')
      .andWhere('users.username = :username', { username })
      .andWhere('users.email = :email', { email })
      .getOne();
    if (userExist)
      throw new BadRequestException('Username/Email is already used.');

    const saltRound = this.configService.get<string>('SaltRound');

    const hash = await bcrypt.hash(password, Number(saltRound));

    const user = await this.conn.getRepository(UserEntity).save({
      username,
      email,
      password: hash,
      address,
    });

    return {
      data: user,
      message: 'User registered successfully.',
    };
  }

  async findOneByUsername(username: string) {
    const user = await this.conn.getRepository(UserEntity).findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Username is not valid.');
    }

    return user;
  }
}
