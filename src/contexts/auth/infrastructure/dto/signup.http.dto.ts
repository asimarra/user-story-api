import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class SignUpHttpDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])(?=.*[A-Z])/, {
    message:
      'Password must contain at least one number and one uppercase letter',
  })
  password: string;
}

export class SignUpSuccessResponseHttpDto {
  @ApiProperty()
  error: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      userId: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' },
      token: { type: 'string' },
    },
  })
  data: object;
}

export class SignUpErrorResponseHttpDto {
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
