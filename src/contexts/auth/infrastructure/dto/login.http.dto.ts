import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginHttpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginSuccessResponseHttpDto {
  @ApiProperty()
  error: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' },
      token: { type: 'string' },
    },
  })
  data: object;
}

export class LoginErrorResponseHttpDto {
  @ApiProperty()
  error: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  })
  data: { message: string };
}
