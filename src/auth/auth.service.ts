import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { Connection } from 'typeorm';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants/auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private conn: Connection,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userService.findOneByUsername(username);
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new UnauthorizedException('Password is not valid.');
    }
    const { password: pass, ...payload } = user;
    // const payload = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
