import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindUserByEmailHttpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
