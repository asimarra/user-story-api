import { IsEmail } from 'class-validator';

export class FindUserByEmailHttpDto {
  @IsEmail()
  email: string;
}
