import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGaurd } from './jwt-auth.gaurd';
import { SessionService } from '../helpers/session.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private session: SessionService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login Api' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Fetch Profile' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGaurd)
  async getProfile() {
    return {
      data: this.session.user,
      message: 'Profile has been fetched.',
    };
  }
}
