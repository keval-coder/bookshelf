import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Username is required.',
  })
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Email is required.',
  })
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password is required.',
  })
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;
}
