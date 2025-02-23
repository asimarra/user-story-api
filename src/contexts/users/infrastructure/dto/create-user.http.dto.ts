import { Roles } from '@src/shared/domain/roles.enum';
import { UserStatus } from '../../domain/user.entity';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserHttpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])(?=.*[A-Z])/, {
    message:
      'Password must contain at least one number and one uppercase letter',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o: CreateUserHttpDto) => o.password !== o.repeatPassword)
  repeatPassword: string;

  @IsNotEmpty()
  @IsEnum(UserStatus)
  status: UserStatus;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
