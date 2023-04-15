import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './users.dto';
import { UserService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register user.' })
  @UsePipes(ValidationPipe)
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.registerUser(registerUserDto);
  }
}
